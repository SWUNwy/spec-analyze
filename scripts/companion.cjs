#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const http = require("http");
const { spawn, execFile } = require("child_process");

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
function required(args, key) {
  if (args[key] === undefined || args[key] === true || String(args[key]).trim() === "") abort(`Missing --${key}`);
  return String(args[key]);
}
function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function readJson(file, label) {
  if (!fs.existsSync(file)) abort(`${label} does not exist`, { file });
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { abort(`${label} is invalid JSON`, { file, detail: error.message }); }
}
function safeSlug(value) {
  const slug = String(value || "visual").toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  return slug || "visual";
}
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
}
function validateVisual(data) {
  const errors = [];
  if (!data || typeof data !== "object" || Array.isArray(data)) return ["visual input must be an object"];
  if (typeof data.title !== "string" || !data.title.trim()) errors.push("title is required");
  if (!new Set(["choices", "matrix", "flow", "message"]).has(data.type)) errors.push("type must be choices, matrix, flow, or message");
  if (data.type === "choices") {
    if (!Array.isArray(data.items) || data.items.length < 2 || data.items.length > 4) errors.push("choices requires 2-4 items");
    else for (const item of data.items) if (!item || typeof item.id !== "string" || !item.id.trim() || typeof item.label !== "string" || !item.label.trim()) errors.push("each choice requires id and label");
  }
  if (data.type === "matrix") {
    if (!Array.isArray(data.columns) || data.columns.length < 2 || !Array.isArray(data.rows) || data.rows.length < 1) errors.push("matrix requires at least two columns and one row");
  }
  if (data.type === "flow") {
    if (!Array.isArray(data.nodes) || data.nodes.length < 2 || !Array.isArray(data.edges) || data.edges.length < 1) errors.push("flow requires at least two nodes and one edge");
    else {
      const ids = new Set(data.nodes.map((node) => node && node.id));
      for (const edge of data.edges) if (!edge || !ids.has(edge.from) || !ids.has(edge.to)) errors.push("every flow edge must reference declared nodes");
    }
  }
  if (data.type === "message" && typeof data.message !== "string") errors.push("message type requires message");
  return errors;
}
function renderVisual(data) {
  const errors = validateVisual(data);
  if (errors.length) throw new Error(errors.join("; "));
  let body = `<h1>${esc(data.title)}</h1><p class="description">${esc(data.description || "")}</p>`;
  if (data.type === "choices") {
    body += '<section class="grid">';
    for (const item of data.items) body += `<button class="card" data-choice="${esc(item.id)}" data-label="${esc(item.label)}"><span class="id">${esc(item.id)}</span><h2>${esc(item.label)}</h2><p>${esc(item.description || "")}</p></button>`;
    body += "</section>";
  }
  if (data.type === "matrix") {
    body += `<table><thead><tr>${data.columns.map((column) => `<th>${esc(column)}</th>`).join("")}</tr></thead><tbody>`;
    for (const row of data.rows) body += `<tr>${data.columns.map((column) => `<td>${esc(row && row[column])}</td>`).join("")}</tr>`;
    body += "</tbody></table>";
  }
  if (data.type === "flow") {
    const nodes = Object.fromEntries(data.nodes.map((node) => [node.id, node]));
    body += '<section class="flow">';
    for (const edge of data.edges) body += `<div class="node"><span class="id">${esc(edge.from)}</span><h2>${esc(nodes[edge.from].label || edge.from)}</h2></div><span class="arrow">→</span><div class="node"><span class="id">${esc(edge.to)}</span><h2>${esc(nodes[edge.to].label || edge.to)}</h2></div>`;
    body += "</section>";
  }
  if (data.type === "message") body = `<section class="message"><div><h1>${esc(data.title)}</h1><p>${esc(data.message)}</p></div></section>`;
  return body;
}
function sessionPaths(session) {
  const root = path.resolve(session);
  return { root, content: path.join(root, "content"), state: path.join(root, "state"), info: path.join(root, "state", "server-info.json"), stopped: path.join(root, "state", "server-stopped.json"), events: path.join(root, "state", "events.jsonl"), cursor: path.join(root, "state", "events.cursor") };
}
function request(info, method, pathname, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(info.url);
    const data = body === undefined ? null : Buffer.from(JSON.stringify(body));
    const req = http.request({
      hostname: info.host === "127.0.0.1" ? "127.0.0.1" : info.host,
      port: info.port,
      method,
      path: `${pathname}${pathname.includes("?") ? "&" : "?"}key=${encodeURIComponent(url.searchParams.get("key"))}`,
      headers: data ? { "content-type": "application/json", "content-length": data.length } : {}
    }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const text = Buffer.concat(chunks).toString("utf8");
        let payload;
        try { payload = JSON.parse(text); } catch { payload = { raw: text }; }
        resolve({ status: res.statusCode, payload, headers: res.headers });
      });
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}
function maybeOpen(url) {
  let command = null;
  if (process.platform === "darwin") command = ["open", [url]];
  else if (process.platform === "win32") command = ["rundll32.exe", ["url.dll,FileProtocolHandler", url]];
  else if (process.env.DISPLAY || process.env.WAYLAND_DISPLAY) command = ["xdg-open", [url]];
  if (command) execFile(command[0], command[1], () => {});
}

