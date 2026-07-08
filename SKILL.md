---
name: spec-analyze
description: "需求分析与产品交互注释输出。核心场景：你在原型/线稿/Figma 设计稿上，给每个交互组件加上 trigger/behavior/state/style 的结构化注释，让研发直接照着实现。也适用于需求分析、产品方案设计、功能拆解、竞品调研——但独特价值是输出带三层研发注释（L1 trigger-behavior-dismiss / L2 +placement-style-state-timing / L3 +accessibility-responsive-i18n）的 proposal / design / tasks 三文档。当用户提到「原型注释」「交互标注」「给设计稿加注释」「输出研发规范文档」「方案标注」「写开发文档」「补充交互细节」「产品交互说明」「标注组件行为状态」「annotate prototype」「interaction spec」「developer handoff」时 MUST 触发。区别于通用分析工具：spec-analyze 的分析结果直接输出为带研发注释的可交付文档。"
---

# Spec Analyze — 需求分析与带注释方案输出

将模糊的产品需求，通过多视角分析、压力测试、方案收敛，最终输出为**带研发注释**的 proposal / design / tasks 规范文档，让研发和 AI Agent 拿到文档即可开发。

<HARD-GATE>
在获得用户设计确认之前，不得调用任何实现 skill、编写代码或搭建项目。
</HARD-GATE>

---

## Session State

本 skill 在每次 session 中维护以下状态，每完成一个步骤更新一次：

```yaml
spec_analyze_state:
  current_path: null              # lightweight | standard | full
  current_step: null              # 当前步骤名称
  confirmed_findings: []          # 已确认的分析发现
  unconfirmed_assumptions: []     # 待确认的假设
  risk_level: low                 # low | medium | high
  knowledge_loaded: false         # 是否已加载 knowledge/
  personas_activated: []          # 已激活的角色
  output_generated: false         # 是否已生成输出
  gate_status:                    # 门禁通过状态
    S1: pending                   # pending | passed | blocked
    S2: pending
    S3: pending
    S3a: pending
    S3b: pending
    S3c: pending
    S4: pending
  interrupt_recovery:             # 中断恢复信息
    last_step: null
    progress_summary: null
```

**状态更新规则：**
- 每完成一个步骤 → 更新 `current_step` 和相关字段
- 门禁检查通过 → 更新对应 `gate_status`
- 每 5 轮或模式切换时 → 输出 Stage Summary（conversation only）

**状态持久化（默认 conversation-based）：**
- 同 session 内直接使用 conversation state 恢复
- 用户要求"下次继续"时 → 保存到 `docs/spec-analyze/.session-state.json`（ask before write）
- 新 session + 有持久化文件 → 询问是否恢复
- 新 session + 无持久化文件 → 正常开始

**状态展示格式：**
```
[spec-analyze] Full | Step 6F 组件枚举 | S3a: pending | 知识: 已加载
```

---

## Step 0: 智能路由

在提问前先做两维评估：

| 维度 | 取值 |
|------|------|
| 复杂度 | Lightweight / Standard / Full |
| 预期产出 | Insight Brief / Analysis Report / 带注释的方案文档 |

每次路由确认时必须使用路径对应的消息模板，声明产出物和注释覆盖范围：

**Lightweight 路径：**
> "评估为 Lightweight 复杂度，产出 **Insight Brief**（不含交互注释）。
> 如果需求最终需要交付研发，后续会评估是否升级到 Standard 路径。可以吗？"

**Standard 路径：**
> "评估为 Standard 复杂度，产出 **Analysis Report + proposal.md**，含 Data / Interaction / UI Text 三列注释。可以吗？"

**Full 路径：**
> "评估为 Full 复杂度，产出 **proposal.md + design.md + tasks.md** 三文档，含逐组件 Annotation Block（L1-L3 类型化模板）。可以吗？"

### 三条路径

