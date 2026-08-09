#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (!argv[i].startsWith("--")) continue;
    const key = argv[i].slice(2);
    out[key] = argv[i + 1];
    i += 1;
  }
  return out;
}

function fail(message) {
  process.stderr.write(`${JSON.stringify({ ok: false, error: message }, null, 2)}\n`);
  process.exit(1);
}

const args = parseArgs(process.argv.slice(2));
if (!args.result) fail("Missing --result <scorecard.json>");
const file = path.resolve(args.result);
if (!fs.existsSync(file)) fail(`Missing result file: ${file}`);
let scorecard;
try { scorecard = JSON.parse(fs.readFileSync(file, "utf8")); }
catch (error) { fail(`Invalid JSON: ${error.message}`); }

if (!Array.isArray(scorecard.criteria) || scorecard.criteria.length === 0) fail("criteria[] is required");
const threshold = Number(scorecard.threshold === undefined ? 0.8 : scorecard.threshold);
if (!(threshold >= 0 && threshold <= 1)) fail("threshold must be between 0 and 1");
let weightSum = 0;
let weighted = 0;
const issues = [];
for (const item of scorecard.criteria) {
  const score = Number(item.score);
  const weight = Number(item.weight);
  if (!(score >= 0 && score <= 4)) issues.push(`${item.id || "criterion"}: score must be 0..4`);
  if (!(weight > 0 && weight <= 1)) issues.push(`${item.id || "criterion"}: weight must be >0..1`);
  if (!Array.isArray(item.evidence) || item.evidence.length === 0) issues.push(`${item.id || "criterion"}: evidence[] is required`);
  weightSum += weight;
  weighted += (score / 4) * weight;
}
if (Math.abs(weightSum - 1) > 0.001) issues.push(`weights must sum to 1; got ${weightSum}`);
const hardFails = Array.isArray(scorecard.hard_fails) ? scorecard.hard_fails.filter(Boolean) : [];
const verdict = issues.length === 0 && hardFails.length === 0 && weighted >= threshold ? "pass" : "fail";
const output = {
  ok: verdict === "pass",
  verdict,
  weighted_score: Number(weighted.toFixed(4)),
  threshold,
  hard_fails: hardFails,
  issues
};
process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
process.exit(output.ok ? 0 : 1);

