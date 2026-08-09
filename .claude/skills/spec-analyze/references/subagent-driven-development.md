# 子代理驱动开发（Subagent-Driven Development）

> 改编自 superpowers 插件 v6.1.1（MIT）。方法论保留；语气对齐 analyze。

## 何时加载

在当前会话执行带独立任务的实施计划时加载。`executing-plans.md` 的替代方案（它用独立并行会话）。

## 核心原则

每任务新子代理 + 任务评审（spec + 质量）+ 最终宽范围评审 = 高质量、快迭代。子代理拿到精心构造的上下文——**绝不是会话历史**。这保留你的上下文用于协调。

## 决策：子代理驱动 vs 替代

| 条件 | 使用 |
|---|---|
| 有实施计划 + 任务基本独立 + 留在本会话 | 本参考 |
| 有计划 + 可接受并行会话 | `executing-plans.md` |
| 无计划，或任务紧耦合 | 先 brainstorm/plan，或手工执行 |

## 流程

```
Read plan → For each task:
    Dispatch implementer subagent
    Implementer asks questions? → Answer, re-dispatch
    Implementer reports status
    Generate review package, dispatch task reviewer
    Reviewer reports spec ✅ and quality approved?
        No → Dispatch fix subagent → Re-review
        Yes → Mark task complete, append to ledger
After all tasks:
    Dispatch final whole-branch reviewer
    Use finishing-a-development-branch.md
```

持续执行：任务之间不停下检查。执行全部任务不停止。只在以下情况停：你无法解决的 BLOCKED、阻碍进展的歧义、或全部任务完成。

## 预飞计划评审

任务 1 前，扫描一次计划找冲突：
- 互相矛盾、或与计划 Global Constraints 矛盾的任务
- 计划显式要求、而评审标准视为缺陷的内容（不断言的测试、逻辑块逐字重复）

以一次批量提问向用户呈现发现——每个发现连同强制它的计划文本，询问以哪个为准——在执行开始前。扫描干净就静默继续。

## 模型选择

派发时总是显式指定模型。省略模型会继承你的会话模型——通常是最贵最能的——静默破坏本节的意图。

| 任务类型 | 模型档位 |
|---|---|
| 机械实施（1-2 文件、完整 spec） | 最便宜 |
| 多文件集成、模式匹配 | 标准 |
| 架构/设计判断 | 最贵 |
| 最终整分支评审 | 最贵（非会话默认） |
| 任务评审 | 中档或更高（评审者需要判断力） |

轮次胜过 token 价格。最便宜的模型在多步工作上通常多花 2-3× 轮次，总成本更高。评审者与从散文工作的实施者以中档为下限。计划含完整代码（转写 + 测试）时，最便宜档即可。

## 处理实施者状态

| 状态 | 动作 |
|---|---|
| DONE | 生成评审包，派发任务评审 |
| DONE_WITH_CONCERNS | 读顾虑。正确性/范围顾虑：评审前解决。观察类：记下，继续评审。 |
| NEEDS_CONTEXT | 提供缺失上下文，重新派发 |
| BLOCKED | 上下文问题 → 多给信息，同模型。需要推理 → 更贵模型。太大 → 拆分。计划错 → 升级给用户。 |

绝不忽略升级，也不要在无改动时强迫同一模型重试。

## 处理评审者 ⚠️ 项

任务评审可能报 "⚠️ Cannot verify from diff"——需求在未改代码中或跨任务。它们不阻塞其余评审，但标记任务完成前必须逐一解决：你持有评审者缺少的计划与跨任务上下文。确认是真实缺口，按失败的 spec 评审处理——回到实施者，复审。

## 构造评审者提示