| 路径 | 流程 | 产出 | 注释覆盖 |
|------|------|------|:--------:|
| **Lightweight** | 轻量扫描 → 快速提问 → 升级门评估 → 输出 | Insight Brief | 无 |
| **Standard** | 完整探索 → 2-3 角色 → 压力测试 → 收敛 → 呈现 → 输出 | Analysis Report | proposal 三列注释 |
| **Full** | 完整探索 → 5 角色 → 压力测试 → 收敛 → 呈现 → 枚举 → 填充 → 输出 → 验证 | proposal + design + tasks | proposal 三列 + design Annotation Block + (经用户决策) HTML 注释面板 |

---

## 通用上下文探索（Step 1 — 行为因路径而异）

**入口：** 路由确认后执行。

**Step 1 行为因路径而异：**

| 行为 | Lightweight (1L) | Standard (1S) | Full (1F) |
|------|:----------------:|:-------------:|:---------:|
| 项目文件/文档查阅 | 仅表层（README/文件名级） | 完整查阅 | 完整查阅 |
| knowledge/ 检测与加载 | **跳过**（不加载） | 检测 → 列出 → 询问加载 | 检测 → 列出 → 询问加载 |
| Web research 提议 | **不提议** | 按条件提议 | 按条件提议 |
| 视觉伴侣邀请 | **不邀请** | 按条件邀请 | 按条件邀请 |

### knowledge/ 检测与加载（仅 Standard/Full 路径）

在 Step 1 中完成 knowledge/ 目录的检测与加载（同 session 仅 1 次）：

- **目录不存在** → 静默跳过，不输出任何提示
- **目录存在但为空** → 静默跳过
- **目录存在且包含 `.md` 文件** → 列出文件名和行数，然后询问：
  > "检测到 `knowledge/` 目录包含：X.md（N行）。当前需求是否需要加载这些知识作为分析上下文？"
  - 用户同意 → 加载所有 `.md` 文件内容，输出声明：
    > "[knowledge] 已加载 X.md（N行），后续分析将引用该领域上下文。"
  - 用户拒绝 → 跳过，当前 session 不再重复询问

### 上下文探索通用规则

- 先查阅项目状态（文件、文档、最近提交）
- 如果需求涉及多个独立子系统 → 立即标记，拆分为子项目
- 每个消息只问一个问题，优先选择题

**→ Standard/Full 路径检查 S1 门禁**

---

## 三路径流程

路径确认后，按以下流程执行。**Step 1 已在通用上下文探索中执行。**

### Lightweight 路径

| 步骤 | 名称 | 行为 | 门禁 |
|------|------|------|------|
| 0 | 路由确认 | 用户确认 Lightweight 路径 | — |
| 1L | 轻量上下文扫描 | 仅扫描项目表层（README/文件名级）；不加载 knowledge/；不提议 web research；不邀请视觉伴侣 | — |
| 2L | 快速提问与讨论 | 自由提问，不激活角色视角 | — |
| **3L** | **升级门评估** | 评估 4 条件（见升级门章节），监控始于 Step 1L，在 Step 3L 统一评估 | — |
| 4L | 输出 Insight Brief | 输出核心洞察简报（conversation only，不写文件） | S4 |
| — | 用户审阅 | 用户确认 → 结束；用户否决 → 回到 2L | — |

### Standard 路径

| 步骤 | 名称 | 行为 | 门禁 |
|------|------|------|------|
| 0 | 路由确认 | 用户确认 Standard 路径 | — |
| 1S | 完整上下文探索 | 项目文件/文档查阅 + knowledge/ 加载 + web research + 视觉伴侣 | S1 |
| 2S | 多角色提问 | 激活 2-3 最相关的角色视角（见 `references/personas.md`），每个角色至少 1-2 个问题 | — |
| 3S | 多框架发散 | 按意图选择发散框架，做多维度 what-if 探测（见 `references/divergence-frameworks.md`） | — |
| 4S | 方案收敛 | 2-3 方案对比 + 决策记录（见 `references/decision-log-format.md`）+ 范围锁定 | S2 |
| 5S | 设计呈现 | 分节呈现，逐节获取批准 → **批准 → 继续；否决 → 回到 4S** | S3 |
| 6S | 输出 Analysis Report | 输出 Analysis Report + proposal.md 到 `docs/spec-analyze/reports/` | S4 |
| — | 用户审阅 | 用户确认 → 结束；用户否决 → 回到 5S | — |

