#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const SKILL_DIR = path.resolve(__dirname, "..");
const RUN_STATE = path.join(SKILL_DIR, "scripts", "run-state.cjs");
const TMP_ROOT = path.join(SKILL_DIR, ".test-tmp");

// ─── CLI ───────────────────────────────────────────────────────────────────

const args = parseArgs(process.argv.slice(2));
const suite = args.suite || "quick";
const iterations = parseInt(args.iterations, 10) || 10;
const outputFile = args.output || null;

// ─── Helpers ───────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) { out._.push(token); continue; }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) out[key] = true;
    else { out[key] = next; i++; }
  }
  return out;
}

function now() {
  return new Date().toISOString();
}

function runCommand(...cmdArgs) {
  const result = spawnSync(process.execPath, cmdArgs, {
    encoding: "utf8",
    cwd: SKILL_DIR,
    timeout: 30000
  });
  return result;
}

function classifyOverhead(avgMs) {
  if (avgMs < 50) return "negligible";
  if (avgMs < 200) return "low";
  if (avgMs < 500) return "medium";
  return "high";
}

function calcP95(sorted) {
  const idx = Math.ceil(0.95 * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

// ─── Benchmark: init ───────────────────────────────────────────────────────

function benchmarkInit(tmpRoot, n) {
  const durations = [];
  for (let i = 0; i < n; i++) {
    const runDir = path.join(tmpRoot, `bench-init-${i}`);
    fs.mkdirSync(runDir, { recursive: true });
    const start = Date.now();
    runCommand(RUN_STATE, "init", "--root", runDir, "--goal", `benchmark init ${i}`);
    durations.push(Date.now() - start);
    // Cleanup
    fs.rmSync(runDir, { recursive: true, force: true });
  }
  return durations;
}

// ─── Benchmark: transition ─────────────────────────────────────────────────

function benchmarkTransition(tmpRoot, n) {
  const durations = [];
  for (let i = 0; i < n; i++) {
    const runDir = path.join(tmpRoot, `bench-transition-${i}`);
    fs.mkdirSync(runDir, { recursive: true });
    runCommand(RUN_STATE, "init", "--root", runDir, "--goal", `benchmark transition ${i}`);
    const stateFile = path.join(runDir, ".analyze", "state.json");
    const start = Date.now();
    runCommand(RUN_STATE, "transition", "--state", stateFile, "--to", "scoped", "--reason", "benchmark");
    durations.push(Date.now() - start);
    fs.rmSync(runDir, { recursive: true, force: true });
  }
  return durations;
}

// ─── Benchmark: gate ───────────────────────────────────────────────────────

function benchmarkGate(tmpRoot, n) {
  const durations = [];
  for (let i = 0; i < n; i++) {
    const runDir = path.join(tmpRoot, `bench-gate-${i}`);
    fs.mkdirSync(runDir, { recursive: true });
    runCommand(RUN_STATE, "init", "--root", runDir, "--goal", `benchmark gate ${i}`);
    const stateFile = path.join(runDir, ".analyze", "state.json");
    // Add evidence first
    runCommand(RUN_STATE, "evidence", "--state", stateFile, "--kind", "inference", "--source", "bench", "--claim", "test", "--confidence", "high", "--status", "supports");
    const start = Date.now();
    runCommand(RUN_STATE, "gate", "--state", stateFile, "--id", "G1", "--status", "pass", "--evidence", "evidence.jsonl#1");
    durations.push(Date.now() - start);
    fs.rmSync(runDir, { recursive: true, force: true });
  }
  return durations;
}

// ─── Benchmark: evidence append ────────────────────────────────────────────

function benchmarkEvidence(tmpRoot, n) {
  const durations = [];
  for (let i = 0; i < n; i++) {
    const runDir = path.join(tmpRoot, `bench-evidence-${i}`);
    fs.mkdirSync(runDir, { recursive: true });
    runCommand(RUN_STATE, "init", "--root", runDir, "--goal", `benchmark evidence ${i}`);
    const stateFile = path.join(runDir, ".analyze", "state.json");
    const start = Date.now();
    runCommand(RUN_STATE, "evidence", "--state", stateFile, "--kind", "inference", "--source", "bench", "--claim", "test evidence", "--confidence", "high", "--status", "supports");
    durations.push(Date.now() - start);
    fs.rmSync(runDir, { recursive: true, force: true });
  }
  return durations;
}

// ─── Benchmark: validate (full) ────────────────────────────────────────────

function benchmarkValidate(tmpRoot, n) {
  const durations = [];
  for (let i = 0; i < n; i++) {
    const runDir = path.join(tmpRoot, `bench-validate-${i}`);
    fs.mkdirSync(runDir, { recursive: true });
    runCommand(RUN_STATE, "init", "--root", runDir, "--goal", `benchmark validate ${i}`);
    const stateFile = path.join(runDir, ".analyze", "state.json");
    // Add some evidence to make validation meaningful
    for (let e = 0; e < 5; e++) {
      runCommand(RUN_STATE, "evidence", "--state", stateFile, "--kind", "inference", "--source", "bench", "--claim", `evidence ${e}`, "--confidence", "high", "--status", "supports");
    }
    const start = Date.now();
    runCommand(RUN_STATE, "validate", "--state", stateFile);
    durations.push(Date.now() - start);
    fs.rmSync(runDir, { recursive: true, force: true });
  }
  return durations;
}

// ─── Benchmark: checkpoint ─────────────────────────────────────────────────

function benchmarkCheckpoint(tmpRoot, n) {
  const durations = [];
  for (let i = 0; i < n; i++) {
    const runDir = path.join(tmpRoot, `bench-checkpoint-${i}`);
    fs.mkdirSync(runDir, { recursive: true });
    runCommand(RUN_STATE, "init", "--root", runDir, "--goal", `benchmark checkpoint ${i}`);
    const stateFile = path.join(runDir, ".analyze", "state.json");
    const start = Date.now();
    runCommand(RUN_STATE, "checkpoint", "--state", stateFile);
    durations.push(Date.now() - start);
    fs.rmSync(runDir, { recursive: true, force: true });
  }
  return durations;
}

// ─── Benchmark: index ──────────────────────────────────────────────────────

function benchmarkIndex(tmpRoot, n) {
  const durations = [];
  for (let i = 0; i < n; i++) {
    const runDir = path.join(tmpRoot, `bench-index-${i}`);
    fs.mkdirSync(runDir, { recursive: true });
    runCommand(RUN_STATE, "init", "--root", runDir, "--goal", `benchmark index ${i}`);
    const stateFile = path.join(runDir, ".analyze", "state.json");
    // Transition to terminal state to trigger index update
    runCommand(RUN_STATE, "gate", "--state", stateFile, "--id", "G1", "--status", "pass", "--evidence", "evidence.jsonl#1");
    runCommand(RUN_STATE, "transition", "--state", stateFile, "--to", "scoped", "--reason", "bench");
    const start = Date.now();
    runCommand(RUN_STATE, "index", "--state", stateFile);
    durations.push(Date.now() - start);
    fs.rmSync(runDir, { recursive: true, force: true });
  }
  return durations;
}

// ─── Main ──────────────────────────────────────────────────────────────────

const BENCHMARKS = {
  "init": benchmarkInit,
  "transition": benchmarkTransition,
  "gate": benchmarkGate,
  "evidence": benchmarkEvidence,
  "validate": benchmarkValidate,
  "checkpoint": benchmarkCheckpoint,
  "index": benchmarkIndex
};

const SUITE_DEFS = {
  quick: ["init", "transition", "evidence"],
  full: Object.keys(BENCHMARKS)
};

const selected = suite === "full" ? SUITE_DEFS.full : (SUITE_DEFS[suite] || [suite]);
const overallStart = Date.now();
const results = [];

if (!fs.existsSync(TMP_ROOT)) {
  fs.mkdirSync(TMP_ROOT, { recursive: true });
}

for (const name of selected) {
  const fn = BENCHMARKS[name];
  if (!fn) {
    process.stderr.write(`Unknown benchmark: ${name}\n`);
    continue;
  }
  const durations = fn(TMP_ROOT, iterations);
  durations.sort((a, b) => a - b);
  const avg = durations.reduce((s, v) => s + v, 0) / durations.length;
  results.push({
    operation: `run-state.cjs ${name}`,
    avg_ms: Math.round(avg * 10) / 10,
    p95_ms: calcP95(durations),
    min_ms: durations[0],
    max_ms: durations[durations.length - 1],
    overhead: classifyOverhead(avg)
  });
}

const output = {
  benchmark: "harness-overhead",
  timestamp: now(),
  iterations,
  results,
  suite,
  duration_seconds: Math.round((Date.now() - overallStart) / 10) / 10
};

if (outputFile) {
  const outPath = path.resolve(outputFile);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
}

process.stdout.write(JSON.stringify(output, null, 2) + "\n");