- 没有具体任务理由，不要加开放式指令（"check all uses"、"run race tests if useful"）
- 不要要求评审者重跑实施者已跑的测试
- 不要预判发现（"do not flag"、"don't treat X as a defect"、"at most Minor"、"the plan chose"）。让评审者提出发现；在评审循环中裁决。
- 全局约束块是评审者的注意透镜。逐字从计划复制约束性需求：精确值、格式、组件间声明的关联。流程规则（YAGNI、测试卫生）已在评审者模板中。
- 把 diff 作为文件交给评审者。用本 skill 目录的 `scripts/review-package BASE HEAD`；传打印出的路径。diff 绝不进入你的上下文。用派发实施者前记录的 BASE——绝不用 `HEAD~1`（会静默截断多提交任务）。
- 一次派发描述一个任务，不是会话历史。不要粘贴累积的先前任务摘要。新子代理需要：它的任务、它触碰的接口、全局约束。其他都不要。
- Critical 与 Important 发现派发修复子代理。Minor 发现记入进度台账；让最终整分支评审指向该清单。无人读的汇总 = 静默丢弃。
- 标记 plan-mandated 的发现是用户的决定。呈现发现 + 计划文本，问以哪个为准。不要驳回，也不要未经询问违背计划。
- 最终整分支评审：`scripts/review-package MERGE_BASE HEAD`（MERGE_BASE = `git merge-base main HEAD`）。包含打印出的路径。
- 每次修复派发携带实施者契约：修复子代理重跑覆盖测试并报告结果。点名覆盖测试文件。复审前确认修复报告包含覆盖测试、运行的命令与输出。
- 最终评审有发现时，派发一个带完整发现清单的修复子代理——不要每个发现一个修复者。逐发现修复者各自重建上下文并重跑套件；真实会话的最终评审修复波比全部任务之和更贵。

## 文件交接

粘贴进派发提示的一切——以及子代理打印回的一切——在会话剩余时间驻留你的上下文。工件用文件交接。

| 工件 | 机制 |
|---|---|
| 任务简报 | `scripts/task-brief PLAN_FILE N` — 抽取任务完整文本到唯一命名文件，打印路径 |
| 实施者报告 | 实施者返回的文件路径；按简报命名（`task-N-brief.md` → `task-N-report.md`） |
| 评审者输入 | 三个路径：brief、report、review package + 全局约束 |
| 修复派发 | 把修复报告（含测试结果）追加到同一报告文件；复审读更新后的文件 |

实施者派发应包含：(1) 一行任务在项目中的位置；(2) 简报路径，介绍为"先读它——它是你的需求，含要逐字使用的精确值"；(3) 简报无法知道的来自前置任务的接口与决策；(4) 你对简报中发现的歧义的裁决；(5) 报告文件路径与报告契约。精确值（数字、魔数、签名、测试用例）只出现在简报中。

## 持久进度台账

对话记忆活不过压缩。丢位置的控制器曾重新派发完整已完成任务序列——这是观察到的最贵失败。

- skill 启动时查台账：`cat "$(git rev-parse --show-toplevel)/.analyze/sdd/progress.md"`。标记 complete 的任务就是 DONE——不要重新派发；从第一个未标记 complete 的任务恢复。
- 任务评审干净时追加一行：`Task N: complete (commits <base7>..<head7>, review clean)`。
- 台账是你的恢复地图。压缩后，信任台账与 `git log`，而不是自己的记忆。
- `git clean -fdx` 会毁掉台账（git-ignored 草稿）；从 `git log` 恢复。

## 提示模板

- `references/implementer-prompt.md` — 实施者派发模板
- `references/task-reviewer-prompt.md` — 任务评审派发模板（spec + 质量）
- `references/code-reviewer-template.md` — 最终整分支评审模板

## 红旗

绝不：
- 未经用户明确同意在 main/master 上开始实施
- 跳过任务评审，或接受缺任一结论的报告（spec 与质量都必须）
- 带未修 Critical/Important issue 继续
- 并行派发多个实施子代理（冲突）
- 让子代理读整个计划文件——给它任务简报
- 跳过场景设定上下文
- 忽略子代理问题
- 接受 spec 合规的"差不多"
- 跳过评审循环
- 让实施者自审替代真实评审
- 告诉评审者不要标什么，或在派发中预评严重度
- 无 diff 文件就派发任务评审
- 评审有未决 Critical/Important issue 时进入下一任务
- 重新派发进度台账已标记 complete 的任务

## 参考

- `references/executing-plans.md` — 替代：并行会话执行
- `references/requesting-code-review.md` — 最终整分支评审
- `references/finishing-a-development-branch.md` — 全部任务后的分支完成
- `references/test-driven-development.md` — 子代理逐任务遵循 TDD
