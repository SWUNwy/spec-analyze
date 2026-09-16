---
name: moscow-method
description: Categorize requirements as Must, Should, Could, or Won't have
source: PMFrame/MoSCoW_方法
imported: 2026-09-15
---

# MoSCoW Method

Classify requirements into four priority buckets to reach consensus on scope. Use when negotiating scope with stakeholders or planning a release with limited resources.

## Steps

1. **List all requirements** — gather features, stories, or tasks for the release.
2. **Must Have** — requirements that are non-negotiable; without them the release fails.
3. **Should Have** — important but not critical; painful to leave out but the release still works.
4. **Could Have** — nice-to-have; include only if time and budget allow.
5. **Won't Have (this time)** — explicitly agreed to be out of scope for this release.
6. **Validate** — ensure Must Haves do not exceed ~60% of capacity; adjust if needed.

## Output Format

A four-column table (Must / Should / Could / Won't) listing each requirement, with a summary showing the percentage of effort allocated to each category.

---

将需求分为必须有、应该有、可以有、这次不做四类，快速在团队内建立优先级共识，避免功能范围蔓延。

## 它解决什么问题

### 为什么 Sprint 总是延期？

失败的 Sprint 和延期上线，最常见的根本原因是范围蔓延——那些看起来「只要加一下」的功能，不断积累，直到没有任何东西能按时交付。

范围蔓延的背后是一个更深层的问题：团队回避了那个最难的问题——**「如果这个功能没做，会怎样？」**当所有人都说「这个也很重要」时，实际上没有任何东西是真正重要的。

MoSCoW 强制团队回答这个问题。它不只是分级——它要求每个需求都经过「如果不做这个，产品是否无法运作/交付价值」的审视。这个问题很难回答，但它是所有优先级工作的核心。

## 框架结构

### 四个桶，一个关键问题

MoSCoW 把所有需求分入四个桶。字母中的小写 o 只是为了拼写成可记忆的单词，不代表任何类别。

M

Must Have

必须有 · 不可妥协

~60%

没有它产品无法运作，MVP 的底线。缺少这些需求意味着发布无意义或不可能。

用户可以注册和登录

核心交易流程可完成

基本安全合规满足

S

Should Have

应该有 · 可以延迟

~20%

重要但非绝对必要。可以延期，但会明显影响产品价值或用户满意度。

邮件通知系统

搜索过滤功能

账单历史记录

C

Could Have

可以有 · 锦上添花

~10%

只有时间充裕才做。对产品体验有提升，但缺少它不会造成明显损失。

深色模式

导出 PDF 报告

个性化推荐

W

Won't Have

这次不做 · 明确拒绝

~10%

明确声明这次不做，但不代表永远不做。帮助所有人停止讨论某些话题。

多语言支持

移动端 App

API 对外开放

典型需求分布比例

Must 60%

Should 20%

Could 10%

Won't 10%

如果 Must 超过 60%，说明范围过大，必须重新讨论

Won't 清单同样重要——它让团队停止争论某些话题

## 适用场景

### 什么时候该用它？

MoSCoW 在任何需要在约束条件下做取舍的场合都能发挥作用——时间约束、资源约束或战略约束。

🏃

Sprint 计划会

在 Sprint 开始前，用 MoSCoW 对待办事项进行分层，确保 Must Have 总是被优先完成，避免「什么都做一半」的局面。

🚀

MVP 范围定义

在新产品立项时，MoSCoW 帮助团队区分「最小可行」和「最小可欲」，避免第一版就做成完整产品。

🎯

产品上线范围决策

面对即将到来的发布日期和过长的功能列表，MoSCoW 提供一个客观标准，决定什么进、什么出。

🤝

利益相关者需求对齐

当不同部门对产品方向有不同诉求时，MoSCoW 提供一个共同语言，让优先级讨论变得可操作而非情绪化。

📊

季度路线图评审

在 OKR 设定或路线图规划时，用 MoSCoW 对季度目标内的功能集进行分层，建立明确的优先级序列。

💰

预算削减时的需求重排

当工程资源突然减少，MoSCoW 允许快速重新评估哪些功能必须保留，哪些可以推迟，而不需要从零开始讨论。

## 真实案例

UK Government Digital Service  
### GOV.UK 重建 (2011–2013)

2011 年，玛莎·莱恩·福克斯的报告呼吁英国政府对数字服务进行根本性重构。政府数字服务（GDS）团队面临一个令人窒息的任务：将 650 多个分散的政府网站整合为一个统一的平台。

历史上，英国政府 IT 项目平均需要数年，预算超支，功能臃肿。GDS 团队决定采用完全不同的方式——用 MoSCoW 对需求进行严苛的分层，只做真正必须做的事。

GOV.UK · GDS

英国政府数字服务重建 · 650+ 网站整合为一

2011–2013

优先级

需求领域

具体内容

Must Have

核心公民事务

报税、申领福利、驾照更新——市民最高频使用的政府交易，必须在第一版正常运作

Must Have

统一域名与导航

所有政府内容通过 gov.uk 统一访问，消除 650+ 个分散域名带来的混乱

Should Have

综合内容覆盖

将各部门的大量信息内容迁移整合，可在发布后分批完成，不阻塞上线

Could Have

个性化体验

根据用户历史记录提供个性化政府服务推荐，提升体验但非必要

Won't Have

遗留系统全量整合

将所有后台遗留系统完全打通——技术复杂度极高，明确标记为「本次不做」，防止无休止讨论

10个月

从立项到上线（政府项目通常需要数年）

650+

被整合替代的分散政府网站

2013

年度设计奖得主（Design of the Year）

💡

为什么 MoSCoW 在这里起关键作用

→

明确的 Won't Have 列表让团队停止了对遗留系统整合的无休止争论

→

Must Have 的严格限定迫使团队抵抗来自各部委的「也要加入我们的内容」压力

→

10 个月完工证明：纪律性的范围控制比技术能力更决定项目成败

✓

关键启示

→

Won't Have 不是失败，而是保护 Must Have 能被完美交付的盾牌

→

MoSCoW 需要外部压力（截止日期、预算约束）才能真正发挥效力

→

GDS 的成功成为全球政府数字化转型的参考模板

## 使用建议

### 让 MoSCoW 真正有效的五个关键

MoSCoW 看起来只是给需求贴标签，但在实践中，它的有效性完全取决于执行质量。以下是最常见的陷阱和对应方法。

01

**当 Must Have 超过 60% 时，是危险信号——必须重新讨论。**如果所有东西都是「必须有」，等于没有优先级。一个健康的 MoSCoW 结果，Must 应该是令团队感到「有些痛苦」的精简列表，而不是大家都舒服的妥协。

02

**一定要让工程师参与 MoSCoW，而不只是 PM 和业务方。**可行性影响优先级。某个功能可能在业务上是 Should Have，但工程复杂度极高，实际上应该是 Won't Have（this time）。没有工程师输入的 MoSCoW 经常产生不切实际的优先级序列。

03

**明确定义「这次」的时间范围，否则每个讨论都会失焦。**MoSCoW 是时间敏感的——「Won't Have（this time）」中的「this time」指的是这个 Sprint、这个季度、还是这个版本？时间窗口不同，优先级可能完全不同。在开始前对齐时间范围。

04

**Won't Have 列表需要被定期回顾，但不是随时可以推翻。**Won't Have 不是永久拒绝，但也不是随时可以重新谈的。建立一个明确的机制——比如每个 Sprint Review 后可以把 Won't Have 的某些条目升级为 Should Have——防止它变成个人情绪的缓冲器。

05

**MoSCoW 的输出必须有利益相关者的签字认可，否则它没有约束力。**一份没有被相关方确认的 MoSCoW 文档，在第一次有人说「这个功能很重要，能不能加进来？」时就会崩溃。让所有关键决策者确认分层结果，是 MoSCoW 能真正防止范围蔓延的前提。

## 来源与历史

### 从快速交付到全球标配：MoSCoW 的优先级革命

MoSCoW 方法诞生于 1990 年代英国敏捷运动的前沿，由甲骨文 UK 的软件开发顾问 Dai Clegg 在 DSDM（动态系统开发方法）中首次提出，以一种简单到极致的四桶分类，帮助团队在时间箱压力下做出清晰的范围决策。这套方法从英国金融和政府项目出发，随着敏捷浪潮席卷全球，成为产品经理、项目经理和业务分析师共同的优先级通用语言。

1994

Dai Clegg 在 Oracle UK 内部提出原型

Dai Clegg 在为甲骨文 UK 咨询期间，面对 DSDM 项目中反复出现的范围蔓延问题，创造了 Must/Should/Could/Won't 四级分类框架。缩写 MoSCoW 中插入小写字母 o 纯粹是为了便于发音记忆，这个设计细节后来证明极大促进了方法的口耳相传。

1995

随 DSDM 1.0 正式发布走向业界

DSDM 联盟（后更名为 Agile Business Consortium）将 MoSCoW 纳入 DSDM 1.0 方法论体系，使其获得了正式的方法论背书。英国政府 IT 项目率先大规模采用，验证了该方法在复杂多方干系人环境下管理需求的有效性。

2001

敏捷宣言发布加速了 MoSCoW 的传播

《敏捷宣言》的发布在全球范围内掀起敏捷转型浪潮，MoSCoW 因其与迭代、时间箱理念的天然契合而被大量 Scrum 和 XP 团队借鉴采用。它逐渐超越 DSDM 的边界，成为独立流通的优先级工具。

2007

进入 BABOK 知识体系，确立业务分析标准地位

国际商业分析协会（IIBA）将 MoSCoW 收录进《业务分析知识体系指南》（BABOK），标志着它从工程实践升格为跨行业的专业标准工具。此后，在产品管理、项目管理、UX 设计等领域均可见其身影。

2010s

数字产品时代：从需求管理到用户故事优先级

随着 SaaS 和移动互联网产品的兴起，MoSCoW 被产品团队广泛用于 Sprint 规划和发布计划，"Must Have" 演变为 MVP 定义的核心工具。众多产品管理培训课程和认证（如 CSPO、PMI-ACP）将其列为必学方法，进一步巩固了其全球影响力。
