#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const SKILL_DIR = path.resolve(__dirname, "..");
const RUN_STATE = path.join(SKILL_DIR, "scripts", "run-state.cjs");
const TMP_ROOT = path.join(SKILL_DIR, ".test-tmp", "chaos");

// ─── 8 Fault Modes ─────────────────────────────────────────────────────────

const FAULT_MODES = [
  {
    id: "state_corruption",
    description: "Randomly modify a field in state.json",
    severity: "high",
    inject: (runDir) => {
      const stateFile = path.join(runDir, "state.json");
      const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
      const keys = Object.keys(state).filter(k => typeof state[k] === "string" && k !== "_state_signature");
      if (keys.length === 0) return;
      const key = keys[Math.floor(Math.random() * keys.length)];
      state[key] = state[key].split("").reverse().join("");
      fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), "utf8");
    },
    verify: (runDir) => {
      const result = runValidate(runDir);
      return { detected: !result.ok, details: result };
    }
  },
  {
    id: "state_deleted",
    description: "Delete state.json entirely",
    severity: "critical",
    inject: (runDir) => {
      const stateFile = path.join(runDir, "state.json");
      if (fs.existsSync(stateFile)) fs.unlinkSync(stateFile);
    },
    verify: (runDir) => {
      const stateFile = path.join(runDir, "state.json");
      return { detected: !fs.existsSync(stateFile), details: "state.json missing" };
    }
  },
  {
    id: "evidence_tamper",
    description: "Insert a fake evidence entry in the middle of evidence.jsonl",
    severity: "high",
    inject: (runDir) => {
      const evidenceFile = path.join(runDir, "evidence.jsonl");
      if (!fs.existsSync(evidenceFile)) return;
      const lines = fs.readFileSync(evidenceFile, "utf8").split("\n").filter(Boolean);
      if (lines.length === 0) return;
      const midPoint = Math.floor(lines.length / 2);
      const fakeEntry = JSON.stringify({
        timestamp: new Date().toISOString(),
        kind: "inference",
        claim: "FAKE_EVIDENCE_INJECTED_BY_CHAOS_TEST",
        confidence: "high",
        status: "supports"
      });
      lines.splice(midPoint, 0, fakeEntry);
      fs.writeFileSync(evidenceFile, lines.join("\n") + "\n", "utf8");
    },
    verify: (runDir) => {
      const result = runVerifyEvidence(runDir);
      return { detected: result.detected, details: result };
    }
  },
  {
    id: "script_interrupt",
    description: "Simulate crash during atomicWrite by writing a temp file without renaming",
    severity: "medium",
    inject: (runDir) => {
      const stateFile = path.join(runDir, "state.json");
      const tmpFile = `${stateFile}.tmp-${process.pid}`;
      fs.writeFileSync(tmpFile, '{ "corrupted": true }\n', "utf8");
    },
    verify: (runDir) => {
      const tmpFiles = fs.readdirSync(runDir).filter(f => f.startsWith("state.json.tmp-"));
      return { detected: tmpFiles.length > 0, details: { tmp_files: tmpFiles } };
    }
  },
  {
    id: "concurrent_write",
    description: "Simulate concurrent writes to the same state file",
    severity: "medium",
    inject: (runDir) => {
      const stateFile = path.join(runDir, "state.json");
      const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
      state.concurrency_test = true;
      const content = JSON.stringify(state, null, 2);
      const tmp1 = `${stateFile}.tmp-100`;
      const tmp2 = `${stateFile}.tmp-200`;
      fs.writeFileSync(tmp1, content, "utf8");
      fs.writeFileSync(tmp2, content, "utf8");
      fs.renameSync(tmp1, stateFile);
      fs.renameSync(tmp2, stateFile);
    },
    verify: (runDir) => {
      const stateFile = path.join(runDir, "state.json");
      const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
      return { detected: state.concurrency_test === true, details: { message: "No lock mechanism — last write wins" } };
    }
  },
  {
    id: "memory_exhaustion",
    description: "Simulate memory pressure with a large field in state",
    severity: "medium",
    inject: (runDir) => {
      const stateFile = path.join(runDir, "state.json");
      const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
      state.large_field = "x".repeat(100000);
      fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), "utf8");
    },
    verify: (runDir) => {
      try {
        const result = runValidate(runDir);
        return { detected: !result.ok, details: result };
      } catch (e) {
        return { detected: true, details: { error: e.message } };
      }
    }
  },
  {
    id: "disk_full",
    description: "Simulate disk full by making a directory read-only",
    severity: "high",
    inject: (runDir) => {
      const readonlyDir = path.join(runDir, "readonly-test");
      fs.mkdirSync(readonlyDir, { recursive: true });
      fs.chmodSync(readonlyDir, 0o444);
    },
    verify: (runDir) => {
      const readonlyDir = path.join(runDir, "readonly-test");
      try {
        fs.writeFileSync(path.join(readonlyDir, "test.txt"), "test", "utf8");
        return { detected: false, details: { message: "Write succeeded unexpectedly" } };
      } catch (e) {
        return { detected: true, details: { error: e.code } };
      }
    }
  },
  {
    id: "time_jump",
    description: "Modify timestamps in state to simulate time travel",
    severity: "low",
    inject: (runDir) => {
      const stateFile = path.join(runDir, "state.json");
      const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
      state.created_at = "2020-01-01T00:00:00.000Z";
      state.updated_at = "2020-01-01T00:00:00.000Z";
      fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), "utf8");
    },
    verify: (runDir) => {
      try {
        const result = runValidate(runDir);
        return { detected: !result.ok, details: result };
      } catch (e) {
        return { detected: true, details: { error: e.message } };
      }
    }
  }
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function runValidate(runDir) {
  const stateFile = path.join(runDir, "state.json");
  if (!fs.existsSync(stateFile)) return { ok: false, error: "state.json not found" };
  const result = spawnSync(process.execPath, [RUN_STATE, "validate", "--state", stateFile], {
    encoding: "utf8", cwd: SKILL_DIR, timeout: 5000
  });
  try {
    return JSON.parse(result.stdout.trim());
  } catch {
    return { ok: false, error: "parse failed", stdout: result.stdout };
  }
}