### Full 路径

| 步骤 | 名称 | 行为 | 门禁 |
|------|------|------|------|
| 0 | 路由确认 | 用户确认 Full 路径 | — |
| 1F | 完整上下文探索 | 项目文件/文档查阅 + knowledge/ 加载 + web research + 视觉伴侣 | S1 |
| 2F | 多角色提问 | 激活全部 5 角色（见 `references/personas.md`），Risk Challenger 全程参与 | — |
| 3F | 多框架发散 | 按意图选择发散框架 + 组合，做多层次 what-if 探测（见 `references/divergence-frameworks.md`） | — |
| 4F | 方案收敛 | 2-3 方案对比 + 决策记录（见 `references/decision-log-format.md`）+ 范围锁定 | S2 |
| 5F | 设计呈现 | 分节呈现，逐节获取批准 → **批准 → 继续；否决 → 回到 4F** | S3 |
| 6F | 组件枚举 | 列出页面所有交互组件，映射到 `references/annotation-templates.md` 的类型（T1-T11） | S3a |
| 7F | 模板填充 | 按类型模板逐组件填充注释字段（见 `references/annotation-templates.md` §4） | — |
| 8F | 输出生成 | 生成 proposal + design + tasks 三文档（见 `references/output-templates.md`）；组件≥3 时询问是否内建 HTML 注释 | S3b |
| 9F | HTML 注释验证 | 按 `references/html-annotation-system.md` 验证注释正确内建 + back-propagation（仅当用户同意内建时） | S3c |
| 10F | 质量自检 | 运行质量自检清单（见 `references/quality-checklists.md`） | S4 |
| — | 用户审阅 | 用户确认 → 结束；用户否决 → 回到 5F | — |

---

## 升级门设计（Lightweight Step 3L）

### 监控范围

升级门监控**始于 Step 1L**（用户接触项目文件时就可能表达开发意图），持续到 Step 2L，在 Step 3L 统一评估。

```
Step 1L 开始 → 启动监听
    │
    ├── 用户提到"做/开发/implement" → 标记"开发意图"
    ├── 用户询问具体技术选型 → 标记"技术选型"
    ├── 用户需要交付研发 → 标记"编码实现"
    ├── 用户需要交互注释 → 标记"注释需求"
    │
Step 2L 全程 → 持续监听（同上 4 个信号）
    │
Step 3L → 统一评估：任一标记触发 → 提议升级
```

### 提议模板

> "检测到以下信号：[列出触发的条件]
> 当前路径(Lightweight)产出 Insight Brief，不含交互注释和开发文档。
> 提议升级到 Standard 路径，产出 Analysis Report + proposal.md（含三列注释）。
> 需要升级吗？"

### 升级路径

- Lightweight → Standard：用户同意即升级（从 Standard 的 Step 1S 或 2S 继续）
- Lightweight → Full：仅当用户表达了"需要逐组件注释"或"需要交付研发"时才提议跳级
- 拒绝升级：继续 Lightweight 路径，当前 session 不再重复提议

---

## 质量门禁与 Definition of Done

| 门禁 | 位置 | Lightweight | Standard | Full |
|------|------|:-----------:|:--------:|:----:|
| S1 | Step 1 → 2 | 跳过 | 需要 | 需要 |
| S2 | Step 4 → 5 | 跳过 | 需要 | 需要 |
| S3 | Step 5 → 6 | 跳过 | 需要 | 需要 |
| S3a | Step 6F → 7F（组件枚举 → 模板填充） | 跳过 | 跳过 | 需要 |
| S3b | Step 8F（内建注释决策） | 跳过 | 跳过 | 需要* |
| S3c | Step 9F（注释验证 + back-propagation） | 跳过 | 跳过 | 需要† |
| S4 | 质量自检 → 用户审阅 | 需要 | 需要 | 需要 |

