#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");

const STATUSES = new Set([
  "ready_for_plan", "planning", "awaiting_execution_approval",
  "ready_for_execution", "executing", "ready_for_verification",
  "verifying", "completed", "blocked", "stopped"
]);
const TERMINAL = new Set(["completed", "blocked", "stopped"]);
const VALIDATION_MODES = new Set(["strict", "balanced", "lazy"]);
// Capability labels are internal names resolved to references/<name>.md by the
// host agent; they are not standalone skills (2026-08-07 naming fix).
const ROUTES = {
  ready_for_plan: { stage: "plan", skill: "writing-plans" },
  awaiting_execution_approval: { stage: "approval", skill: null },
  ready_for_execution: { stage: "execute", skill: "executing-plans" },
  ready_for_verification: { stage: "verify", skill: "verification-before-completion" }
};

function now() { return new Date().toISOString(); }
function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) { out._.push(token); continue; }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) out[key] = true;
    else { out[key] = next; i += 1; }
  }
  return out;
}
function emit(value) { process.stdout.write(`${JSON.stringify(value, null, 2)}\n`); }
function abort(message, details = {}) {
  process.stderr.write(`${JSON.stringify({ ok: false, error: message, ...details }, null, 2)}\n`);
  process.exit(1);
}
function requireArg(args, key) {
  if (args[key] === undefined || args[key] === true || String(args[key]).trim() === "") abort(`Missing --${key}`);
  return String(args[key]);
}
function nonEmpty(value) { return typeof value === "string" && value.trim() !== ""; }
function sha256Buffer(buffer) { return crypto.createHash("sha256").update(buffer).digest("hex"); }
function sha256File(file) { return sha256Buffer(fs.readFileSync(file)); }
function atomicWrite(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, content, "utf8");
  fs.renameSync(tmp, file);
}
function writeJson(file, value) { atomicWrite(file, `${JSON.stringify(value, null, 2)}\n`); }
function readJson(file, label) {
  if (!fs.existsSync(file)) abort(`${label} does not exist`, { file });
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { abort(`${label} is invalid JSON`, { file, detail: error.message }); }
}
function snapshot(file, root) {
  const resolved = path.resolve(file);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) abort("Artifact must be an existing regular file", { file: resolved });
  const relative = path.relative(root, resolved);
  return {
    path: relative && !relative.startsWith("..") && !path.isAbsolute(relative) ? relative : resolved,
    sha256: sha256File(resolved),
    size_bytes: fs.statSync(resolved).size
  };
}
function resolveSnapshot(item, root) { return path.isAbsolute(item.path) ? path.resolve(item.path) : path.resolve(root, item.path); }
function assertSnapshot(item, root, label) {
  if (!item || !item.path || !item.sha256) abort(`${label} snapshot is missing`);
  const file = resolveSnapshot(item, root);
  if (!fs.existsSync(file)) abort(`${label} file is missing`, { file });
  if (sha256File(file) !== item.sha256) abort(`${label} hash mismatch`, { file });
  if (Number.isInteger(item.size_bytes) && fs.statSync(file).size !== item.size_bytes) abort(`${label} size mismatch`, { file });
  return file;
}
function loadState(file) {
  const resolved = path.resolve(file);
  return { file: resolved, dir: path.dirname(resolved), state: readJson(resolved, "Workflow state") };
}
function saveState(ctx) { ctx.state.updated_at = now(); writeJson(ctx.file, ctx.state); }
function history(state, event) { state.history.push({ timestamp: now(), ...event }); }
function verifyPacket(packetFile) {
  const verifier = path.join(__dirname, "verify-handoff.cjs");
  const result = spawnSync(process.execPath, [verifier, "--packet", packetFile], { encoding: "utf8" });
  let payload;
  try { payload = JSON.parse(result.stdout || result.stderr); }
  catch { payload = { raw: result.stdout || result.stderr }; }
  if (result.status !== 0 || !payload.ok) abort("Handoff packet verification failed", { verification: payload });
  return payload;
}
function packetFileFor(state) { return assertSnapshot(state.packet, state.project_root, "handoff packet"); }
function validatePlan(file) {
  const text = fs.readFileSync(file, "utf8");
  const errors = [];
  const required = [
    [/^# .+ Implementation Plan/m, "implementation-plan title"],
    [/\*\*Goal:\*\*\s*\S/m, "Goal"],
    [/\*\*Architecture:\*\*\s*\S/m, "Architecture"],
    [/\*\*Tech Stack:\*\*\s*\S/m, "Tech Stack"],
    [/^## Global Constraints/m, "Global Constraints"],
    [/^### Task \d+:/m, "numbered Task"],
    [/^- \[ \] \*\*Step \d+:/m, "checkbox Step"]
  ];
  for (const [pattern, label] of required) if (!pattern.test(text)) errors.push(`missing ${label}`);
  if (/\b(TBD|TODO|implement later|fill in details)\b/i.test(text) || /Similar to Task/i.test(text)) errors.push("contains a forbidden placeholder");
  if (errors.length) abort("Implementation plan failed structural contract", { errors });
}
function validateExecutionResult(result, state) {
  if (result.schema_version !== "analyze-execution-result/1.0") abort("Invalid execution result schema");
  if (result.status !== "ready_for_verification") abort("Execution result is not ready for verification");
  if (result.plan_sha256 !== state.artifacts.plan.sha256) abort("Execution result references a different plan hash");
  if (!Array.isArray(result.changes) || result.changes.length === 0) abort("Execution result must list material changes");
  if (!Array.isArray(result.checks) || result.checks.length === 0) abort("Execution result must contain checks");
  for (const check of result.checks) {
    if (!nonEmpty(check.command) || !Number.isInteger(check.exit_code) || check.exit_code !== 0 || !nonEmpty(check.evidence)) abort("Every execution check requires command, exit_code=0, and evidence", { check });
  }
  if (!Array.isArray(result.unresolved_blockers) || result.unresolved_blockers.length !== 0) abort("Execution result contains unresolved blockers", { blockers: result.unresolved_blockers });
}
function validateVerificationResult(result, state) {
  if (result.schema_version !== "analyze-verification-result/1.0") abort("Invalid verification result schema");
  if (result.status !== "pass") abort("Verification result did not pass", { status: result.status });
  if (result.packet_sha256 !== state.packet.sha256) abort("Verification result references a different packet hash");
  if (result.plan_sha256 !== state.artifacts.plan.sha256) abort("Verification result references a different plan hash");
  if (result.execution_result_sha256 !== state.artifacts.execution_result.sha256) abort("Verification result references a different execution result hash");
  if (!Array.isArray(result.checks) || result.checks.length === 0) abort("Verification result must contain fresh checks");
  for (const check of result.checks) {
    if (!nonEmpty(check.name) || !nonEmpty(check.command) || check.exit_code !== 0 || check.passed !== true || !nonEmpty(check.evidence)) abort("Every verification check must pass with command, exit_code=0, and evidence", { check });
  }
  if (!Array.isArray(result.acceptance) || result.acceptance.length === 0) abort("Verification result must map acceptance criteria");
  for (const item of result.acceptance) if (!nonEmpty(item.criterion) || item.passed !== true || !nonEmpty(item.evidence)) abort("Every acceptance criterion must pass with evidence", { item });
  if (!Array.isArray(result.unresolved_blockers) || result.unresolved_blockers.length !== 0) abort("Verification result contains unresolved blockers", { blockers: result.unresolved_blockers });
}
function stageRequest(state, packet, route) {
  const lines = [
    "# Claude Code Stage Request", "",
    `- Workflow: ${state.workflow_id}`,
    `- Stage: ${route.stage}`,
    `- Required capability (internal): ${route.skill || "none; request human approval"}${route.skill ? ` — resolve to references/${route.skill}.md` : ""}`,
    `- Handoff packet: ${packetFileFor(state)}`,
    `- Workflow state: ${state.state_file}`, ""
  ];
  if (route.stage === "plan") lines.push(
    "## Contract", "",
    "1. Verify the handoff packet before consuming it.",
    "2. Read every bound Spec artifact, assumption, decision, contradiction, constraint, and acceptance criterion.",
    "3. Write a complete implementation plan following `references/writing-plans.md`.",
    "4. Do not modify project implementation in this stage.",
    "5. Register the saved plan with `workflow-state.cjs complete --stage plan --artifact <plan>`.", ""
  );
  if (route.stage === "approval") lines.push(
    "## Contract", "",
    `Present the bound plan at ${resolveSnapshot(state.artifacts.plan, state.project_root)} and ask for explicit implementation approval.`,
    "Do not treat Spec approval, packet export, or a prior session's approval as execution approval.", ""
  );
  if (route.stage === "execute") lines.push(
    "## Contract", "",
    `1. Load the bound plan: ${resolveSnapshot(state.artifacts.plan, state.project_root)}.`,
    "2. Execute the bound plan following `references/executing-plans.md`.",
    `3. Append invalidating discoveries to: ${state.feedback_file}.`,
    "4. Save an execution result using `assets/execution-result.template.json` and register it with the controller.", ""
  );
  if (route.stage === "verify") lines.push(
    "## Contract", "",
    "1. Run fresh verification following `references/verification-before-completion.md`.",
    "2. Run fresh, complete commands; do not reuse execution-stage output as fresh verification.",
    "3. Map evidence to every acceptance criterion in the packet.",
    "4. Save `assets/verification-result.template.json` and register it with the controller.", ""
  );
  return lines.join("\n");
}
function renderRoute(ctx) {
  const route = ROUTES[ctx.state.status];
  if (!route) return null;
  const packetFile = packetFileFor(ctx.state);
  const packet = readJson(packetFile, "Handoff packet");
  const requestFile = path.join(ctx.dir, "stage-request.md");
  ctx.state.state_file = ctx.file;
  atomicWrite(requestFile, stageRequest(ctx.state, packet, route));
  ctx.state.next_route = { ...route, request: requestFile };
  return ctx.state.next_route;
}
function validateState(state) {
  const errors = [];
  if (state.schema_version !== "analyze-workflow/1.0") errors.push("invalid schema_version");
  if (!nonEmpty(state.workflow_id)) errors.push("workflow_id is required");
  if (!STATUSES.has(state.status)) errors.push(`invalid status: ${state.status}`);
  if (!Array.isArray(state.history) || state.history.length === 0) errors.push("history is required");
  if (!state.packet || !state.packet.sha256) errors.push("packet snapshot is required");
  if (!state.artifacts || typeof state.artifacts !== "object") errors.push("artifacts object is required");
  if (["awaiting_execution_approval", "ready_for_execution", "executing", "ready_for_verification", "verifying", "completed"].includes(state.status) && !(state.artifacts && state.artifacts.plan)) errors.push("current status requires a bound plan");
  if (["ready_for_execution", "executing", "ready_for_verification", "verifying", "completed"].includes(state.status) && !(state.approvals && state.approvals.execute && state.approvals.execute.status === "approved")) errors.push("current status requires execution approval");
  if (["ready_for_verification", "verifying", "completed"].includes(state.status) && !(state.artifacts && state.artifacts.execution_result)) errors.push("current status requires execution result");
  if (state.status === "completed" && !(state.artifacts && state.artifacts.verification_result)) errors.push("completed workflow requires verification result");
  if (["blocked", "stopped"].includes(state.status) && !nonEmpty(state.stop_reason)) errors.push(`${state.status} workflow requires stop_reason`);
  return { ok: errors.length === 0, errors };
}

function commandInit(args) {
  const packetFile = path.resolve(requireArg(args, "packet"));
  verifyPacket(packetFile);
  const packet = readJson(packetFile, "Handoff packet");
  const root = args.root ? path.resolve(String(args.root)) : path.join(path.dirname(packetFile), "workflow");
  if (fs.existsSync(root) && fs.readdirSync(root).length) abort("Workflow directory already exists and is not empty", { root });
  fs.mkdirSync(root, { recursive: true });
  const stateFile = path.join(root, "workflow-state.json");
  const projectRoot = path.resolve(packet.source.project_root);
  const feedbackFile = path.isAbsolute(packet.feedback.path) ? path.resolve(packet.feedback.path) : path.resolve(projectRoot, packet.feedback.path);
  const timestamp = now();
  const state = {
    schema_version: "analyze-workflow/1.0",
    workflow_id: `${packet.packet_id}-claude`,
    adapter: "analyze-workflow/1.0",
    project_root: projectRoot,
    packet: snapshot(packetFile, projectRoot),
    status: "ready_for_plan",
    current_stage: "plan",
    approvals: { execute: { status: "pending", by: null, evidence: null, approved_at: null } },
    artifacts: { plan: null, execution_result: null, verification_result: null },
    feedback_file: feedbackFile,
    next_route: null,
    stop_reason: null,
    created_at: timestamp,
    updated_at: timestamp,
    state_file: stateFile,
    history: [{ timestamp, type: "initialized", status: "ready_for_plan", packet: packetFile }]
  };
  const ctx = { file: stateFile, dir: root, state };
  const route = renderRoute(ctx);
  saveState(ctx);
  emit({ ok: true, command: "init", state: stateFile, status: state.status, route });
}
function commandRoute(args) {
  const ctx = loadState(requireArg(args, "state"));
  const mode = args.mode && VALIDATION_MODES.has(String(args.mode)) ? String(args.mode) : "balanced";
  ctx.state.validation_mode = mode;
  if (TERMINAL.has(ctx.state.status)) {
    emit({ ok: true, command: "route", state: ctx.file, status: ctx.state.status, route: null, stop_reason: ctx.state.stop_reason, validation_mode: mode });
    return;
  }
  if (mode === "lazy") {
    // lazy mode: skip packet verification and route rendering, just report status
    saveState(ctx);
    emit({ ok: true, command: "route", state: ctx.file, status: ctx.state.status, route: null, validation_mode: mode, note: "lazy mode: no route rendering (packet verification skipped)" });
    return;
  }
  // balanced/strict mode: verify packet before routing
  verifyPacket(packetFileFor(ctx.state));
  const route = renderRoute(ctx);
  saveState(ctx);
  emit({ ok: true, command: "route", state: ctx.file, status: ctx.state.status, route, validation_mode: mode });
}
function commandStart(args) {
  const ctx = loadState(requireArg(args, "state"));
  const stage = requireArg(args, "stage");
  const expected = { plan: "ready_for_plan", execute: "ready_for_execution", verify: "ready_for_verification" }[stage];
  const next = { plan: "planning", execute: "executing", verify: "verifying" }[stage];
  if (!expected) abort("Stage must be plan, execute, or verify");
  if (ctx.state.status !== expected) abort("Workflow is not ready to start this stage", { stage, status: ctx.state.status, expected });
  verifyPacket(packetFileFor(ctx.state));
  if (stage === "execute") {
    if (ctx.state.approvals.execute.status !== "approved") abort("Execution requires explicit human approval");
    assertSnapshot(ctx.state.artifacts.plan, ctx.state.project_root, "plan");
  }
  if (stage === "verify") {
    assertSnapshot(ctx.state.artifacts.plan, ctx.state.project_root, "plan");
    assertSnapshot(ctx.state.artifacts.execution_result, ctx.state.project_root, "execution result");
  }
  ctx.state.status = next;
  ctx.state.current_stage = stage;
  ctx.state.next_route = null;
  history(ctx.state, { type: "stage_started", stage, status: next });
  saveState(ctx);
  emit({ ok: true, command: "start", stage, status: next, state: ctx.file });
}
function commandComplete(args) {
  const ctx = loadState(requireArg(args, "state"));
  const stage = requireArg(args, "stage");
  const artifactFile = path.resolve(requireArg(args, "artifact"));
  const expected = { plan: "planning", execute: "executing", verify: "verifying" }[stage];
  if (!expected) abort("Stage must be plan, execute, or verify");
  if (ctx.state.status !== expected) abort("Workflow stage is not active", { stage, status: ctx.state.status, expected });
  verifyPacket(packetFileFor(ctx.state));
  if (stage === "plan") {
    validatePlan(artifactFile);
    ctx.state.artifacts.plan = snapshot(artifactFile, ctx.state.project_root);
    ctx.state.status = "awaiting_execution_approval";
    ctx.state.current_stage = "approval";
  }
  if (stage === "execute") {
    assertSnapshot(ctx.state.artifacts.plan, ctx.state.project_root, "plan");
    const result = readJson(artifactFile, "Execution result");
    validateExecutionResult(result, ctx.state);
    ctx.state.artifacts.execution_result = snapshot(artifactFile, ctx.state.project_root);
    ctx.state.status = "ready_for_verification";
    ctx.state.current_stage = "verify";
  }
  if (stage === "verify") {
    assertSnapshot(ctx.state.artifacts.plan, ctx.state.project_root, "plan");
    assertSnapshot(ctx.state.artifacts.execution_result, ctx.state.project_root, "execution result");
    const result = readJson(artifactFile, "Verification result");
    validateVerificationResult(result, ctx.state);
    ctx.state.artifacts.verification_result = snapshot(artifactFile, ctx.state.project_root);
    ctx.state.status = "completed";
    ctx.state.current_stage = null;
  }
  history(ctx.state, { type: "stage_completed", stage, artifact: artifactFile, status: ctx.state.status });
  const route = renderRoute(ctx);
  saveState(ctx);
  emit({ ok: true, command: "complete", stage, status: ctx.state.status, artifact: artifactFile, route, state: ctx.file });
}
function commandApprove(args) {
  const ctx = loadState(requireArg(args, "state"));
  const stage = requireArg(args, "stage");
  const by = requireArg(args, "by");
  const evidence = requireArg(args, "evidence");
  if (stage !== "execute") abort("Only the execute stage has an approval command");
  if (ctx.state.status !== "awaiting_execution_approval") abort("Workflow is not awaiting execution approval", { status: ctx.state.status });
  if (by.toLowerCase() !== "user") abort("Execution approval must be attributed to the user", { by });
  assertSnapshot(ctx.state.artifacts.plan, ctx.state.project_root, "plan");
  ctx.state.approvals.execute = { status: "approved", by: "user", evidence, approved_at: now() };
  ctx.state.status = "ready_for_execution";
  ctx.state.current_stage = "execute";
  history(ctx.state, { type: "approval", stage: "execute", by: "user", evidence });
  const route = renderRoute(ctx);
  saveState(ctx);
  emit({ ok: true, command: "approve", stage, status: ctx.state.status, route, state: ctx.file });
}
function commandFeedback(args) {
  const ctx = loadState(requireArg(args, "state"));
  if (TERMINAL.has(ctx.state.status)) abort("Cannot append feedback to a terminal workflow", { status: ctx.state.status });
  const input = path.resolve(requireArg(args, "input"));
  const event = readJson(input, "Feedback event");
  for (const key of ["timestamp", "kind", "step_id", "claim", "evidence", "impact", "recommended_route"]) if (!nonEmpty(event[key])) abort("Feedback event is missing a required field", { field: key });
  fs.mkdirSync(path.dirname(ctx.state.feedback_file), { recursive: true });
  fs.appendFileSync(ctx.state.feedback_file, `${JSON.stringify(event)}\n`, "utf8");
  const invalidatingKinds = new Set(["assumption_invalidated", "decision_invalidated", "acceptance_gap", "spec_drift"]);
  const blocks = invalidatingKinds.has(event.kind) || event.recommended_route === "return_to_analyze";
  if (blocks) {
    ctx.state.status = "blocked";
    ctx.state.current_stage = null;
    ctx.state.stop_reason = `${event.kind}: ${event.claim}`;
    ctx.state.next_route = { stage: "repair", skill: "analyze", request: null };
  }
  history(ctx.state, { type: "feedback", kind: event.kind, blocks, recommended_route: event.recommended_route });
  saveState(ctx);
  emit({ ok: true, command: "feedback", blocks, status: ctx.state.status, next_route: ctx.state.next_route, state: ctx.file });
}
function commandStop(args) {
  const ctx = loadState(requireArg(args, "state"));
  if (TERMINAL.has(ctx.state.status)) abort("Workflow is already terminal", { status: ctx.state.status });
  const status = args.blocked ? "blocked" : "stopped";
  const reason = requireArg(args, "reason");
  ctx.state.status = status;
  ctx.state.current_stage = null;
  ctx.state.stop_reason = reason;
  ctx.state.next_route = null;
  history(ctx.state, { type: "terminal", status, reason });
  saveState(ctx);
  emit({ ok: true, command: "stop", status, reason, state: ctx.file });
}
function commandValidate(args) {
  const ctx = loadState(requireArg(args, "state"));
  const mode = args.mode && VALIDATION_MODES.has(String(args.mode)) ? String(args.mode) : "balanced";
  ctx.state.validation_mode = mode;
  const structural = validateState(ctx.state);
  const errors = [...structural.errors];

  // Mode-specific validation
  if (mode === "lazy") {
    // lazy mode: only check structural validity, skip packet and artifact verification
    const result = { ok: errors.length === 0, command: "validate", status: ctx.state.status, errors, state: ctx.file, validation_mode: mode };
    emit(result);
    process.exit(result.ok ? 0 : 1);
    return;
  }

  if (ctx.state.packet) {
    try { verifyPacket(packetFileFor(ctx.state)); } catch (error) { errors.push(error.message); }
  }
  try {
    if (ctx.state.artifacts.plan) assertSnapshot(ctx.state.artifacts.plan, ctx.state.project_root, "plan");
    if (ctx.state.artifacts.execution_result) assertSnapshot(ctx.state.artifacts.execution_result, ctx.state.project_root, "execution result");
    if (ctx.state.artifacts.verification_result) assertSnapshot(ctx.state.artifacts.verification_result, ctx.state.project_root, "verification result");
  } catch (error) { errors.push(error.message); }

  // strict mode: extra checks
  if (mode === "strict") {
    if (!ctx.state.history || ctx.state.history.length < 2) errors.push("strict mode requires at least 2 history events");
    if (ctx.state.approvals && ctx.state.approvals.execute && ctx.state.approvals.execute.status === "approved") {
      if (!ctx.state.approvals.execute.evidence) errors.push("strict mode requires approval evidence");
    }
  }

  const result = { ok: errors.length === 0, command: "validate", status: ctx.state.status, errors, state: ctx.file, validation_mode: mode };
  emit(result);
  process.exit(result.ok ? 0 : 1);
}
function commandStatus(args) {
  const ctx = loadState(requireArg(args, "state"));
  emit({ ok: true, command: "status", state: ctx.state });
}
function usage() {
  process.stdout.write(`workflow-state\n\nCommands:\n  init --packet <handoff-packet.json> [--root <workflow-dir>]\n  route --state <workflow-state.json> [--mode strict|balanced|lazy]\n  start --state <file> --stage plan|execute|verify\n  complete --state <file> --stage plan|execute|verify --artifact <file>\n  approve --state <file> --stage execute --by user --evidence <text>\n  feedback --state <file> --input <feedback-event.json>\n  stop --state <file> --reason <text> [--blocked]\n  validate --state <file> [--mode strict|balanced|lazy]\n  status --state <file>\n`);
}

const args = parseArgs(process.argv.slice(2));
const command = args._[0];
const commands = {
  init: commandInit, route: commandRoute, start: commandStart,
  complete: commandComplete, approve: commandApprove, feedback: commandFeedback,
  stop: commandStop, validate: commandValidate, status: commandStatus
};
if (!command || command === "help" || args.help) usage();
else if (!commands[command]) abort("Unknown command", { command });
else commands[command](args);
