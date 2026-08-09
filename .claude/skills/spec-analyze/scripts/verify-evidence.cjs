#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ORIGIN_HASH = "0000000000000000000000000000000000000000000000000000000000000000";

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

function emit(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function abort(message, details = {}) {
  process.stderr.write(`${JSON.stringify({ ok: false, error: message, ...details }, null, 2)}\n`);
  process.exit(1);
}

function deriveRunKey(runId) {
  return crypto.createHash("sha256").update(`analyze-state-key:${runId}`).digest("hex");
}

function verifyEvidenceChain(file, runId) {
  if (!fs.existsSync(file)) abort("Evidence file does not exist", { file });
  const lines = fs.readFileSync(file, "utf8").split("\n").filter(Boolean);
  const results = [];
  let prevHash = ORIGIN_HASH;
  let chainBroken = false;
  let validCount = 0;
  let invalidCount = 0;

  for (let i = 0; i < lines.length; i++) {
    let event;
    try {
      event = JSON.parse(lines[i]);
    } catch {
      results.push({ line: i + 1, valid: false, error: "invalid JSON" });
      invalidCount++;
      chainBroken = true;
      continue;
    }

    const chain = event._chain || { prev: ORIGIN_HASH, seq: i + 1 };
    const signature = event._signature;

    if (!signature) {
      results.push({ line: i + 1, valid: false, error: "missing signature" });
      invalidCount++;
      chainBroken = true;
      continue;
    }

    // Verify chain link
    const chainOk = chain.prev === prevHash;
    if (!chainOk) chainBroken = true;

    // Verify HMAC signature
    const key = deriveRunKey(runId);
    const hmac = crypto.createHmac("sha256", key);
    hmac.update(`${prevHash}:${chain.seq}:${event.claim}`);
    const expected = hmac.digest("hex");
    const sigValid = signature === expected;

    const valid = chainOk && sigValid;
    if (valid) validCount++;
    else invalidCount++;

    results.push({
      line: i + 1,
      valid,
      claim: event.claim.length > 80 ? event.claim.substring(0, 80) + "..." : event.claim,
      chain_ok: chainOk,
      signature_valid: sigValid,
      seq: chain.seq
    });

    if (valid) prevHash = signature;
  }

  return {
    file,
    total: results.length,
    valid: validCount,
    invalid: invalidCount,
    chain_integrity: chainBroken ? "broken" : "intact",
    details: results
  };
}

const args = parseArgs(process.argv.slice(2));
const evidenceFile = args.evidence ? path.resolve(String(args.evidence)) : null;
const runId = args["run-id"] ? String(args["run-id"]) : null;

if (!evidenceFile) abort("Missing --evidence <file>");
if (!runId) abort("Missing --run-id <id>");

const result = verifyEvidenceChain(evidenceFile, runId);
emit(result);
process.exit(result.chain_integrity === "intact" && result.invalid === 0 ? 0 : 1);