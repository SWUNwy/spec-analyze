# 决策日志格式（Decision Log Format）

用户做出或接近有意义决策时使用本文件。目标是保留推理过程而不只是结论——让后来者理解*为什么*做出该选择，并在环境变化时能够重新评估。

## 何时记录决策

记录决策：
- 考虑过 2+ 个可行备选方案。
- 选择有非平凡影响（成本、风险、时间、实施工作量）。
- 推理对后来阅读者可能不明显。
- 决策可能随需求演进被重访。

不记录决策：
- 只有一个可行选项。
- 选择琐碎且可逆（如命名、文件组织）。
- 没有真正发生权衡。

## 轻量决策

```markdown
## Decision Log

| Decision | Choice | Reason | Open Risk |
|---|---|---|---|
| ... | ... | ... | ... |
```

## 决策级记录

```markdown
## Decision Record: [Decision]

**Date:** [YYYY-MM-DD]
**Context Basis:** ...
**Decision owner:** ...
**Status:** Proposed / Confirmed / Revisit

### Question
...

### Options Considered
| Option | Description | Why Kept / Rejected |
|---|---|---|

### Criteria
| Criterion | Weight | Reason |
|---|---:|---|

### Choice
...

### Rationale
...

### Risks
| Risk | Mitigation | Trigger to Revisit |
|---|---|---|

### Anti-anchor Check
- Prior context that could bias the choice:
- Alternative paths if starting from zero:
- Why this choice still fits the current goal:
```

## 讨论中内联捕获

决策发生时就地捕获：

> **Decision: [what was decided]**
> - Options: [A] / [B] / [C]
> - Chose: [X] because [reason]
> - Rejected [Y] because [specific reason]

## 输出文档中的表格化

在最终文档（Analysis Report / Design Doc）中表格化决策：

| # | Decision | Options Considered | Chosen Approach | Rationale | Rejected Alternatives |
|---|----------|--------------------|-----------------|-----------|----------------------|
| 1 | [What] | A: ..., B: ... | A | [Why A] | B: [specific reason] |

## 好示例

**好：**
> **Decision: Use optimistic UI for status update**
> Options: (A) Optimistic update with rollback, (B) Wait-for-API synchronous update, (C) Queue-based eventual update
> Chose: A — status update is low-risk, high-frequency; optimistic creates immediate feedback; rollback handles the 5% failure case
> Rejected B — 200ms+ delay on every tap feels sluggish for a frequently used action
> Rejected C — over-engineered; status updates don't need eventual consistency guarantees

**好（架构决策）：**
> **Decision: Abstract payment provider behind an interface**
> Options: (A) Direct Stripe dependency, (B) Payment interface with Stripe implementation
> Chose: B — currently only Stripe, but payment provider switching is a common requirement; the abstraction costs ~1 day now vs 2 weeks if refactoring later
> Rejected A — violates "抗补丁性" principle; replacing Stripe calls scattered across codebase would be high-risk

## 坏示例

**坏（太含糊）：**
> **Decision: Use optimistic UI**
> Chose: optimistic because it's better UX

**坏（缺备选）：**
> **Decision: Use optimistic UI for status update**
> Chose: optimistic UI — standard approach for this pattern

**坏（无理由）：**
> **Decision: Use abstract payment interface**
> Chose: interface pattern
> Rejected: direct dependency

## 决策重访

决策不是永久的。环境变化时，决策日志让重访变得容易：

- 新信息与理由矛盾 → 标记重访。
- 被否决的选项变得可行（新库、需求变化）→ 重新考虑。
- 问题范围变化 → 检查决策是否仍适用。
- 先前次要的顾虑变得关键 → 重新评估权衡。

Full 路径输出中包含此提示：

> "Decisions in this log should be revisited if project scope, timeline, or technical landscape changes significantly."

## 重访触发

以下情况定义重访触发：

- 外部事实不确定。
- 决策昂贵或难逆。
- 用户的资源或目标可能变化。
- 被否决的选项日后可能变得可行。