async function commandStart(args) {
  const projectDir = args["project-dir"] ? path.resolve(String(args["project-dir"])) : null;
  if (projectDir && !fs.existsSync(projectDir)) abort("Project directory does not exist", { project_dir: projectDir });
  const id = `${process.pid}-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;
  const session = projectDir ? path.join(projectDir, ".analyze", "companion", id) : path.join(os.tmpdir(), `analyze-companion-${id}`);
  const paths = sessionPaths(session);
  fs.mkdirSync(paths.content, { recursive: true, mode: 0o700 });
  fs.mkdirSync(paths.state, { recursive: true, mode: 0o700 });
  const token = crypto.randomBytes(32).toString("hex");
  const instance = crypto.randomBytes(24).toString("hex");
  const host = String(args.host || "127.0.0.1");
  const idleMinutes = Number(args["idle-timeout-minutes"] || 240);
  if (!Number.isFinite(idleMinutes) || idleMinutes <= 0) abort("--idle-timeout-minutes must be positive");
  const log = fs.openSync(path.join(paths.state, "server.log"), "a", 0o600);
  const child = spawn(process.execPath, [
    path.join(__dirname, "companion-server.cjs"), "--session", session, "--token", token,
    "--instance", instance, "--host", host, "--port", String(args.port || 0),
    "--idle-ms", String(Math.floor(idleMinutes * 60 * 1000))
  ], { detached: true, stdio: ["ignore", log, log] });
  child.unref();
  fs.closeSync(log);
  fs.writeFileSync(path.join(paths.state, "launcher.json"), `${JSON.stringify({ pid: child.pid, instance, started_at: new Date().toISOString() }, null, 2)}\n`, { mode: 0o600 });
  let info = null;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (fs.existsSync(paths.info)) { info = readJson(paths.info, "Server info"); break; }
    if (child.exitCode !== null) break;
    await sleep(50);
  }
  if (!info) abort("Companion server failed to start", { session, log: path.join(paths.state, "server.log") });
  if (args.open) maybeOpen(info.url);
  emit({ ok: true, command: "start", ...info });
}
function commandPush(args) {
  const paths = sessionPaths(required(args, "session"));
  if (!fs.existsSync(paths.info)) abort("Companion is not running", { session: paths.root });
  const input = path.resolve(required(args, "input"));
  const data = readJson(input, "Visual input");
  let html;
  try { html = renderVisual(data); } catch (error) { abort("Visual input failed validation", { errors: error.message.split("; ") }); }
  const slug = safeSlug(data.slug || data.title);
  const file = path.join(paths.content, `${Date.now()}-${crypto.randomBytes(2).toString("hex")}-${slug}.html`);
  fs.writeFileSync(file, `${html}\n`, { encoding: "utf8", flag: "wx", mode: 0o600 });
  emit({ ok: true, command: "push", file, type: data.type, interactive: data.type === "choices" });
}
function commandWaiting(args) {
  const paths = sessionPaths(required(args, "session"));
  if (!fs.existsSync(paths.info)) abort("Companion is not running", { session: paths.root });
  const file = path.join(paths.content, `${Date.now()}-${crypto.randomBytes(2).toString("hex")}-waiting.html`);
  fs.writeFileSync(file, '<section class="message"><div><h1>Continuing in chat</h1><p>This screen is intentionally inactive.</p></div></section>\n', { encoding: "utf8", flag: "wx", mode: 0o600 });
  emit({ ok: true, command: "waiting", file });
}
function commandEvents(args) {
  const paths = sessionPaths(required(args, "session"));
  const lines = fs.existsSync(paths.events) ? fs.readFileSync(paths.events, "utf8").split(/\r?\n/).filter(Boolean) : [];
  const cursor = fs.existsSync(paths.cursor) ? Number(fs.readFileSync(paths.cursor, "utf8").trim()) || 0 : 0;
  const events = lines.slice(cursor).map((line, index) => {
    try { return JSON.parse(line); } catch { return { invalid: true, line: cursor + index + 1 }; }
  });
  if (args.consume) fs.writeFileSync(paths.cursor, `${lines.length}\n`, { mode: 0o600 });
  emit({ ok: true, command: "events", cursor_before: cursor, cursor_after: args.consume ? lines.length : cursor, event_count: events.length, events });
}
async function commandStatus(args) {
  const paths = sessionPaths(required(args, "session"));
  if (!fs.existsSync(paths.info)) {
    emit({ ok: true, command: "status", running: false, stopped: fs.existsSync(paths.stopped) ? readJson(paths.stopped, "Stop marker") : null, session: paths.root });
    return;
  }
  const info = readJson(paths.info, "Server info");
  try {
    const response = await request(info, "GET", "/api/status");
    emit({ ok: response.status === 200 && response.payload.ok, command: "status", running: response.status === 200 && response.payload.ok, info: response.payload, session: paths.root });
  } catch (error) { emit({ ok: true, command: "status", running: false, error: error.message, session: paths.root }); }
}
async function commandStop(args) {
  const paths = sessionPaths(required(args, "session"));
  if (!fs.existsSync(paths.info)) { emit({ ok: true, command: "stop", status: "not_running", session: paths.root }); return; }
  const info = readJson(paths.info, "Server info");
  let response;
  try { response = await request(info, "POST", "/api/stop", {}); }
  catch (error) { abort("Failed to request companion stop", { error: error.message }); }
  if (response.status !== 200 || !response.payload.ok || response.payload.instance !== info.instance) abort("Companion stop response failed instance validation", { response: response.payload });
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (fs.existsSync(paths.stopped)) break;
    await sleep(50);
  }
  emit({ ok: true, command: "stop", status: fs.existsSync(paths.stopped) ? "stopped" : "stop_requested", session: paths.root });
}
function usage() {
  process.stdout.write(`companion\n\nCommands:\n  start [--project-dir <dir>] [--open] [--idle-timeout-minutes 240]\n  push --session <dir> --input <visual.json>\n  waiting --session <dir>\n  events --session <dir> [--consume]\n  status --session <dir>\n  stop --session <dir>\n`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];
  if (!command || command === "help" || args.help) { usage(); return; }
  if (command === "start") return commandStart(args);
  if (command === "push") return commandPush(args);
  if (command === "waiting") return commandWaiting(args);
  if (command === "events") return commandEvents(args);
  if (command === "status") return commandStatus(args);
  if (command === "stop") return commandStop(args);
  abort("Unknown command", { command });
}

if (require.main === module) main().catch((error) => abort(error.message));
module.exports = { validateVisual, renderVisual, safeSlug };
