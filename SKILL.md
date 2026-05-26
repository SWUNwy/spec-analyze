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

## Step 0: 智能路由

在提问前先做三维评估：

| 维度 | 取值 |
|------|------|
| 讨论性质 | 纯业务 / 需求分析 / 技术设计 |
| 复杂度 | Lightweight / Standard / Full |
| 预期产出 | Insight Brief / Analysis Report / 带注释的方案文档 |

> "这属于 [讨论性质] 类型，[复杂度] 复杂度。我会使用 [路径] 路径——[路径说明]。可以吗？"

### 三条路径

| 路径 | 流程 | 产出 |
|------|------|------|
| **Lightweight** | 快速提问 → 讨论 → 升级门评估 | Insight Brief |
| **Standard** | 2-3 角色视角 → 方案比对 → 报告 | Analysis Report |
| **Full** | 5 角色全视角 + 压力测试 + 方案收敛 → 带注释提案 | proposal + design + tasks → `writing-plans` |

### Lightweight 升级门

输出前自动评估：需求涉及编码/用户要实施/含技术选型？任一为"是" → 提议升级到 Standard。

---

## Checklist

1. **快速评估** — 讨论性质、复杂度、预期产出
2. **路由确认** — 推荐路径，等待用户确认
3. **视觉伴侣邀请** — 见 Visual Companion 章节
4. **上下文探索** — 项目文件、文档、最近提交；提议 web research（见 Web Research 章节）。**→ 检查 G1**
5. **多角色提问** — 一次一个问题（见 `references/personas.md`）[skip Lightweight]
6. **发散阶段** — 场景压力测试（见 `references/scenario-stress-test.md`）[skip Lightweight]
7. **收敛阶段** — 2-3 方案 + 决策记录（见 `references/decision-log-format.md`）。**→ 检查 G2**
8. **设计呈现** — 分节呈现，逐节获取批准。**→ 批准后检查 G3**
9. **输出生成** — 按路径产生对应文档（见 `references/output-templates.md`）。**Lightweight 先评估升级门**
10. **质量自检** — 运行 references/quality-checklists.md 中对应路径的自检
11. **用户审阅** — 输出文档让用户确认
12. **交接** — Full 路径 → 调用 `writing-plans`；其他 → 结束

---

## 质量门禁与 Definition of Done

| 门禁 | 位置 | Lightweight | Standard | Full |
|------|------|:-----------:|:--------:|:----:|
| G1 | 步骤 4 → 5 | 跳过 | 需要 | 需要 |
| G2 | 步骤 7 → 8 | 跳过 | 需要 | 需要 |
| G3 | 步骤 8 → 9 | 跳过 | 需要 | 需要 |
| G4 | 步骤 10 → 11 | 需要 | 需要 | 需要 |

### G1: 上下文完备

- [ ] 上下文边界清晰：scope 内 / 外已明确
- [ ] 项目文件/文档已查阅
- [ ] Web research（如触发）已完成
- [ ] 当前状态足以进入深入分析

### G2: 收敛完成

- [ ] 至少 2-3 方案已对比，列明 trade-off
- [ ] Architecture Cleanliness 四维度已评估（模式一致性 / 职责分离 / 最小变更 / 抗补丁性）
- [ ] 每个决策记录了 rationale + 被拒方案
- [ ] 范围已锁定——明确声明**不包含**的内容

### G3: 输出准备（Full 路径特有）

- [ ] proposal 注释列有足够数据填充
- [ ] design 交互组件已识别
- [ ] 每个输出章节有分析数据支撑
- [ ] 文件输出路径已确定

### G4: 自检完成

- [ ] 无占位文本（`{占位符}` 均已替换）
- [ ] 所有声明已区分 Fact / Inference / Hypothesis
- [ ] 没有 scope creep
- [ ] Full 路径：注释符合质量自检清单全部标准
- [ ] Full 路径：proposal / design / tasks 引用链一致

### 失败处理

- 任一 DoD 不满足 → 回溯对应步骤补齐
- 用户否决输出 → 回到设计呈现重新迭代
- 同一门禁连续阻塞 2 次 → 暂停，评估路径选择

---

## 分析流程