> *S3b 仅当 Full 路径 + 涉及 HTML 原型 + 组件数 ≥ 3 时执行。否则跳过。
> †S3c 仅当用户同意内建注释时执行。否则跳过。

### S1: 上下文完备

- [ ] 上下文边界清晰：scope 内/外已明确
- [ ] 项目文件/文档已查阅
- [ ] Web research（如触发）已完成
- [ ] knowledge/ 目录已检查，知识资产（如有）已加载
- [ ] 当前状态足以进入深入分析

### S2: 收敛完成

- [ ] 至少 2-3 方案已对比，列明 trade-off
- [ ] 每个决策记录了 rationale + 被拒方案
- [ ] 范围已锁定——明确声明**不包含**的内容

### S3: 输出准备（Standard / Full 路径特有）

- [ ] proposal 注释列有足够数据填充
- [ ] 设计交互组件已识别
- [ ] 每个输出章节有分析数据支撑
- [ ] 文件输出路径已确定

### S3a: 组件枚举完备（Full 路径特有）

- [ ] 页面所有交互组件完整列举，无遗漏
- [ ] 每个组件已映射到 `references/annotation-templates.md` 的类型（T1-T11）
- [ ] 类型选择合理（同交互模式用同类型）
- [ ] 嵌套关系已声明（context 引用指向父组件）
- [ ] 组件清单中无重复项、无幽灵项

### S3b: 输出规划审核（条件性，Full 路径 + 涉及 HTML 原型 + 组件数 ≥ 3）

- [ ] 本次产出涉及 HTML 原型（新生成或修改已有）
- [ ] 组件枚举（Step 6F）数据完备，ANNOTATIONS 数据可完整构建
- [ ] 已征得用户同意/拒绝内建注释系统

### S3c: HTML 注释验证（条件性，仅用户同意内建注释时）

- [ ] 每个组件已有触发按钮，在其可视边界内（≤ 8px）
- [ ] ANNOTATIONS 对象的数据完整，keys ↔ design.md @ComponentName 一一对应
- [ ] 注释面板可正常渲染，无空白 block、无占位符
- [ ] 导航标签齐全，图标 + 短名已确定
- [ ] Back-propagation 已完成：HTML 注释中的任何修正已同步回 design.md

### S4: 自检完成

- [ ] 无占位文本（`{占位符}` 均已替换）
- [ ] 所有声明已区分 Fact / Inference / Hypothesis
- [ ] 没有 scope creep
- [ ] Full 路径：注释符合质量自检清单全部标准
- [ ] Full 路径：proposal / design / tasks 引用链一致
- [ ] Full 路径：注释内容符合 `annotation-templates.md` §6 内容规则（使用产品语言、无模糊词、无"N/A"）
- [ ] Full 路径：跨组件一致性已验证（同类型实例深度一致，术语统一）
- [ ] 如果 knowledge/ 中的知识已加载，确认在分析过程中已被实际引用（不仅仅是加载了但没有使用）

### 失败处理

- 任一 DoD 不满足 → 回溯对应步骤补齐
- 用户否决输出 → 回到设计呈现重新迭代
- 同一门禁连续阻塞 2 次 → 暂停，评估路径选择
- context 超限 → 输出 Stage Summary → 询问是否继续或下次继续（触发状态持久化）

---

## 分析流程

