# 输出模板（Output Templates）

## 目录

- Output Selection（输出选择）
- Stage Summary（阶段小结）
- Brainstorming Outputs（头脑风暴输出）
- Analysis Reports（分析报告）
- Decision-grade Report（决策级报告）
- Degraded Outputs（降级输出）
- Short Answer Format（短答格式）

## 输出选择

| 用户需求 | 模式 | 输出 |
|---|---|---|
| 探索可能性 | Brainstorming | Idea Map |
| 比较涌现方向 | Brainstorming | Direction Brief |
| 做选择 | Analysis | Decision Analysis Report |
| 澄清需求 | Analysis | Requirement Analysis Report |
| 比较方案 | Analysis | Solution Analysis Report |
| 决定战略 | Analysis | Strategy Analysis Report |
| 高利害决策 | Analysis | Decision-grade Report |
| Spec 请求过早 | Spec | Spec Readiness Check |
| 事实不足 | Any | Preliminary Judgment / Assumption Map |

## 输出文件路径

写输出文件时用这些默认路径。写非默认位置前先问用户。

| 输出类型 | 默认路径 | 说明 |
|---|---|---|
| Idea Map / Direction Brief | `docs/analyze/explore/YYYY-MM-DD-<topic>-insight.md` | 头脑风暴输出 |
| Analysis Report | `docs/analyze/explore/YYYY-MM-DD-<topic>-report.md` | Decision/Requirement/Solution/Strategy 报告 |
| Decision-grade Report | `docs/analyze/explore/YYYY-MM-DD-<topic>-decision.md` | 高利害决策记录 |
| Spec 工件 | `docs/analyze/specs/YYYY-MM-DD-<topic>/` | 含 proposal/design/tasks/test-cases 的目录 |
| Stage Summary | 仅对话 | 除非用户要求，不写文件 |
| 降级输出 | 仅对话 | 除非用户要求，不写文件 |

用户偏好覆盖这些默认。总是先问再写文件。

### Constitution 路径覆盖

项目 constitution 存在并定义 `output_paths` 时，应用 constitution 的覆盖表：

| 输出类型 | 覆盖路径模式 |
|---|---|
| Idea Map / Direction Brief | `requirements/active/{CONVENTION}/YYYY-MM-DD-<topic>-insight.md` |
| Analysis Report | `requirements/active/{CONVENTION}/YYYY-MM-DD-<topic>-report.md` |
| Decision-grade Report | `requirements/active/{CONVENTION}/YYYY-MM-DD-<topic>-decision.md` |
| Spec 工件 | `requirements/active/{CONVENTION}/` |

`{CONVENTION}` 是占位符。**写文件前提示用户提供 convention 值**（如 "R003-nav-and-layout"）。用提供的值替换所有路径中的 `{CONVENTION}`。

精确覆盖路径在 constitution 的 Output Paths 章节定义。上表展示 Loop Engineering 模式作为示例。

## Stage Summary

```markdown
## Stage Summary

**Current mode:** Brainstorming / Analysis / Spec / Execution
**User goal:** ...
**Context Basis:** ...

### Confirmed
- ...

### Still Missing
- ...

### Branches / Options
| Option | Meaning | Current status |
|---|---|---|
| A | ... | ... |

### Gate Status
| Gate | Status | Missing |
|---|---|---|
| Brainstorming / Analysis / Spec / Execution | Satisfied / Partial / Missing | ... |

### Recommended Next Step
...
```

## 头脑风暴输出

### Idea Map

用户想要可能性、重新框架或早期探索时使用。

```markdown
## Idea Map: [Topic]

**Context Basis:** ...
**Main framework:** [e.g. First Principles]

### Core Question
...

### First Principles / Key Variables
- ...

### Possible Directions
| Direction | Value | Assumption | Risk |
|---|---|---|---|
| A | ... | ... | ... |

### Hidden Assumptions
- ...

### Next Exploration Question
...
```

### Direction Brief

对话需要轻度收敛时使用。

```markdown
## Direction Brief: [Topic]

**Context Basis:** ...

### Candidate Directions
| Direction | Upside | Cost | Possibility | Best Use Case |
|---|---|---|---|---|
| A | ... | ... | High/Med/Low | ... |
| B | ... | ... | High/Med/Low | ... |
| C | ... | ... | High/Med/Low | ... |

### Recommendation
...

### Minimum Validation
...
```

## 分析报告

### Decision Analysis Report

```markdown
## Decision Analysis Report: [Decision]

**Context Basis:** ...
**Decision question:** ...
**Confidence:** High / Medium / Low

### Options
| Option | Description | Keep / Reject / Conditional |
|---|---|---|

### Criteria
| Criterion | Why it matters | Weight |
|---|---|---|

### Trade-off Matrix
| Option | Value | Cost | Risk | Reversibility | Fit |
|---|---:|---:|---:|---:|---:|

### Recommendation
...

### Minimum Validation Action
...
```

### Requirement Analysis Report

```markdown
## Requirement Analysis Report: [Topic]

**Context Basis:** ...
**User / scenario:** ...

### Goals
- ...

### Non-goals
- ...

### Scope
| In Scope | Out of Scope |
|---|---|

### Requirements
| Requirement | Priority | Acceptance Signal |
|---|---|---|

### Open Questions
- ...

### Spec Readiness
Ready / Partial / Not ready, because ...
```

### Solution Analysis Report

