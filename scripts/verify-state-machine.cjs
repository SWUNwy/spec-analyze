#!/usr/bin/env node
"use strict";

// ─── State Machine Definition ──────────────────────────────────────────────

const TRANSITIONS = {
  intake: ["scoped", "awaiting_user", "stopped", "blocked"],
  scoped: ["discovering", "synthesizing", "awaiting_user", "stopped", "blocked"],
  discovering: ["synthesizing", "awaiting_user", "stopped", "blocked"],
  synthesizing: ["discovering", "verifying", "awaiting_user", "stopped", "blocked"],
  verifying: ["repairing", "awaiting_user", "completed", "stopped", "blocked"],
  repairing: ["discovering", "synthesizing", "verifying", "awaiting_user", "stopped", "blocked"],
  awaiting_user: ["scoped", "discovering", "synthesizing", "verifying", "stopped", "blocked"],
  completed: [],
  stopped: [],
  blocked: []
};

const TERMINAL_STATES = new Set(["completed", "stopped", "blocked"]);
const ALL_STATES = Object.keys(TRANSITIONS);

// ─── Property Verifications ────────────────────────────────────────────────

function verifyDeadlockFreedom() {
  const nonTerminal = ALL_STATES.filter(s => !TERMINAL_STATES.has(s));
  const deadlocks = nonTerminal.filter(s => TRANSITIONS[s].length === 0);
  return {
    property: "deadlock_freedom",
    pass: deadlocks.length === 0,
    detail: deadlocks.length === 0
      ? `All ${nonTerminal.length} non-terminal states have outgoing transitions`
      : `Deadlock states: ${deadlocks.join(", ")}`
  };
}

function verifyReachability() {
  const reachable = new Set(["intake"]);
  const queue = ["intake"];
  while (queue.length > 0) {
    const current = queue.shift();
    for (const next of TRANSITIONS[current] || []) {
      if (!reachable.has(next)) {
        reachable.add(next);
        queue.push(next);
      }
    }
  }
  const unreachable = ALL_STATES.filter(s => !reachable.has(s));
  return {
    property: "reachability",
    pass: unreachable.length === 0,
    reachable: reachable.size,
    total: ALL_STATES.length,
    detail: unreachable.length === 0
      ? `All ${ALL_STATES.length} states reachable from intake`
      : `Unreachable states: ${unreachable.join(", ")}`,
    unreachable
  };
}

function verifyMaxPathLength() {
  // BFS from intake to completed
  const visited = new Set();
  const queue = [{ state: "intake", path: ["intake"] }];
  let shortestPath = null;

  while (queue.length > 0) {
    const { state, path } = queue.shift();
    if (state === "completed") {
      shortestPath = path;
      break;
    }
    if (visited.has(state)) continue;
    visited.add(state);
    for (const next of TRANSITIONS[state] || []) {
      if (!visited.has(next)) {
        queue.push({ state: next, path: [...path, next] });
      }
    }
  }

  return {
    property: "max_path_length",
    pass: shortestPath ? shortestPath.length <= 15 : false,
    length: shortestPath ? shortestPath.length : null,
    shortest_path: shortestPath,
    detail: shortestPath
      ? `Shortest path from intake to completed: ${shortestPath.join(" → ")} (${shortestPath.length} steps)`
      : "No path from intake to completed found"
  };
}

function verifyLiveness() {
  // Check that every cycle contains at least one state that can reach completed
  // Simplified: verify that all non-terminal states have a path to completed
  let allCanReachCompleted = true;
  const cannotReach = [];

  for (const state of ALL_STATES) {
    if (TERMINAL_STATES.has(state)) continue;
    const visited = new Set();
    const queue = [state];
    let found = false;
    while (queue.length > 0) {
      const current = queue.shift();
      if (current === "completed") { found = true; break; }
      if (visited.has(current)) continue;
      visited.add(current);
      for (const next of TRANSITIONS[current] || []) {
        if (!visited.has(next)) queue.push(next);
      }
    }
    if (!found) {
      allCanReachCompleted = false;
      cannotReach.push(state);
    }
  }

  return {
    property: "liveness",
    pass: allCanReachCompleted,
    detail: allCanReachCompleted
      ? "All non-terminal states can reach completed"
      : `States that cannot reach completed: ${cannotReach.join(", ")}`
  };
}

function verifyDeterminism() {
  const duplicates = [];
  for (const [state, targets] of Object.entries(TRANSITIONS)) {
    const seen = new Set();
    for (const target of targets) {
      if (seen.has(target)) {
        duplicates.push({ state, target });
      }
      seen.add(target);
    }
  }
  return {
    property: "determinism",
    pass: duplicates.length === 0,
    detail: duplicates.length === 0
      ? "All states have unique transition targets"
      : `Duplicate transitions: ${duplicates.map(d => `${d.state} → ${d.target}`).join(", ")}`
  };
}

function verifySinkStates() {
  const sinks = ALL_STATES.filter(s => TRANSITIONS[s].length === 0);
  const terminalSinks = sinks.filter(s => TERMINAL_STATES.has(s));
  const nonTerminalSinks = sinks.filter(s => !TERMINAL_STATES.has(s));
  return {
    property: "sink_states",
    pass: nonTerminalSinks.length === 0 && terminalSinks.length === TERMINAL_STATES.size,
    detail: nonTerminalSinks.length > 0
      ? `Non-terminal sink states: ${nonTerminalSinks.join(", ")}`
      : `All ${terminalSinks.length} terminal states have empty transitions (sinks)`
  };
}

// ─── CLI ───────────────────────────────────────────────────────────────────

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

const PROPERTY_MAP = {
  "deadlock-freedom": verifyDeadlockFreedom,
  "reachability": verifyReachability,
  "max-path-length": verifyMaxPathLength,
  "liveness": verifyLiveness,
  "determinism": verifyDeterminism,
  "sink-states": verifySinkStates
};

const args = parseArgs(process.argv.slice(2));
const propertyFilter = args.property || "all";

const selectedProps = propertyFilter === "all"
  ? Object.keys(PROPERTY_MAP)
  : [propertyFilter];

const results = [];
for (const name of selectedProps) {
  const fn = PROPERTY_MAP[name];
  if (!fn) {
    process.stderr.write(JSON.stringify({ ok: false, error: `Unknown property: ${name}` }) + "\n");
    process.exit(1);
  }
  results.push(fn());
}

const output = {
  ok: true,
  command: "verify-state-machine",
  properties: results,
  all_pass: results.every(r => r.pass)
};

process.stdout.write(JSON.stringify(output, null, 2) + "\n");