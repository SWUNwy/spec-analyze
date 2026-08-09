#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const crypto = require("crypto");

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) out[key] = true;
    else { out[key] = next; i += 1; }
  }
  return out;
}
function required(args, key) {
  if (args[key] === undefined || args[key] === true || String(args[key]).trim() === "") throw new Error(`Missing --${key}`);
  return String(args[key]);
}
function atomicWrite(file, content, mode) {
  const tmp = `${file}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, content, { encoding: "utf8", ...(mode ? { mode } : {}) });
  fs.renameSync(tmp, file);
}
function safeEqual(a, b) {
  const left = Buffer.from(String(a || ""));
  const right = Buffer.from(String(b || ""));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}
function parseCookies(header) {
  const out = {};
  for (const part of String(header || "").split(";")) {
    const index = part.indexOf("=");
    if (index > 0) out[part.slice(0, index).trim()] = part.slice(index + 1).trim();
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const sessionDir = path.resolve(required(args, "session"));
const token = required(args, "token");
const instance = required(args, "instance");
const host = String(args.host || "127.0.0.1");
const requestedPort = Number(args.port || 0);
const idleMs = Number(args["idle-ms"] || 4 * 60 * 60 * 1000);
if (!Number.isInteger(requestedPort) || requestedPort < 0 || requestedPort > 65535) throw new Error("Invalid --port");
if (!Number.isFinite(idleMs) || idleMs < 1000) throw new Error("Invalid --idle-ms");

const contentDir = path.join(sessionDir, "content");
const stateDir = path.join(sessionDir, "state");
const infoFile = path.join(stateDir, "server-info.json");
const stoppedFile = path.join(stateDir, "server-stopped.json");
const eventsFile = path.join(stateDir, "events.jsonl");
const frameFile = path.join(__dirname, "..", "assets", "companion-frame.html");
fs.mkdirSync(contentDir, { recursive: true, mode: 0o700 });
fs.mkdirSync(stateDir, { recursive: true, mode: 0o700 });
if (!fs.existsSync(eventsFile)) fs.writeFileSync(eventsFile, "", { mode: 0o600 });
try { fs.unlinkSync(stoppedFile); } catch {}
let lastActivity = Date.now();

function securityHeaders(extra = {}) {
  return {
    "cache-control": "no-store",
    "referrer-policy": "no-referrer",
    "x-frame-options": "DENY",
    "x-content-type-options": "nosniff",
    "cross-origin-resource-policy": "same-origin",
    "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'",
    ...extra
  };
}
function json(res, code, value, headers = {}) {
  res.writeHead(code, securityHeaders({ "content-type": "application/json; charset=utf-8", ...headers }));
  res.end(`${JSON.stringify(value)}\n`);
}
function keyFromUrl(url) {
  try { return new URL(url, "http://companion.local").searchParams.get("key"); }
  catch { return null; }
}
function authorized(req) {
  const query = keyFromUrl(req.url);
  if (query && safeEqual(query, token)) return true;
  return safeEqual(parseCookies(req.headers.cookie).analyze_companion, token);
}
function sameOrigin(req) {
  if (!req.headers.origin) return true;
  return req.headers.origin === `http://${req.headers.host}`;
}
function newestScreen() {
  const entries = fs.readdirSync(contentDir)
    .filter((name) => /^[a-zA-Z0-9][a-zA-Z0-9._-]*\.html$/.test(name))
    .map((name) => {
      const file = path.join(contentDir, name);
      const stat = fs.lstatSync(file);
      return stat.isFile() && !stat.isSymbolicLink() ? { name, file, mtime: stat.mtimeMs } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.mtime - a.mtime);
  return entries[0] || null;
}
function screenVersion() {
  const screen = newestScreen();
  return screen ? `${screen.name}:${Math.floor(screen.mtime)}` : "waiting:0";
}
function renderPage() {
  const screen = newestScreen();
  const fragment = screen ? fs.readFileSync(screen.file, "utf8") : '<section class="message"><div><h1>Waiting for a visual</h1><p>The analysis continues in chat.</p></div></section>';
  const title = screen ? screen.name.replace(/\.html$/, "") : "Analyze Companion";
  return fs.readFileSync(frameFile, "utf8")
    .replace("<!-- TITLE -->", title.replace(/[<&]/g, ""))
    .replace("<!-- CONTENT -->", fragment)
    .replace("<!-- VERSION -->", screenVersion());
}
function readBody(req, limit = 32768) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) { reject(new Error("body too large")); req.destroy(); return; }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

let server;
let idleTimer;
function shutdown(reason) {
  try { fs.unlinkSync(infoFile); } catch {}
  atomicWrite(stoppedFile, `${JSON.stringify({ instance, reason, timestamp: new Date().toISOString() })}\n`, 0o600);
  clearInterval(idleTimer);
  if (server) server.close(() => process.exit(0));
  else process.exit(0);
  setTimeout(() => process.exit(0), 1000).unref();
}

