---
name: daci-decision-framework
description: Assign decision-making roles when a team needs to make a key product or organizational decision
source: PMFrame/DACI_决策框架
imported: 2026-09-15
---

# DACI Decision Framework

Clarify accountability for decisions by assigning four distinct roles: Driver, Approver, Contributors, and Informed.

## Steps

1. State the decision to be made in one clear sentence
2. Assign the **Driver** -- the single person responsible for driving the decision to completion
3. Assign the **Approver** -- the one person with veto power who makes the final call
4. List **Contributors** -- people whose input is needed before deciding
5. List **Informed** -- people who need to know the outcome but have no input
6. Set a deadline and document the decision once made

## Output Format

| Role | Person | Responsibility |
|------|--------|---------------|
| Driver | [Name] | Drives the process, gathers input, proposes recommendation |
| Approver | [Name] | Final decision authority, can veto |
| Contributors | [Names] | Provide input, expertise, or data |
| Informed | [Names] | Notified of outcome |

**Decision:** [Statement]
**Deadline:** [Date]
**Outcome:** [Chosen option + rationale]

---

对每一个重要决策，明确指定：谁推动（Driver）、谁拍板（Approver）、谁提供输入（Contributor）、谁需要知情（Informed）。消灭「无结论会议」和决策瘫痪。

## 它解决什么问题

### 为什么重要决策总是没有结论？

你一定经历过这种会议：10 个人坐在会议室里，讨论了 2 小时，最终散会时没有任何决定，只有一句「我们下次再讨论」。

问题的根源通常不是信息不足，而是角色模糊：每个人都觉得自己的意见很重要，但没有人知道谁有权说「就这样定了」。这种结构性的模糊导致会议变成了政治博弈场而非决策场所。

DACI 的洞察很简单：**决策失败不是因为人不够聪明，而是因为从未明确谁能最终拍板。**在会议开始之前，在邮件开头，在文档顶部——把 D、A、C、I 四个角色写清楚，一切都会不同。

## 框架结构

### 四个角色，清晰的权责边界

每个重要决策只有四种角色，每种角色有严格的人数限制和职责边界。

D

推动者

Driver

拥有整个决策过程。安排会议、收集输入、确保决策在截止日期前产生。推动者不做最终决定。

仅 1 人

A

批准者

Approver

有最终拍板权。听取所有 Contributor 的意见后做出最终决定。若有多个 Approver，需事先指定打破平局的规则。

1 人（极少情况 2–3 人）

C

贡献者

Contributor

提供专业输入和建议，但没有最终投票权。他们的意见会被 Approver 认真考虑，但不能阻止决策。

多人（但越少越好）

I

知情者

Informed

在决策做出后告知结果。不参与决策过程，但需要知道结果以调整自己的工作。

多人（越完整越好）

示例：「构建移动 App 还是优化移动 Web？」

决策事项

D 推动者

A 批准者

C 贡献者

I 知情者

移动端策略：建 App 还是优化 Mobile Web？

产品经理 Lisa

CPO 张总

工程负责人、设计总监、增长负责人、数据分析师

销售团队、客户成功、市场部、所有产品开发同学

DACI 健康检查：常见错误分配及其后果

错误：5 个 Approver

「我们需要 CEO、CPO、CTO、CFO 和法务总监都同意。」——结果是互相否决，会议永远不会结束。

正确：1 个 Approver

「CPO 是最终 Approver，其他人是 Contributor。CPO 会认真听取所有输入后决定。」——决策在一次会议内完成。

错误：Driver 当成 Approver

产品经理既是 Driver 又是 Approver，其他人不清楚该向谁汇报，该听谁的。Driver 陷入既要推动又要决策的双重角色困境。

正确：Driver ≠ Approver

产品经理是 Driver（推动流程），CPO 是 Approver（做最终决定）。两个角色分离，职责清晰，执行顺畅。

## 适用场景

### 什么时候该用它？

任何需要跨部门输入、存在潜在分歧、或者决策影响范围超过单个团队的情况，都应该先定义 DACI 再开始讨论。

🏗️

重大技术架构决策

微服务还是单体架构？重写还是重构？这类决策需要多个团队输入，但不能变成无结论的技术辩论。

🎯

产品方向和优先级决策

做 A 功能还是 B 功能？进入新市场还是深耕当前市场？需要 CPO、工程、市场多方输入，但需要一个人拍板。

🤝

合作与采购决策

选择哪家供应商？是否收购某个团队？是否与某家公司建立合作关系？需要法务、财务、产品、业务多方输入。

📋

跨团队流程变更

要改变上线流程、评审流程、招聘流程……这些变更影响多个团队，不能由一个团队单方面决定。

💰

预算分配

有限的资源要怎么分配？哪个项目获得更多投入？需要明确谁有最终分配权，避免每个团队都在争资源但没人决策。

🚨

危机处理和紧急决策

系统宕机、数据泄露、重大 bug——在压力下最容易出现决策真空。DACI 让每个人知道谁在 drive，谁能 approve 行动方案。

## 真实案例

Intuit 的并购决策提速  
### 从 4 个月到 6 周

Intuit（TurboTax、QuickBooks、Mint 的母公司）是 DACI 最广泛记录的实践者。他们将这个框架用于从产品决策到公司并购的各类重大决定。