```dot
digraph spec_analyze_flow {
    rankdir=TB;

    "需求输入" [shape=box style=rounded];
    "路由评估" [shape=diamond];
    "通用上下文探索\n(1L/1S/1F 行为各异)" [shape=box];

    subgraph cluster_lightweight {
        label="Lightweight 路径";
        style=dashed;
        "2L. 快速提问与讨论" [shape=box];
        "3L. 升级门评估" [shape=diamond];
        "4L. 输出 Insight Brief" [shape=box];
    }

    subgraph cluster_standard {
        label="Standard 路径";
        style=dashed;
        "2S. 多角色提问" [shape=box];
        "3S. 压力测试" [shape=box];
        "4S. 方案收敛" [shape=box];
        "5S. 设计呈现" [shape=diamond];
        "6S. 输出 Analysis Report" [shape=box];
    }

    subgraph cluster_full {
        label="Full 路径";
        style=dashed;
        "2F. 多角色提问" [shape=box];
        "3F. 压力测试" [shape=box];
        "4F. 方案收敛" [shape=box];
        "5F. 设计呈现" [shape=diamond];
        "6F. 组件枚举\n→ S3a" [shape=box];
        "7F. 模板填充" [shape=box];
        "8F. 输出生成\n(三文档) → S3b" [shape=box];
        "9F. HTML 注释验证\n→ S3c" [shape=box];
        "10F. 质量自检 → S4" [shape=box];
    }

    "质量自检 → S4" [shape=box];
    "用户审阅" [shape=diamond];
    "结束" [shape=doublecircle];

    "需求输入" -> "路由评估";
    "路由评估" -> "通用上下文探索\n(1L/1S/1F 行为各异)" [label="确认路径"];

    "通用上下文探索\n(1L/1S/1F 行为各异)" -> "2L. 快速提问与讨论";
    "2L. 快速提问与讨论" -> "3L. 升级门评估";
    "3L. 升级门评估" -> "4L. 输出 Insight Brief" [label="不升级"];
    "3L. 升级门评估" -> "2S. 多角色提问" [label="升级 → Standard" style=dashed];
    "4L. 输出 Insight Brief" -> "质量自检 → S4";

    "通用上下文探索\n(1L/1S/1F 行为各异)" -> "2S. 多角色提问";
    "2S. 多角色提问" -> "3S. 压力测试";
    "3S. 压力测试" -> "4S. 方案收敛" [label="→ S2"];
    "4S. 方案收敛" -> "5S. 设计呈现";
    "5S. 设计呈现" -> "4S. 方案收敛" [label="否决"];
    "5S. 设计呈现" -> "6S. 输出 Analysis Report" [label="批准 → S3"];
    "6S. 输出 Analysis Report" -> "质量自检 → S4";

    "通用上下文探索\n(1L/1S/1F 行为各异)" -> "2F. 多角色提问";
    "2F. 多角色提问" -> "3F. 压力测试";
    "3F. 压力测试" -> "4F. 方案收敛" [label="→ S2"];
    "4F. 方案收敛" -> "5F. 设计呈现";
    "5F. 设计呈现" -> "4F. 方案收敛" [label="否决"];
    "5F. 设计呈现" -> "6F. 组件枚举\n→ S3a" [label="批准 → S3"];
    "6F. 组件枚举\n→ S3a" -> "7F. 模板填充";
    "7F. 模板填充" -> "8F. 输出生成\n(三文档) → S3b";
    "8F. 输出生成\n(三文档) → S3b" -> "9F. HTML 注释验证\n→ S3c" [label="用户同意内建注释"];
    "8F. 输出生成\n(三文档) → S3b" -> "10F. 质量自检 → S4" [label="纯文档/用户拒绝"];
    "9F. HTML 注释验证\n→ S3c" -> "10F. 质量自检 → S4";
    "10F. 质量自检 → S4" -> "质量自检 → S4";

    "质量自检 → S4" -> "用户审阅";
    "用户审阅" -> "结束" [label="通过"];
    "用户审阅" -> "2L. 快速提问与讨论" [label="Lightweight 否决"];
    "用户审阅" -> "5S. 设计呈现" [label="Standard 否决"];
    "用户审阅" -> "5F. 设计呈现" [label="Full 否决"];
}
```

---

## 注释框架（Full 路径独有）

分析完成后，Full 路径的文档使用两层框架叠加：

**类型化模板（`references/annotation-templates.md`）** — 按交互模式选择模板，决定字段结构：
- 11 种组件类型（T1-T11），每种有专属的必填字段 + 内容规则
- 3 个共享块（DialogContext / APICall / Permission）减少重复定义
- 三级嵌套引用规则（同层共享 / 向上覆盖 / 跨级禁止）

