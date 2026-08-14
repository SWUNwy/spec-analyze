#!/usr/bin/env node
/**
 * test-annotations.cjs — validate-annotations.js VIEW_DESCS 兼容模式回归测试
 * 用法: node scripts/test-annotations.cjs
 * 依赖: 无 (纯 Node.js)
 */

const { execFileSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const NODE = process.execPath;
const VALIDATOR = path.join(ROOT, 'scripts', 'validate-annotations.js');
const GOOD = path.join(ROOT, 'tests', 'annotations', 'view-descs-good.html');
const BAD = path.join(ROOT, 'tests', 'annotations', 'view-descs-bad.html');
const CHINESE = path.join(ROOT, 'tests', 'annotations', 'chinese-titles.html');
const NO_API = path.join(ROOT, 'tests', 'annotations', 'no-api.html');

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

check('VIEW_DESCS 完整卡片应判定通过（exit 0）', () => {
  const out = execFileSync(NODE, [VALIDATOR, GOOD], { encoding: 'utf-8' });
  if (!/VIEW_DESCS 兼容模式/.test(out)) throw new Error('未进入 VIEW_DESCS 模式');
  if (!/总计: 1 卡片  通过: 1  失败: 0/.test(out)) throw new Error(`通过数不符:\n${out.slice(0, 400)}`);
});

check('VIEW_DESCS 缺状态行卡片应 exit 1 且命中缺失', () => {
  let exitCode = 0;
  let out = '';
  try {
    out = execFileSync(NODE, [VALIDATOR, BAD], { encoding: 'utf-8' });
  } catch (e) {
    exitCode = e.status;
    out = e.stdout ? String(e.stdout) : String(e.message);
  }
  if (exitCode !== 1) throw new Error(`期望 exit 1，实际 ${exitCode}`);
  if (!/缺失: state/.test(out)) throw new Error('应命中缺失 state');
  if (!/总计: 1 卡片  通过: 0  失败: 1/.test(out)) throw new Error(`失败数不符:\n${out.slice(0, 400)}`);
});

check('ANNOTATIONS 中文块标题应通过（exit 0）', () => {
  const out = execFileSync(NODE, [VALIDATOR, CHINESE], { encoding: 'utf-8' });
  if (!/总计: 1  通过: 1  失败: 0/.test(out)) throw new Error(`未通过:\n${out.slice(0, 400)}`);
  if (/缺少必填块/.test(out)) throw new Error('中文标题被误判为缺少必填块');
});

check('ANNOTATIONS 无 API 块应通过（api 不再必填，exit 0）', () => {
  const out = execFileSync(NODE, [VALIDATOR, NO_API], { encoding: 'utf-8' });
  if (!/总计: 1  通过: 1  失败: 0/.test(out)) throw new Error(`未通过:\n${out.slice(0, 400)}`);
  if (/缺少必填块: api|缺少 api/.test(out)) throw new Error('api 仍被强制要求');
});

console.log('');
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
