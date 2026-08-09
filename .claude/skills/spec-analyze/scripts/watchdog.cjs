#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const VALID_STATUSES = new Set([
  "intake", "scoped", "discovering", "synthesizing", "verifying",
  "repairing", "awaiting_user", "completed", "stopped", "blocked"
]);

// ─── Helpers ────────────────────────────────────────────────────────────────

function verifyStateSignature(state) {
  return state && state._state_signature && state.run_id;
}

function rebuildCheckpoint(state) {
  return `# Checkpoint\n\nRun: ${state.run_id}\nStatus: ${state.status}\nGoal: ${state.goal || "N/A"}\nUpdated: ${state.updated_at || new Date().toISOString()}\n`;
}

// ─── Watchdog Check ─────────────────────────────────────────────────────────

function watchdogCheck(runDir) {
  const issues = [];
  const stateFile = path.join(runDir, "state.json");
  let state = null;

  // 1. Check state.json existence, parse, signature, status
  if (!fs.existsSync(stateFile)) {
    issues.push({ severity: "critical", component: "state.json", issue: "file_missing" });
  } else {
    try {
      state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
      if (!verifyStateSignature(state)) {
        issues.push({ severity: "warning", component: "state.json", issue: "invalid_signature" });
      }
      if (!VALID_STATUSES.has(state.status)) {
        issues.push({ severity: "critical", component: "state.json", issue: "invalid_status", detail: state.status });
      }
    } catch (e) {
      issues.push({ severity: "critical", component: "state.json", issue: "parse_error", detail: e.message });
    }
  }

  // 2. Check evidence.jsonl integrity (last line)
  const evidenceFile = path.join(runDir, "evidence.jsonl");
  if (fs.existsSync(evidenceFile)) {
    const content = fs.readFileSync(evidenceFile, "utf8");
    const lines = content.split("\n").filter(Boolean);
    if (lines.length > 0) {
      try {
        JSON.parse(lines[lines.length - 1]);
      } catch {
        issues.push({ severity: "warning", component: "evidence.jsonl", issue: "last_line_incomplete" });
      }
    }
  }

  // 3. Check checkpoint.md existence
  const checkpointFile = path.join(runDir, "checkpoint.md");
  if (!fs.existsSync(checkpointFile)) {
    issues.push({ severity: "info", component: "checkpoint.md", issue: "file_missing" });
  }

  // 4. Check file system permissions
  try {
    const testFile = path.join(runDir, ".watchdog-test");
    fs.writeFileSync(testFile, "test", "utf8");
    fs.unlinkSync(testFile);
  } catch (e) {
    issues.push({ severity: "critical", component: "filesystem", issue: "permission_error", detail: e.message });
  }

  // 5. Check for orphaned temp files
  const tmpFiles = fs.readdirSync(runDir).filter(f => f.includes(".tmp-"));
  if (tmpFiles.length > 0) {
    issues.push({ severity: "info", component: "filesystem", issue: "orphaned_temp_files", detail: tmpFiles.join(", ") });
  }

  return { issues, state };
}

// ─── Auto-Repair ────────────────────────────────────────────────────────────

function autoRepair(runDir, issues) {
  const repairs = [];
  const evidenceFile = path.join(runDir, "evidence.jsonl");
  const checkpointFile = path.join(runDir, "checkpoint.md");
  const stateFile = path.join(runDir, "state.json");

  for (const issue of issues) {
    switch (issue.issue) {
      case "last_line_incomplete": {
        const content = fs.readFileSync(evidenceFile, "utf8");
        const lines = content.split("\n");
        const repaired = lines.slice(0, -1).join("\n");
        fs.writeFileSync(evidenceFile + ".repaired", repaired, "utf8");
        fs.renameSync(evidenceFile + ".repaired", evidenceFile);
        repairs.push({ action: "truncated_last_line", component: "evidence.jsonl", status: "repaired" });
        break;
      }
      case "file_missing": {
        if (issue.component === "checkpoint.md" && fs.existsSync(stateFile)) {
          const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
          const checkpoint = rebuildCheckpoint(state);
          fs.writeFileSync(checkpointFile, checkpoint, "utf8");
          repairs.push({ action: "rebuilt_checkpoint", component: "checkpoint.md", status: "repaired" });
        }
        break;
      }
      case "invalid_signature": {
        repairs.push({ action: "resign_state", component: "state.json", status: "requires_human_review" });
        break;
      }
      case "orphaned_temp_files": {
        const dirContents = fs.readdirSync(runDir);
        const orphans = dirContents.filter(f => f.includes(".tmp-"));
        for (const f of orphans) {
          try { fs.unlinkSync(path.join(runDir, f)); } catch {}
        }
        repairs.push({ action: "cleaned_temp_files", component: "filesystem", status: "repaired", count: orphans.length });
        break;
      }
    }
  }

  return repairs;
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const runDirIndex = args.indexOf("--run-dir");
  const repairIndex = args.indexOf("--repair");
  const backupIndex = args.indexOf("--backup");

  if (runDirIndex === -1) {
    console.log(JSON.stringify({ ok: false, error: "Missing --run-dir" }, null, 2));
    process.exit(1);
  }

  const runDir = path.resolve(args[runDirIndex + 1]);
  if (!fs.existsSync(runDir)) {
    console.log(JSON.stringify({ ok: false, error: "Run directory not found", run_dir: runDir }, null, 2));
    process.exit(1);
  }

  // Backup mode
  if (backupIndex !== -1) {
    const backupDir = path.join(runDir, "backup", `backup-${Date.now()}`);
    fs.mkdirSync(backupDir, { recursive: true });
    const files = ["state.json", "evidence.jsonl", "checkpoint.md"];
    const backedUp = [];
    for (const f of files) {
      const src = path.join(runDir, f);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(backupDir, f));
        backedUp.push(f);
      }
    }
    console.log(JSON.stringify({ ok: true, command: "watchdog", mode: "backup", backup_dir: backupDir, files: backedUp }, null, 2));
    return;
  }

  // Check mode
  const { issues, state } = watchdogCheck(runDir);
  const severityCounts = { critical: 0, warning: 0, info: 0 };
  for (const issue of issues) {
    severityCounts[issue.severity] = (severityCounts[issue.severity] || 0) + 1;
  }

  const result = {
    ok: true,
    command: "watchdog",
    mode: repairIndex !== -1 ? "repair" : "check",
    run_dir: runDir,
    issues_found: issues.length,
    severity_summary: severityCounts,
    issues
  };

  if (repairIndex !== -1) {
    const repairs = autoRepair(runDir, issues);
    result.repairs = repairs;
    result.repaired_count = repairs.filter(r => r.status === "repaired").length;
  }

  console.log(JSON.stringify(result, null, 2));
}

main();