```dot
digraph spec_analyze_flow {
    rankdir=TB;

    "需求输入" [shape=box style=rounded];
    "路由评估" [shape=diamond];
    "上下文探索\n(+ web research)" [shape=box];
    "多角色提问\n→ references/personas.md" [shape=box];
    "压力测试\n→ references/scenario-stress-test.md" [shape=box];
    "方案收敛\n→ references/decision-log-format.md" [shape=box];
    "设计呈现\n(逐节批准)" [shape=diamond];
    "输出生成\n→ references/output-templates.md" [shape=box];
    "质量自检\n→ references/quality-checklists.md" [shape=box];
    "用户审阅" [shape=diamond];
    "writing-plans" [shape=doublecircle];
    "结束" [shape=doublecircle];

    "需求输入" -> "路由评估";
    "路由评估" -> "上下文探索\n(+ web research)" [label="确认路径"];
    "上下文探索\n(+ web research)" -> "多角色提问\n→ personas.md";
    "多角色提问\n→ personas.md" -> "压力测试\n→ scenario-stress-test.md";
    "压力测试\n→ scenario-stress-test.md" -> "方案收敛\n→ decision-log-format.md";
    "方案收敛\n→ decision-log-format.md" -> "设计呈现\n(逐节批准)";
    "设计呈现\n(逐节批准)" -> "方案收敛\n→ decision-log-format.md" [label="修改"];
    "设计呈现\n(逐节批准)" -> "输出生成\n→ output-templates.md" [label="批准"];
    "输出生成\n→ output-templates.md" -> "质量自检\n→ quality-checklists.md";
    "质量自检\n→ quality-checklists.md" -> "用户审阅";
    "用户审阅" -> "输出生成\n→ output-templates.md" [label="修改"];
    "用户审阅" -> "writing-plans" [label="Full 路径"];
    "用户审阅" -> "结束" [label="其他路径"];
}
```

### 2.1 上下文探索

- 先查阅项目状态（文件、文档、最近提交）
- 如果需求涉及多个独立子系统 → 立即标记，拆分为子项目
- 每个消息只问一个问题，优先选择题

### 2.2 多角色驱动提问

激活的角色视角引导提问（见 `references/personas.md`）。**每个角色至少问 1-2 个问题。** 切换视角时说明来源：

> "从增长角度来看——用户今天怎么发现这个功能的？"
> "风险挑战者要问——如果这个假设是错的会怎样？"

### 2.3 发散阶段

从 `references/scenario-stress-test.md` 中选择 2-3 个相关场景进行 what-if 探测。

### 2.4 收敛阶段

1. 提出 2-3 方案，带显式 trade-off（推荐方案放首位）
2. 每个方案在 Architecture Cleanliness 四维度评估（模式一致性 / 职责分离 / 最小变更 / 抗补丁性）
3. 记录每个决策（见 `references/decision-log-format.md`）
4. 锁定范围——声明**不包含**的内容

### 2.5 Agent 角色动态

| 阶段 | 角色 | 行为 |
|------|------|------|
| 早期探索 | 引导者 (Socratic) | 提问式探索、理清思路 |
| 发散 | 挑战者 | 推边界、问 what-if、暴露盲点 |
| 收敛 | 顾问 | 推荐方案、做 trade-off 决策 |
| 设计呈现 | 协作者 | 分节呈现、按反馈迭代 |

---

## 注释框架（Full 路径独有）

分析完成后，Full 路径的文档使用三层注释体系。详见 `references/output-templates.md`。

| 等级 | 适用场景 | 字段 |
|------|----------|------|
| **L1 核心** | 简单交互（hover、静态展示） | trigger / behavior / dismiss |
| **L2 标准** | 复杂交互（弹窗、表单联动） | L1 + placement / style / state / timing |
| **L3 完整** | 全局通用组件（DatePicker, Modal） | L2 + accessibility / responsive / i18n |

---

## Web Research

详见 `references/web-research-guide.md`。

---

## Visual Companion

当涉及可视化内容（架构图、页面布局、流程图表）时，提供浏览器伴侣。

**触发条件**：Full 路径的设计呈现阶段，或文字表达不足时。

**邀请方式**（独立消息，不含其他内容）：

> "有些内容用浏览器展示会更直观——我可以画架构图、流程图或页面布局。要试试吗？（需要打开本地 URL）"

---

## 关键原则

- **一次一个问题** — 不一次性抛多个问题
- **选择题优先** — 比开放题更容易回答
- **YAGNI** — 从所有设计中移除不必要的功能
- **先发散再收敛** — 先拓宽思路再收窄
- **增量验证** — 分节呈现设计，逐节获取批准
- **记录决策** — 不只记录结论，还要记录"为什么"

---

## 文件索引

| 文件 | 用途 |
|------|------|
| `references/personas.md` | 5 个专家角色的定义、核心问题、红旗信号、升级路径 |
| `references/scenario-stress-test.md` | 压力测试场景库：数据/用户/系统三大类 |
| `references/decision-log-format.md` | 决策记录的结构化格式与示例 |
| `references/output-templates.md` | 三条路径的输出模板 + 三层注释框架 + 全链路工作流 |
| `references/quality-checklists.md` | 质量自检清单 + 跨文档一致性检查 + 各角色评审清单 |
| `references/web-research-guide.md` | Web research 触发条件、搜索策略、信息整合框架 |