```markdown
## Solution Analysis Report: [Topic]

**Context Basis:** ...

### Candidate Solutions
| Solution | Strength | Weakness | Risk |
|---|---|---|---|

### Architecture / Flow
...

### Recommendation
...

### Implementation Caution
...
```

### Strategy Analysis Report

```markdown
## Strategy Analysis Report: [Topic]

**Context Basis:** ...

### Strategic Question
...

### Current Position
- Assets:
- Constraints:
- Unknowns:

### Strategic Options
| Option | Advantage | Constraint | Time Horizon |
|---|---|---|---|

### Recommended Path
...

### Reassessment Trigger
...
```

## Decision-grade Report

```markdown
## Decision-grade Report: [Decision]

**Context Basis:** ...
**Reset or continue:** ...
**Decision question:** ...
**Confidence:** High / Medium / Low

### Anti-anchor Check
- Prior context that may bias this decision:
- Options that remain if prior context is ignored:
- Why the recommendation is not merely continuity:

### Decision Criteria
| Criterion | Weight | Reason |
|---|---:|---|

### Options
| Option | Description | Preconditions |
|---|---|---|

### Trade-off Matrix
| Option | Upside | Downside | Risk | Reversibility | Strategic Fit |
|---|---|---|---|---|---|

### Adversarial Stress Test
- Strongest argument against the recommendation:
- Failure mode:
- Early warning signal:

### Recommendation
...

### Minimum Validation Action
...

### Reassessment Triggers
- ...
```

## 降级输出

### Preliminary Judgment

```markdown
## Preliminary Judgment

**Conclusion:** ...
**Confidence:** Low / Medium
**Why:** ...
**Cannot confirm yet:** ...
**If A is true:** ...
**If A is false:** ...
**Minimum next question/action:** ...
```

### Spec Readiness Check

```markdown
## Spec Readiness Check

**Current status:** Ready / Partial / Not ready

### Already Satisfied
- ...

### Missing
| Missing Item | Why It Matters | Minimum Completion Path |
|---|---|---|

### Recommended Depth
Light Spec / Standard Spec / Verified Spec

### Next Step
...
```

### Spec Readiness Check（子类型感知）

Spec 将涉及表单、UI、事件或外部契约时用此变体。它把核心缺口与子类型触发的扩展缺口分开，让用户决定先修什么。

```markdown
## Spec Readiness Check (Subtype-Aware)

**Current status:** Ready / Partial / Not ready
**Detected subtypes:** [Form/Data Heavy / Product/Frontend / Event-Driven / Infrastructure/Algorithm]

### Already Satisfied
- ...

### Missing — Core Layer (blocks any Spec depth)
| Missing Item | Why It Matters | Minimum Completion Path |
|---|---|---|
| Module goal + success metric | Without metric, acceptance criteria cannot be testable | Add 1 measurable success signal |
| Actors & permissions | Permission matrix drives both UI and API layers | List actors and their permissions |
| Domain objects + state machines | State bugs originate here | Identify stateful objects and transitions |
| Entry & preconditions | Unknown entry points block implementation | Name the triggers |
| Main flow (step-by-step) | "Flow" prose hides ambiguity | Tabulate step / actor / action / postcondition |
| Exception flow | Happy-path-only Specs fail at integration | List triggers, detection, recovery |
| Boundary cases | Edge cases become prod incidents | Enumerate boundary inputs and expected behavior |
| Acceptance criteria | Without AC, done is subjective | One observable criterion per scope item |
| Open questions | Untracked unknowns become silent assumptions | Track with owner and status |

### Missing — Extension A (Form/Data Heavy)
| Missing Item | Why It Matters | Minimum Completion Path |
|---|---|---|
| Field list | Field semantics drift between teams | List Object.Field, type, source |
| Display rules | UI churn in implementation | Per-field visibility and format |
| Edit rules | Form logic ambiguity | Per-field editability and side effect |
| Validation rules | Backend rework | Per-field rule, error code, message |

### Missing — Extension B (Product/Frontend)
| Missing Item | Why It Matters | Minimum Completion Path |
|---|---|---|
| Page inventory | Routes/pages multiply late | List pages with primary actor |
| Key interactions | Interaction state leaks into bugs | Trigger / component / system / state change |

### Missing — Extension C (Event-Driven)
| Missing Item | Why It Matters | Minimum Completion Path |
|---|---|---|
| Events emitted | Subscribers integrate against unknowns | List event, payload, emitter, trigger |
| Side effects | Hidden side effects break idempotency | Per-effect trigger and failure handling |
| Subscribers | Orphan events cause data drift | Map event → subscriber → action |

### Missing — Cross-Cutting
| Missing Item | Why It Matters | Minimum Completion Path |
|---|---|---|
| API and data mapping | External contracts fail review | List endpoints with method/permission/side effect |

### Recommended Depth
Light Spec / Standard Spec / Verified Spec

### Recommended Subtype Extensions
- [ ] A: Form/Data Heavy
- [ ] B: Product/Frontend
- [ ] C: Event-Driven
- [ ] None — Infrastructure/Algorithm only

### Next Step
...
```

### Open Questions Brief

```markdown
## Open Questions Brief

### Critical
1. ...

### Useful But Not Blocking
1. ...

### My Recommended Minimum
...
```

### Assumption Map

```markdown
## Assumption Map

| Assumption | Confidence | Impact if Wrong | Validation |
|---|---|---|---|
```

## 短答格式

```markdown
结论：...

极短依据：...

提醒：只有结论没有论点容易站不住脚，建议获取完整论点。
```
