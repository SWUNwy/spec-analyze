# 编写 Skill（Writing Skills）

> 改编自 superpowers 插件 v6.1.1（MIT）。方法论保留；语气对齐 analyze。

## 何时加载

创建新 skill、编辑既有 skill、或部署前验证 skill 有效时加载。

## 核心原则

写 skill 就是**对流程文档做测试驱动开发**。你写测试用例（用子代理的压力场景）、看它们失败（基线行为）、写 skill（文档）、看测试通过（代理合规）、重构（堵漏洞）。

如果你没看过代理在无 skill 时失败，你就不知道 skill 是否教对了东西。

## 铁律

```
NO SKILL WITHOUT A FAILING TEST FIRST
```

适用于新 skill 与既有 skill 的编辑。测试前写 skill？删掉。重来。

没有例外：
- 不因"简单添加"例外
- 不因"只是加一节"例外
- 不因"文档更新"例外
- 不要把未测试改动当"reference"保留
- 不要在跑测试时"adapt"
- 删除就是删除

## Skill 的 TDD 映射

| TDD 概念 | Skill 创建 |
|---|---|
| 测试用例 | 用子代理的压力场景 |
| 生产代码 | Skill 文档（SKILL.md） |
| 测试失败（RED） | 无 skill 时代理违反规则（基线） |
| 测试通过（GREEN） | 有 skill 时代理合规 |
| 重构 | 保持合规同时堵漏洞 |
| 先写测试 | 写 skill 前先跑基线场景 |
| 看它失败 | 记录代理使用的确切合理化 |
| 最小代码 | 写针对那些具体违规的 skill |
| 看它通过 | 验证代理现在合规 |
| 重构循环 | 找新合理化 → 堵 → 复验 |

## 何时创建

创建：
- 技术对你不是直觉显而易见时
- 你会跨项目再次引用它时
- 模式广泛适用（非项目特定）时
- 他人会受益时

不创建：
- 一次性方案
- 别处已良好记录的标准实践
- 项目特定约定（放 instructions 文件）
- 机械约束（能用 regex/校验强制，就自动化它）

## Skill 类型

| 类型 | 描述 | 示例 |
|---|---|---|
| Technique | 带步骤的具体方法 | condition-based-waiting、root-cause-tracing |
| Pattern | 思考问题的方式 | flatten-with-flags、test-invariants |
| Reference | API 文档、语法指南、工具文档 | office docs |

## 目录结构

```
skills/
  skill-name/
    SKILL.md              # Main reference (required)
    supporting-file.*     # Only if needed
```

独立文件：重参考（100+ 行）、可复用工具（脚本、工具、模板）。

内联保留：原则/概念、代码模式（<50 行）、其他一切。

## SKILL.md frontmatter

两个必需 YAML 字段，合计最多 1024 字符：
- `name`：仅字母、数字、连字符
- `description`：第三人称，只描述何时使用（不描述它做什么）

## Description 优化（关键）

description 只描述触发条件。不要总结 skill 的流程或工作流。

**为何重要：** 测试揭示，description 总结工作流时代理照 description 做，而不读完整 skill。描述说"code review between tasks"导致代理只做一次评审，尽管 skill 流程图明确显示两次评审（spec 合规然后代码质量）。description 改成 "Use when executing implementation plans with independent tasks"（无工作流摘要）后，代理正确读流程图并遵循两阶段评审。

```yaml
# ❌ BAD: Summarizes workflow — agents follow this instead of reading skill
description: Use when executing plans — dispatches subagent per task with code review between tasks

# ❌ BAD: Too much process detail
description: Use for TDD — write test first, watch it fail, write minimal code, refactor

# ✅ GOOD: Just triggering conditions
description: Use when executing implementation plans with independent tasks in the current session

# ✅ GOOD: Triggering conditions only
description: Use when implementing any feature or bugfix, before writing implementation code
```

内容规则：
- 以 "Use when..." 开头
- 具体触发、症状、情境
- 描述问题，不描述语言特定症状
- 除非 skill 技术特定，否则技术无关
- 第三人称
- 绝不总结工作流

## Token 效率

上下文窗口是公共资源。每个 token 都与对话历史竞争。

目标：
- 上手工作流：各 <150 词
- 高频加载 skill：总计 <200 词
- 其他 skill：<500 词

技巧：
- 细节移到工具帮助（`--help`），不内联记录全部标志
- 交叉引用其他 skill 而非重复
- 压缩示例（一个优秀 > 多个平庸）
- 消除冗余

## 命名

主动语态、动词开头：
- ✅ `creating-skills` 不是 `skill-creation`
- ✅ `condition-based-waiting` 不是 `async-test-helpers`
- ✅ `root-cause-tracing` 不是 `debugging-techniques`

动名词（-ing）适合流程：`creating-skills`、`testing-skills`、`debugging-with-logs`。

## 交叉引用

只用 skill 名，带显式要求标记：
- ✅ `**REQUIRED SUB-SKILL:** Use references/test-driven-development.md`
- ❌ `See skills/testing/test-driven-development`（不清楚是否必需）
- ❌ `@skills/testing/test-driven-development/SKILL.md`（强制加载，烧上下文）

## 流程图使用

只用于：
- 不明显的决策点
- 可能过早停止的流程循环
- "何时用 A vs B"决策

绝不用于：
- 参考材料 → 用表格、列表
- 代码示例 → 用 markdown 块
- 线性指令 → 用编号列表

## 按类型测试

| Skill 类型 | 测试方法 |
|---|---|
| 纪律强制（规则） | 学术问题 + 压力场景 + 组合压力。识别合理化，加显式反制 |
| Technique（步骤） | 场景 → 代理能跟步骤？边界情况？ |
| Reference | 查找场景。代理能找到信息？ |
| Pattern（思考） | 问题场景 → 代理应用模式？还是退回默认？ |

## 常见错误

| 错误 | 修复 |
|---|---|
| 跳过基线测试 | 写 skill 前总是先跑压力场景 |
| description 里有工作流 | description = 只写何时使用 |
| 同模式多示例 | 一个优秀示例足够 |
| 用 `@` 语法强制加载 | 用仅名交叉引用 |
| 冗长上手文档 | 目标 <150 词 |
| 被动语态命名 | 动词开头主动语态 |

## 参考

- `references/test-driven-development.md` — 基础 RED-GREEN-REFACTOR 循环
- `references/testing-skills-with-subagents.md` — 对 skill 文档做 TDD（压力场景、合理化表、元测试）
- `references/persuasion-principles.md` — 压力场景为何有效（Cialdini 原则、Meincke et al. 2025 元分析）
- `references/anthropic-best-practices.md` — Anthropic 官方 skill 编写指导压缩为操作规则
- `references/verification-before-completion.md` — 验证纪律
