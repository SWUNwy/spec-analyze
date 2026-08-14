#!/usr/bin/env node
/**
 * test-prd.cjs — validate-prd.js 回归测试
 * 用法: node scripts/test-prd.cjs
 * 依赖: 无 (纯 Node.js)
 */

const { execFileSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const NODE = process.execPath;
const VALIDATOR = path.join(ROOT, 'scripts', 'validate-prd.js');
const GOOD = path.join(ROOT, 'tests', 'prd', 'prd-001-sample.md');
const DEFECTIVE = path.join(ROOT, 'tests', 'prd', 'prd-002-defective.md');

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`  • ${name} ... PASS`);
    passed++;
  } catch (e) {
    console.log(`  • ${name} ... FAIL`);
    console.log(`      ${e.message}`);
    failed++;
  }
}

check('完整 PRD 应判定 Ready（exit 0）', () => {
  const out = execFileSync(NODE, [VALIDATOR, GOOD], { encoding: 'utf-8' });
  if (!/Ready（通过）/.test(out)) throw new Error(`未判定 Ready:\n${out.slice(0, 400)}`);
});

check('缺陷 PRD（缺状态流转/验收标准）应判定 Not Ready（exit 1）', () => {
  let exitCode = 0;
  let out = '';
  try {
    out = execFileSync(NODE, [VALIDATOR, DEFECTIVE], { encoding: 'utf-8' });
  } catch (e) {
    exitCode = e.status;
    out = e.stdout ? String(e.stdout) : String(e.message);
  }
  if (exitCode !== 1) throw new Error(`期望 exit 1，实际 ${exitCode}`);
  if (!/Not Ready（不通过）/.test(out)) throw new Error(`未判定 Not Ready:\n${out.slice(0, 400)}`);
  if (!/RC-22/.test(out) || !/RC-40/.test(out)) throw new Error('应命中 RC-22 与 RC-40');
});

console.log('');
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