async function handleRequest(req, res) {
  const pathname = (() => { try { return new URL(req.url, "http://companion.local").pathname; } catch { return "/invalid"; } })();
  if (!authorized(req)) { json(res, 403, { ok: false, error: "session key required" }); return; }
  lastActivity = Date.now();
  const cookie = `analyze_companion=${token}; HttpOnly; SameSite=Strict; Path=/`;
  if (req.method === "GET" && pathname === "/" && keyFromUrl(req.url)) {
    res.writeHead(302, securityHeaders({ location: "/", "set-cookie": cookie }));
    res.end();
    return;
  }
  if (req.method === "GET" && pathname === "/") {
    res.writeHead(200, securityHeaders({ "content-type": "text/html; charset=utf-8", "set-cookie": cookie }));
    res.end(renderPage());
    return;
  }
  if (req.method === "GET" && pathname === "/api/status") { json(res, 200, { ok: true, instance, pid: process.pid, version: screenVersion() }); return; }
  if (req.method === "GET" && pathname === "/api/version") { json(res, 200, { ok: true, version: screenVersion() }); return; }
  if (req.method === "POST" && pathname === "/api/events") {
    if (!sameOrigin(req)) { json(res, 403, { ok: false, error: "origin rejected" }); return; }
    try {
      const event = JSON.parse(await readBody(req));
      if (event.type !== "choice" || typeof event.choice !== "string" || !event.choice.trim() || event.choice.length > 200) throw new Error("invalid choice event");
      const stored = {
        timestamp: new Date().toISOString(), type: "choice", choice: event.choice,
        label: typeof event.label === "string" ? event.label.slice(0, 500) : null,
        screen: typeof event.screen === "string" ? event.screen.slice(0, 300) : screenVersion()
      };
      fs.appendFileSync(eventsFile, `${JSON.stringify(stored)}\n`, "utf8");
      json(res, 200, { ok: true, event: stored });
    } catch (error) { json(res, 400, { ok: false, error: error.message }); }
    return;
  }
  if (req.method === "POST" && pathname === "/api/stop") {
    if (!sameOrigin(req)) { json(res, 403, { ok: false, error: "origin rejected" }); return; }
    json(res, 200, { ok: true, status: "stopping", instance });
    setImmediate(() => shutdown("requested"));
    return;
  }
  json(res, 404, { ok: false, error: "not found" });
}

server = http.createServer(handleRequest);

server.on("error", (error) => {
  process.stderr.write(`${JSON.stringify({ ok: false, error: error.message })}\n`);
  process.exit(1);
});
async function selfTest() {
  const { Readable } = require("stream");
  function mockRequest(method, url, headers = {}, body = "") {
    const req = Readable.from(body ? [Buffer.from(body)] : []);
    req.method = method;
    req.url = url;
    req.headers = headers;
    return req;
  }
  async function invoke(method, url, headers, body) {
    const captured = { status: null, headers: null, body: "" };
    const res = {
      writeHead(status, headersOut) { captured.status = status; captured.headers = headersOut; },
      end(value) { if (value) captured.body += String(value); }
    };
    await handleRequest(mockRequest(method, url, headers, body), res);
    return captured;
  }
  const unauthorized = await invoke("GET", "/api/status", {});
  const authorizedStatus = await invoke("GET", `/api/status?key=${encodeURIComponent(token)}`, {});
  const rejectedOrigin = await invoke("POST", `/api/events?key=${encodeURIComponent(token)}`, { origin: "https://evil.example", host: "localhost" }, JSON.stringify({ type: "choice", choice: "a" }));
  const acceptedEvent = await invoke("POST", `/api/events?key=${encodeURIComponent(token)}`, {}, JSON.stringify({ type: "choice", choice: "a", label: "A", screen: "self-test" }));
  const eventLines = fs.readFileSync(eventsFile, "utf8").split(/\r?\n/).filter(Boolean);
  const result = {
    ok: unauthorized.status === 403 && authorizedStatus.status === 200 && rejectedOrigin.status === 403 && acceptedEvent.status === 200 && eventLines.length === 1,
    unauthorized_status: unauthorized.status,
    authorized_status: authorizedStatus.status,
    rejected_origin_status: rejectedOrigin.status,
    accepted_event_status: acceptedEvent.status,
    event_count: eventLines.length
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exit(result.ok ? 0 : 1);
}

if (args["self-test"]) {
  selfTest().catch((error) => {
    process.stderr.write(`${JSON.stringify({ ok: false, error: error.message })}\n`);
    process.exit(1);
  });
} else {
  server.listen(requestedPort, host, () => {
    const address = server.address();
    const urlHost = host === "127.0.0.1" ? "localhost" : host.includes(":") ? `[${host}]` : host;
    const info = {
      ok: true, type: "server-started", instance, pid: process.pid, host,
      port: address.port, url: `http://${urlHost}:${address.port}/?key=${token}`,
      session_dir: sessionDir, content_dir: contentDir, state_dir: stateDir, idle_timeout_ms: idleMs
    };
    atomicWrite(infoFile, `${JSON.stringify(info, null, 2)}\n`, 0o600);
    process.stdout.write(`${JSON.stringify(info)}\n`);
  });

  idleTimer = setInterval(() => {
    if (Date.now() - lastActivity > idleMs) shutdown("idle timeout");
  }, Math.min(60000, Math.max(500, Math.floor(idleMs / 4))));
  idleTimer.unref();
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}
