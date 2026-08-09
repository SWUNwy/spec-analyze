#!/usr/bin/env node
"use strict";

/**
 * 输出文档规范校验器（零依赖）
 *
 * 检查 spec-analyze 产出的 proposal / design / tasks 等中文文档，
 * 规则以 references/chinese-writing-style.md 为准。三级结果：
 *   - error   违反硬约束，默认导致非零退出
 *   - warning 疑似不规范表达，需人工确认（--strict 时也导致失败）
 *   - style   项目风格或语境提示，不导致失败
 *
 * 自动跳过：代码块、行内代码、URL、Markdown 链接目标、API 路径。
 * 用法：
 *   node scripts/lint-output-text.js <文件或目录...>
 *   node scripts/lint-output-text.js --strict docs/spec-analyze/specs
 *   node scripts/lint-output-text.js --self-test
 */

const fs = require("fs");
const path = require("path");

const SEVERITIES = new Set(["error", "warning", "style"]);

// ─── 掩码：保护机器可读内容 ───────────────────────────────────────────────
function maskContent(text) {
  let t = text;
  // 代码块
  t = t.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, (m) => "\u2588".repeat(m.length));
  // 行内代码
  t = t.replace(/`[^`\n]+`/g, (m) => "\u2588".repeat(m.length));
  // URL
  t = t.replace(/https?:\/\/\S+/g, (m) => "\u2588".repeat(m.length));
  // Markdown 链接目标
  t = t.replace(/\]\(([^)]+)\)/g, "](████)");
  // API 路径（以 / 开头的路径片段）
  t = t.replace(/(?<![A-Za-z0-9_])\/[A-Za-z0-9._~%/-]+/g, (m) => "\u2588".repeat(m.length));
  return t;
}

// ─── 规则表 ───────────────────────────────────────────────────────────────
const wb = "(?<![A-Za-z0-9_])";   // word boundary before
const wa = "(?![A-Za-z0-9_])";   // word boundary after

const CASE_RULES = [
  [new RegExp(wb + "(?:id|Id)" + wa, "g"), "ID"],
  [new RegExp(wb + "(?:http|Http)" + wa, "g"), "HTTP"],
  [new RegExp(wb + "(?:url|Url)" + wa, "g"), "URL"],
  [new RegExp(wb + "(?:json|Json)" + wa, "g"), "JSON"],
  [new RegExp(wb + "(?:api|Api)" + wa, "g"), "API"],
  [new RegExp(wb + "(?:ai|Ai)" + wa, "g"), "AI"],
  [new RegExp(wb + "javascript" + wa, "gi"), "JavaScript"],
  [new RegExp(wb + "typescript" + wa, "gi"), "TypeScript"],
  [new RegExp(wb + "(?:llm|Llm)" + wa, "g"), "LLM"],
  [new RegExp(wb + "(?:aigc|Aigc)" + wa, "g"), "AIGC"],
  [new RegExp(wb + "(?:rag|Rag)" + wa, "g"), "RAG"],
  [new RegExp(wb + "(?:chatgpt|Chatgpt)" + wa, "g"), "ChatGPT"],
  [new RegExp(wb + "(?:openai|OpenAI)\\s+(?:api|Api)" + wa, "g"), "OpenAI API"],
  [new RegExp(wb + "python" + wa, "gi"), "Python"],
  [new RegExp(wb + "nodejs" + wa, "gi"), "Node.js"],
  [new RegExp(wb + "github" + wa, "gi"), "GitHub"],
  [new RegExp(wb + "gitlab" + wa, "gi"), "GitLab"],
  [new RegExp(wb + "postgresql" + wa, "gi"), "PostgreSQL"],
  [new RegExp(wb + "grpc" + wa, "gi"), "gRPC"],
  [new RegExp(wb + "graphql" + wa, "gi"), "GraphQL"],
  [new RegExp(wb + "websocket" + wa, "gi"), "WebSocket"],
  [new RegExp(wb + "yaml" + wa, "gi"), "YAML"],
  [new RegExp(wb + "xml" + wa, "gi"), "XML"],
  [new RegExp(wb + "jwt" + wa, "gi"), "JWT"],
  [new RegExp(wb + "embeding" + wa, "gi"), "embedding"],
  [new RegExp("提示工程学", "g"), "提示工程"],
];

const TYPO_RULES = [
  ["阀值", "阈值"],
  ["布署", "部署"],
  ["反回", "返回"],
  ["回朔", "回溯"],
  ["做为", "作为"],
  ["embeding", "embedding"],
  ["提示工程学", "提示工程"],
];

const NUMBER_RULES = [
  [/缩小了\s*\d+(?:\.\d+)?\s*倍/g, "改为「缩小到原来的 1/N」或写明减少比例"],
  [/翻了\s*1\s*倍/g, "改为「变为原来的 2 倍」"],
  [/不超过\s*\d+(?:\.\d+)?\s*以上/g, "删去「以上」，保留「不超过 N」"],
];

const BUZZWORD_RULES = [
  "赋能", "抓手", "沉淀", "对标", "拉通", "打通", "洞察", "赛道",
  "心智", "调性", "战役", "势能", "兜底", "落盘", "收口", "透传", "协同",
];

// 语境词：只提示，不失败
const CONTEXT_WORDS = [
  "场景", "生态", "体系", "路径", "触点", "卡点", "布局", "矩阵",
  "颗粒度", "复盘", "梳理", "输出", "提炼",
  "JS", "H5", "Postgres", "OAuth", "k8s",
];

// 已定义术语：spec-analyze 中「闭环」为正式术语（SKILL.md 已定义），仅提示
const DEFINED_TERMS = ["闭环"];

// ─── 扫描 ─────────────────────────────────────────────────────────────────
function scanText(text) {
  const findings = [];
  const masked = maskContent(text);

  const push = (severity, message, index, suggestion) => {
    const before = text.slice(0, index);
    const line = before.split("\n").length;
    const col = index - before.lastIndexOf("\n");
    findings.push({ severity, message, line, col, suggestion });
  };

  for (const [re, fix] of CASE_RULES) {
    let m;
    while ((m = re.exec(masked))) {
      push("error", `术语写法应为 ${fix}（当前 "${m[0]}"）`, m.index, fix);
    }
  }
  for (const [wrong, fix] of TYPO_RULES) {
    let idx = 0;
    while ((idx = masked.indexOf(wrong, idx)) !== -1) {
      push("error", `错词「${wrong}」应改为「${fix}」`, idx, fix);
      idx += wrong.length;
    }
  }
  for (const [re, fix] of NUMBER_RULES) {
    let m;
    while ((m = re.exec(masked))) {
      push("error", `数量表达不规范：${m[0]}`, m.index, fix);
    }
  }
  // 引号
  let idx = 0;
  while ((idx = masked.indexOf("“", idx)) !== -1) {
    push("error", "中文弯引号“ ”应改用直角引号「」", idx, "「」");
    idx += 1;
  }
  idx = 0;
  while ((idx = masked.indexOf("”", idx)) !== -1) {
    push("error", "中文弯引号“ ”应改用直角引号「」", idx, "「」");
    idx += 1;
  }
  idx = 0;
  while ((idx = masked.indexOf('"', idx)) !== -1) {
    push("warning", "正文出现 ASCII 双引号，建议改用直角引号「」", idx, "「」");
    idx += 1;
  }
  // 空泛词
  for (const word of BUZZWORD_RULES) {
    let i = 0;
    while ((i = masked.indexOf(word, i)) !== -1) {
      push("warning", `空泛词「${word}」：仅当有明确业务定义/正式术语/引用原文/用户要求时保留，否则改写`, i, null);
      i += word.length;
    }
  }
  for (const word of CONTEXT_WORDS) {
    let i = 0;
    while ((i = masked.indexOf(word, i)) !== -1) {
      push("style", `语境词「${word}」：确认当前上下文含义后使用`, i, null);
      i += word.length;
    }
  }
  for (const word of DEFINED_TERMS) {
    let i = 0;
    while ((i = masked.indexOf(word, i)) !== -1) {
      push("style", `「${word}」为已定义正式术语：首次出现处应保留定义说明`, i, null);
      i += word.length;
    }
  }
  return findings;
}

function scanFile(file) {
  let text;
  try {
    text = fs.readFileSync(file, "utf8");
  } catch {
    return { file, findings: [], error: `无法读取 ${file}` };
  }
  return { file, findings: scanText(text) };
}

function collectFiles(targets) {
  const files = [];
  for (const target of targets) {
    const resolved = path.resolve(target);
    if (!fs.existsSync(resolved)) continue;
    if (fs.statSync(resolved).isDirectory()) {
      for (const f of fs.readdirSync(resolved)) {
        const p = path.join(resolved, f);
        if (fs.statSync(p).isFile() && /\.(md|markdown|txt)$/i.test(f)) files.push(p);
      }
    } else {
      files.push(resolved);
    }
  }
  return files;
}

// ─── 自测 ─────────────────────────────────────────────────────────────────
function selfTest() {
  const cases = [
    ["调用 openai api。", "error", "OpenAI API"],
    ["请调整阀值。", "error", "阈值"],
    ["使用“弯引号”强调。", "error", "直角引号"],
    ["缩小了 3 倍。", "error", "数量表达不规范"],
    ["`openai api` 与 /api 不受影响。", null, null],
    ["赋能团队协同。", "warning", "空泛词"],
    ["场景分析是常态。", "style", "语境词"],
    ["id 与 json 需要规范。", "error", "ID"],
  ];
  let failed = 0;
  for (const [text, expectSeverity, expectMessage] of cases) {
    const findings = scanText(text);
    if (expectSeverity === null) {
      if (findings.length > 0) {
        console.error(`FAIL: 应无发现，实际 ${findings.map((f) => f.severity + ":" + f.message).join("; ")}`);
        failed += 1;
      } else {
        console.log(`PASS: masked "${text.slice(0, 24)}..."`);
      }
      continue;
    }
    const hit = findings.find((f) => f.severity === expectSeverity && (!expectMessage || f.message.includes(expectMessage)));
    if (hit) {
      console.log(`PASS: [${expectSeverity}] "${text.slice(0, 24)}..."`);
    } else {
      console.error(`FAIL: "${text}" 期望 [${expectSeverity}] ${expectMessage || ""}，实际 ${JSON.stringify(findings)}`);
      failed += 1;
    }
  }
  if (failed > 0) {
    console.error(`自测失败 ${failed} 项`);
    process.exit(1);
  }
  console.log(`自测通过 ${cases.length} 项`);
  process.exit(0);
}

// ─── 主流程 ───────────────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  if (args.includes("--self-test")) return selfTest();
  const strict = args.includes("--strict");
  const targets = args.filter((a) => !a.startsWith("--"));
  const finalTargets = targets.length > 0
    ? targets
    : (fs.existsSync("docs/spec-analyze") ? ["docs/spec-analyze"] : []);
  if (finalTargets.length === 0) {
    console.error("用法：node scripts/lint-output-text.js <文件或目录...> [--strict] [--self-test]");
    process.exit(2);
  }
  const missing = finalTargets.filter((t) => !fs.existsSync(path.resolve(t)));
  if (missing.length > 0) {
    console.error(`目标不存在：${missing.join(", ")}`);
    process.exit(2);
  }
  const files = collectFiles(finalTargets);
  const results = files.map(scanFile);
  let errorCount = 0;
  let warningCount = 0;
  let styleCount = 0;
  for (const r of results) {
    for (const f of r.findings) {
      if (f.severity === "error") errorCount += 1;
      else if (f.severity === "warning") warningCount += 1;
      else styleCount += 1;
      const flag = f.severity === "error" ? "ERROR" : f.severity === "warning" ? "WARN" : "STYLE";
      console.log(`${flag}  ${r.file}:${f.line}:${f.col}  ${f.message}${f.suggestion ? ` → ${f.suggestion}` : ""}`);
    }
  }
  const failOnWarning = strict && warningCount > 0;
  const failOnError = errorCount > 0;
  console.log(`\n检查 ${files.length} 个文件：${errorCount} error, ${warningCount} warning, ${styleCount} style`);
  if (failOnError || failOnWarning) {
    console.log(failOnError ? "未通过：存在 error" : "未通过（--strict）：存在 warning");
    process.exit(1);
  }
  console.log(files.length ? "通过" : "无文件可检查");
  process.exit(0);
}

main();
