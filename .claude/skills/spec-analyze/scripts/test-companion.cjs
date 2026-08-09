#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");
const { validateVisual, renderVisual } = require("./companion.cjs");

const manager = path.join(__dirname, "companion.cjs");
const server = path.join(__dirname, "companion-server.cjs");
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "analyze-companion-test-"));
const tests = [];
const environmentLimits = [];

function writeJson(file, value) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8"); return file; }
function invoke(script, args, expectedCode = 0) {
  const result = spawnSync(process.execPath, [script, ...args], { encoding: "utf8" });
  const raw = (result.stdout || result.stderr || "").trim();
  let payload;
  try { payload = JSON.parse(raw); } catch { payload = { raw }; }
  if (result.status !== expectedCode) throw new Error(`Expected exit ${expectedCode}, got ${result.status}: ${raw}`);
  return payload;
}
function run(args, expectedCode = 0) { return invoke(manager, args, expectedCode); }
function test(name, fn) { try { fn(); tests.push({ name, ok: true }); } catch (error) { tests.push({ name, ok: false, error: error.message }); } }
function makePreparedSession() {
  const root = path.join(tempRoot, "prepared-session");
  fs.mkdirSync(path.join(root, "content"), { recursive: true });
  fs.mkdirSync(path.join(root, "state"), { recursive: true });
  writeJson(path.join(root, "state", "server-info.json"), { ok: true, instance: "prepared", host: "127.0.0.1", port: 1, url: "http://localhost:1/?key=test", session_dir: root });
  fs.writeFileSync(path.join(root, "state", "events.jsonl"), "", "utf8");
  return root;
}

test("validates constrained visual types", () => {
  const errors = validateVisual({ title: "Too many", type: "choices", items: [1, 2, 3, 4, 5].map((id) => ({ id: String(id), label: String(id) })) });
  if (!errors.some((item) => item.includes("2-4"))) throw new Error("choice limit was not enforced");
  const flowErrors = validateVisual({ title: "Broken", type: "flow", nodes: [{ id: "a" }, { id: "b" }], edges: [{ from: "a", to: "c" }] });
  if (!flowErrors.some((item) => item.includes("declared"))) throw new Error("flow references were not validated");
});

test("escapes visual content instead of accepting arbitrary HTML", () => {
  const html = renderVisual({ title: "<script>alert(1)</script>", description: "<img src=x>", type: "message", message: "<b>unsafe</b>" });
  if (html.includes("<script>") || html.includes("<img") || html.includes("<b>")) throw new Error("visual renderer emitted unescaped input");
  if (!html.includes("&lt;script&gt;") || !html.includes("&lt;b&gt;")) throw new Error("escaped content is missing");
});

test("passes HTTP authentication, origin, and event route self-checks", () => {
  const session = path.join(tempRoot, "server-self-test");
  const result = invoke(server, [
    "--session", session, "--token", crypto.randomBytes(32).toString("hex"),
    "--instance", crypto.randomBytes(24).toString("hex"), "--self-test"
  ]);
  if (!result.ok || result.unauthorized_status !== 403 || result.authorized_status !== 200 || result.rejected_origin_status !== 403 || result.accepted_event_status !== 200) throw new Error("server route self-test failed");
});

test("pushes unique, escaped screens through the manager", () => {
  const session = makePreparedSession();
  const input = writeJson(path.join(tempRoot, "visual.json"), {
    title: "CRM <workflow>", description: "Select one", type: "choices", slug: "crm-flow",
    items: [{ id: "a", label: "Central", description: "Coordinator" }, { id: "b", label: "Events", description: "<script>bad</script>" }]
  });
  const first = run(["push", "--session", session, "--input", input]);
  const second = run(["push", "--session", session, "--input", input]);
  if (first.file === second.file || !fs.existsSync(first.file) || !fs.existsSync(second.file)) throw new Error("screen filenames are not unique");
  const html = fs.readFileSync(second.file, "utf8");
  if (!html.includes("CRM &lt;workflow&gt;") || html.includes("<script>bad</script>")) throw new Error("manager did not persist escaped content");
});

test("consumes browser events exactly once", () => {
  const session = path.join(tempRoot, "prepared-session");
  const eventsFile = path.join(session, "state", "events.jsonl");
  fs.appendFileSync(eventsFile, `${JSON.stringify({ timestamp: "2026-07-20T00:00:00.000Z", type: "choice", choice: "b", label: "Events", screen: "test" })}\n`, "utf8");
  const first = run(["events", "--session", session, "--consume"]);
  if (first.event_count !== 1 || first.events[0].choice !== "b") throw new Error("choice event was not returned");
  const second = run(["events", "--session", session, "--consume"]);
  if (second.event_count !== 0) throw new Error("consumed event was returned twice");
});

test("pushes an inactive waiting screen", () => {
  const session = path.join(tempRoot, "prepared-session");
  const waiting = run(["waiting", "--session", session]);
  if (!fs.existsSync(waiting.file) || !fs.readFileSync(waiting.file, "utf8").includes("intentionally inactive")) throw new Error("waiting screen contract failed");
});

test("attempts a real loopback start or reports the sandbox boundary", () => {
  const result = spawnSync(process.execPath, [manager, "start", "--project-dir", tempRoot, "--idle-timeout-minutes", "1"], { encoding: "utf8" });
  const raw = (result.stdout || result.stderr || "").trim();
  let payload;
  try { payload = JSON.parse(raw); } catch { payload = { raw }; }
  if (result.status === 0 && payload.ok) {
    const stopped = run(["stop", "--session", payload.session_dir]);
    if (!new Set(["stopped", "stop_requested"]).has(stopped.status)) throw new Error("live server did not stop cleanly");
    return;
  }
  const logFile = payload.log;
  const log = logFile && fs.existsSync(logFile) ? fs.readFileSync(logFile, "utf8") : "";
  if (!/listen EPERM|operation not permitted/.test(log)) throw new Error(`live start failed for an unexpected reason: ${raw} ${log}`);
  environmentLimits.push("loopback_bind_blocked_by_sandbox");
});

const failed = tests.filter((item) => !item.ok);
const output = { ok: failed.length === 0, test_count: tests.length, passed: tests.length - failed.length, failed: failed.length, environment_limits: environmentLimits, tests };
process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
try { fs.rmSync(tempRoot, { recursive: true, force: true }); } catch {}
process.exit(output.ok ? 0 : 1);