**注释等级（`references/output-templates.md`）** — 按组件复杂度选择深度：
| 等级 | 适用场景 | 字段 |
|------|----------|------|
| **L1 核心** | 简单交互（hover、静态展示） | trigger / behavior / dismiss |
| **L2 标准** | 复杂交互（弹窗、表单联动） | L1 + placement / style / state / timing |
| **L3 完整** | 全局通用组件（DatePicker, Modal） | L2 + accessibility / responsive / i18n |

**叠加规则：** 先选类型模板确定字段结构，再选注释等级确定字段深度。

---

## 输出路径

| 路径 | 产出物 | 默认输出位置 |
|------|--------|-------------|
| Lightweight | Insight Brief | Conversation only（不写文件） |
| Standard | Analysis Report + proposal.md | `docs/spec-analyze/reports/YYYY-MM-DD-<topic>-report.md` |
| Full | proposal.md + design.md + tasks.md (+ HTML 原型) | `docs/spec-analyze/specs/R0XX-<topic>/` |

用户偏好覆盖默认路径。生成前展示路径并确认。生成时自动创建目标目录。

---

## Agent 角色动态

| 阶段 | 角色 | 行为 |
|------|------|------|
| 路由 | 引导者 | 评估输入、推荐路径、等待确认 |
| 上下文探索 | 调查者 | 查阅文件、检查 knowledge/、提议 web research |
| 发散（多框架路由） | 挑战者 | 按意图选框架、多维度 what-if、暴露盲点 |
| 收敛 | 顾问 | 推荐方案、做 trade-off 决策 |
| 设计呈现 | 协作者 | 分节呈现、按反馈迭代 |
| **▸ 全程** | **范围监听者** | ① Lightweight 路径监听升级信号（Step 1L 起）<br>② 知识已加载但后续需求偏离知识领域 → 询问是否忽略知识上下文 |

---

## Web Research

详见 `references/web-research-guide.md`。

---

## Visual Companion

当涉及可视化内容（架构图、页面布局、流程图表）时，提供浏览器伴侣。

**触发条件**：Standard/Full 路径的上下文探索阶段，或文字表达不足时。

**邀请方式**（独立消息，不含其他内容）：

> "有些内容用浏览器展示会更直观——我可以画架构图、流程图或页面布局。要试试吗？（需要打开本地 URL）"

---

## 核心行为原则

| 原则 | 说明 |
|------|------|
| **一次一个问题** | 不一次性抛多个问题，优先用选择题 |
| **YAGNI** | 从所有设计中移除不必要的功能 |
| **先发散再收敛** | 先拓宽思路再收窄 |
| **增量验证** | 分节呈现设计，逐节获取批准 |
| **记录决策** | 不只记录结论，还要记录"为什么" |
| **路径自适应** | 同一编号的步骤在不同路径下行为不同 |

---

## 文件索引

| 文件 | 用途 |
|------|------|
| `references/personas.md` | 5 个专家角色的定义、核心问题、红旗信号、升级路径 |
| `references/divergence-frameworks.md` | 发散框架库：18 个框架 + 场景压力测试 + 组合规则 |
| `references/decision-log-format.md` | 决策记录的结构化格式与示例 |
| `references/output-templates.md` | 三条路径的输出模板 + 三层注释框架 + 全链路工作流 |
| `references/html-annotation-system.md` | HTML 注释系统：何时使用、架构、数据格式、组件映射、集成步骤、完整 CSS/JS/HTML 模板 |
| `references/annotation-templates.md` | **类型化注释模板系统：11 种组件类型 + 3 个共享块 + 内容规则 + 质量验证方法（Full 路径使用）** |
| `references/quality-checklists.md` | 质量自检清单 + 跨文档一致性检查 + 各角色评审清单 |
| `references/web-research-guide.md` | Web research 触发条件、搜索策略、信息整合框架 |