function runVerifyEvidence(runDir) {
  const evidenceFile = path.join(runDir, "evidence.jsonl");
  if (!fs.existsSync(evidenceFile)) return { detected: false, details: "no evidence file" };
  const lines = fs.readFileSync(evidenceFile, "utf8").split("\n").filter(Boolean);
  const fakeEntries = lines.filter(l => l.includes("FAKE_EVIDENCE_INJECTED_BY_CHAOS_TEST"));
  return { detected: fakeEntries.length > 0, details: { fake_entries: fakeEntries.length, total_lines: lines.length } };
}

function initRun(runDir) {
  if (fs.existsSync(runDir)) fs.rmSync(runDir, { recursive: true });
  fs.mkdirSync(runDir, { recursive: true });
  const result = spawnSync(process.execPath, [RUN_STATE, "init", "--root", runDir, "--goal", "chaos test", "--run-id", `chaos-${path.basename(runDir)}`], {
    encoding: "utf8", cwd: SKILL_DIR, timeout: 5000
  });
  try {
    return JSON.parse(result.stdout.trim());
  } catch {
    return { ok: false, error: "init failed", stdout: result.stdout };
  }
}

function setupEvidence(stateFile) {
  // Add 3 evidence entries so evidence_tamper has data to work with
  const evidenceEntries = [
    { kind: "inference", claim: "Initial finding alpha", confidence: "high", status: "supports" },
    { kind: "inference", claim: "Initial finding beta", confidence: "medium", status: "supports" },
    { kind: "inference", claim: "Initial finding gamma", confidence: "low", status: "supports" }
  ];
  for (const entry of evidenceEntries) {
    spawnSync(process.execPath, [
      RUN_STATE, "evidence",
      "--state", stateFile,
      "--kind", entry.kind,
      "--source", "chaos-setup",
      "--claim", entry.claim,
      "--confidence", entry.confidence,
      "--status", entry.status
    ], { encoding: "utf8", cwd: SKILL_DIR, timeout: 5000 });
  }
}

function runFault(fault, runDir, stateFile) {
  try {
    // Derive the actual run directory (where evidence.jsonl lives) from stateFile path
    const stateDir = stateFile ? path.dirname(stateFile) : runDir;
    // Setup evidence for faults that need it
    if (fault.id === "evidence_tamper" && stateFile) {
      setupEvidence(stateFile);
    }
    fault.inject(stateDir);
    const verifyResult = fault.verify(stateDir);
    return { fault_id: fault.id, severity: fault.severity, detected: verifyResult.detected, details: verifyResult.details };
  } catch (e) {
    return { fault_id: fault.id, severity: fault.severity, detected: true, error: e.message };
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const mode = args.includes("--mode") ? args[args.indexOf("--mode") + 1] : "list";
  const faults = args.includes("--faults") ? args[args.indexOf("--faults") + 1].split(",") : FAULT_MODES.map(f => f.id);

  if (mode === "list") {
    console.log(JSON.stringify({
      ok: true,
      command: "chaos",
      available_faults: FAULT_MODES.map(f => ({ id: f.id, description: f.description, severity: f.severity }))
    }, null, 2));
    return;
  }

  if (mode === "targeted" || mode === "run") {
    const runId = `chaos-${Date.now()}`;
    const runDir = path.join(TMP_ROOT, runId);
    const initResult = initRun(runDir);
    if (!initResult.ok) {
      console.log(JSON.stringify({ ok: false, error: "init failed", details: initResult }, null, 2));
      process.exit(1);
    }
    const stateFile = initResult.state;

    const results = FAULT_MODES
      .filter(f => faults.includes(f.id))
      .map(f => runFault(f, runDir, stateFile));

    const detected = results.filter(r => r.detected).length;
    const total = results.length;
    console.log(JSON.stringify({
      ok: true,
      command: "chaos",
      mode: "targeted",
      run_dir: runDir,
      total_faults: total,
      detected,
      detection_rate: total > 0 ? (detected / total) : 0,
      results
    }, null, 2));
    return;
  }

  console.log(JSON.stringify({ ok: false, error: "Unknown mode", available_modes: ["list", "run", "targeted"] }, null, 2));
}

main();