旧体系的痛苦教训来自一次并购评估（2018 年）：12 个人觉得自己有批准权。每次会议结束都有人提出新的反对意见，因为他们相信自己的否决权有效。整个决策过程耗时 4 个月。

Intuit

用 DACI 重构并购决策流程 · 2018 年

2018

📋

并购决策的 DACI 分配

D · 推动者

战略副总裁  
负责整理信息、安排评估会议、确保流程推进

A · 批准者

首席产品官（CPO）  
最终决定是否推进收购

C · 贡献者

CFO、并购负责人、产品线 Lead  
提供财务、战略、产品适配度评估

I · 知情者

董事会  
决策完成后告知，备案

✓

同类决策的时间对比

→

旧体系（12 个隐性 Approver）：**4 个月**才做出决定

→

新体系（DACI 明确角色）：同类型决策降至 **6 周**

→

决策质量并未下降——更少的 Approver 不等于更少的输入，Contributor 的意见仍然被充分收集

🎵

Spotify 的类似实践

→

Spotify Engineering Culture（2014）记录了类似的 Decider/Facilitator 分离——Decider（Approver）和 Facilitator（Driver）是两个不同角色

→

这让 Spotify 从 50 人扩展到 500+ 工程师，**决策速度没有线性降低**

→

核心洞察：组织越大，越需要在会议开始前就写清楚「谁是 Approver」

4月→6周

同类决策周期缩短（Intuit）

12→1

Approver 数量：从 12 个隐性到 1 个明确

0次

会议结束后的「我以为我有否决权」争议

## 使用建议

### DACI 失效的六种常见方式

DACI 是一个极简工具，但细节决定成败。以下是最常见的失效模式和对应的防范方法。

01

**不要设置多个 Approver。**每增加一个 Approver，决策速度就会指数级下降。如果你发现需要 2 个以上 Approver，要么决策范围太大（拆分），要么组织权责本身有问题（需要更深层的修复）。

02

**Driver 不等于 Approver，不要把这两个角色混淆。**Driver 的职责是推动过程（安排会议、收集输入），不是做最终决定。当 Driver 试图控制结论时，会议会陷入防御性对话，真正的 Approver 失去参与感。

03

**Contributor 数量要克制。**把所有相关方都列为 Contributor 看起来民主，实际上让输入收集变得难以管理。问自己：「这个人的专业知识是否真的不可或缺？」如果答案模糊，他们应该是 Informed。

04

**Informed 的人必须真的被告知，不能省略。**最常见的实施疏漏是忘记通知 Informed 的人。这会制造「为什么没人告诉我？」的抱怨，破坏组织信任。决策完成后，立刻发邮件/消息告知所有 I。

05

**在会议开始之前，把 DACI 写在文档最顶部。**如果等到会议上再确认角色，往往会因为政治敏感性而协商失败。会议邀请或议程文档的第一行就写：「D：XX，A：XX，C：…，I：…」这让所有人到达时就知道规则。

06

**Approver 做出决定后，不要重新开放决策。**决策后的抱怨者应该被礼貌但坚定地告知：「这个决策已经由 Approver 做出，如果有新的信息，我们可以启动新一轮 DACI 流程重新评估，但我们不会因为不满意就推翻已有决定。」

## 来源与历史

### 告别"会议结束后不知道谁来做决定"的决策困境

DACI 决策框架（Driver驱动者—Approver审批者—Contributor贡献者—Informed知情者）起源于 Intuit 公司的内部实践，随着精益产品管理和敏捷团队协作的普及，逐渐成为科技公司中最常用的跨职能决策责任划分工具之一。

1980s

RACI 矩阵成为项目管理的责任分配标准

RACI（Responsible—Accountable—Consulted—Informed）矩阵在项目管理领域被广泛采用，成为大型组织划清责任边界的标准工具。它为后续面向产品决策的 DACI 变体提供了概念基础，二者的核心逻辑相同：将"做事的人"与"拍板的人"明确区分。

2000s

Intuit 开发 DACI 变体以适应产品团队需求

Intuit 在推行快速创新（Design for Delight）文化改革期间，发现传统 RACI 矩阵过于强调汇报层级，不适合跨职能产品团队的敏捷决策场景。工程师与产品团队共同开发了以"Driver"替代"Responsible"的 DACI 变体，强调决策推动者而非任务执行者。

2012

硅谷产品团队开始广泛分享 DACI 实践

随着 Intuit、Google 等公司前员工的流动，DACI 框架在硅谷产品圈通过博客、内部 Wiki 和会议分享快速传播。Atlassian 将其纳入团队协作方法论体系，并在 Confluence 文档模板中内置 DACI 表格，极大地加速了框架的普及速度。

2016

Atlassian 将 DACI 作为团队协作标准推广

Atlassian 在其团队协作指南（Team Playbook）中正式将 DACI 作为"决策制定"模块的核心框架，提供配套模板和工作坊引导方法。这使 DACI 的受众从硅谷产品社群扩展至全球使用 Jira 和 Confluence 的工程和产品团队。

2020

远程协作时代，DACI 成为异步决策的关键工具

疫情推动全球远程办公，异步决策成为分布式团队的核心挑战。DACI 框架因其能够在没有实时会议的情况下明确决策所有权，在远程产品团队中的采用率显著上升，成为 Notion、Linear 等现代协作工具内置模板库中的常见决策文档结构。
