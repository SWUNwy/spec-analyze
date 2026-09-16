---
name: sprint-framework
description: Run a 1-2 week sprint iteration with planning, standups, review, and retro
source: PMFrame/Sprint_冲刺框架
imported: 2026-09-15
---

# Sprint Framework

Execute work in short, time-boxed iterations with defined ceremonies to maintain focus and continuous improvement. Use for ongoing product development when you need predictable delivery cadence.

## Steps

1. **Sprint Planning** — select items from the prioritized backlog that the team commits to delivering within 1-2 weeks.
2. **Daily Standup** — each team member shares: what I did yesterday, what I will do today, any blockers (15 min max).
3. **Execution** — team works on sprint items; scope is protected from mid-sprint changes.
4. **Sprint Review** — demo completed work to stakeholders; collect feedback.
5. **Sprint Retrospective** — team reflects on what went well, what to improve, and commits to one process change.

## Output Format

Sprint artifacts: a sprint backlog with story point estimates, a burndown chart tracking daily progress, review demo notes with stakeholder feedback, and a retro summary with action items.

---

将产品开发划分为固定时间盒（通常 1–2 周），每个 Sprint 包含计划、执行、评审、回顾四个环节，持续交付可用软件并建立快速反馈循环。

## 它解决什么问题

瀑布开发把反馈推迟  
### 到一切都「完成」之后

传统的瀑布式开发有一个根本缺陷：在产品完全交付之前，团队无法获得真实用户的反馈。这意味着你可能花了六个月时间精心构建了一个用户不需要的功能，而发现问题的那一刻恰好是最难修正的时候。

Sprint 通过「固定时间盒」创建迷你交付循环。每隔 1–2 周，团队就必须交付一个可以被评审的产品增量。这不只是进度管理的技巧，更是强制让真实反馈在开发过程中持续流入的系统设计。固定时间盒也迫使团队做出真实的优先级选择——当时间有限，你必须决定什么是最重要的。

## 框架结构

四个环节构成一个完整  
### 的 Sprint 循环

每个 Sprint 都包含四个有序环节，形成一个闭合的计划—执行—学习循环。

Sprint 循环 · 1–2 周时间盒

01

Sprint 计划

Planning · 半天

团队从 Backlog 中选取要完成的故事，共同估算工作量，确立本 Sprint 的明确目标。目标是一个句子：「完成后用户能做到什么」。

02

执行

Daily Scrum + Work · 核心阶段

团队专注于交付承诺。每日 15 分钟站会同步进展、识别阻碍。Scrum Master 负责清除影响团队专注度的外部干扰。

03

Sprint 评审

Review · 1–2 小时

向利益相关者展示可工作的软件（不是 PPT），收集真实反馈。这是产品方向调整最自然的时机，而不是等到下次季度规划。

04

Sprint 回顾

Retrospective · 1 小时

团队内部复盘：什么做得好？什么需要改进？每次回顾至少提炼 1 个可执行的改进点，下个 Sprint 立即实施。

Sprint  
循环

1–2 周

Sprint 中的核心角色

👤

Product Owner

维护并优先级排序 Backlog，代表用户和业务利益，对 Sprint 目标负责。

🛡️

Scrum Master

保护团队专注度，清除外部障碍，推动 Scrum 流程正确运作。不是项目经理，是服务型领导。

👥

开发团队

跨职能（开发、设计、测试）的自组织团队，对 Sprint 承诺的工作量共同负责，自主决定如何完成。

理想团队规模

3–9 人。太小则技能不完整，太大则沟通成本激增。

## 适用场景

### 什么时候该用它？

Sprint 不是银弹，但在需要快速反馈和持续交付节奏的场景中，它是最被验证的框架之一。

🔄

新功能迭代开发

将大功能拆分为多个 Sprint 逐步交付，每次都能基于真实反馈调整方向，避免「大爆炸」式发布风险。

🌱

产品从 0 到 1 的早期建设

早期产品方向不确定性最高，Sprint 的快速循环让团队能够在投入大量资源之前持续验证假设。

🤝

大型跨职能团队协作对齐

Sprint 会议（计划、评审、回顾）为跨职能团队提供结构化的同步节点，减少信息断层。

📡

快速响应市场反馈

当市场出现新信号（竞品动态、用户投诉爆发），Sprint 的时间盒允许团队在下一个计划会中快速重新调整优先级。

🔧

技术债与新功能的平衡规划

通过每个 Sprint 分配固定比例的技术债时间，避免技术债无限积累，也避免技术债「一次性清算」对业务的冲击。

🌐

远程团队同步与节奏建立

对于分布式团队，Sprint 节奏提供了可预测的协作结构，每日站会和 Sprint 边界成为跨时区同步的锚点。

## 真实案例

Spotify 如何用 Sprint  
### 在 8 周内构建 Discover Weekly

2015 年 Spotify 推出的 Discover Weekly 功能成为流媒体行业最成功的个性化推荐产品之一，首周发布后吸引 1000 万用户使用。但鲜为人知的是，整个功能从概念到上线只用了 4 个两周 Sprint——共 8 周。这得益于 Spotify 在标准 Scrum Sprint 基础上演化出的独特实践。

Spotify · Discover Weekly

个性化推荐功能 · 4 个 Sprint 从概念到上线

2015

🔄

Spotify 的 Sprint 演化

1

**每日站会**：分布式小队异步 Slack 同步，同地办公者 10 分钟内结束

2

**Sprint 评审**：Demo Friday——向其他小队展示成果，跨团队想法碰撞

3

**回顾会**：Health Check 格式，小队对 12 个维度自评（包括「发布容易度」「团队支持」）

4

**Sprint 目标**：与 Tribe 级别 OKR 绑定，每个 Sprint 目标都是 OKR Key Result 的子集

📈

为什么 Sprint 让它成功

✓

每个 Sprint 可独立验证，推荐算法在 Sprint 2 就经过了内部用户测试

✓

Sprint 4 的 A/B 测试向 10% 用户灰度，在全量上线前提前发现边缘问题

✓

Demo Friday 让数据团队在 Sprint 3 提供了关键的播放列表质量信号

✓

固定时间盒防止了范围蔓延——算法完善性总可以无限追求，Sprint 边界强制停止

Discover Weekly · 4 个 Sprint 时间线

Sprint 1

第 1–2 周

数据管道搭建

收集用户历史收听记录

建立播放列表数据库索引

确定协同过滤算法方向

交付：数据管道可正常运行

Sprint 2

第 3–4 周

推荐算法原型

实现基础推荐算法

内部团队试用（约 50 人）

调整推荐多样性参数

交付：算法通过内部质量验收

Sprint 3

第 5–6 周

UI 与策划逻辑

设计 Discover Weekly 专属 UI

实现每周一自动刷新机制

优化冷启动用户体验

交付：完整功能可端到端运行

Sprint 4

第 7–8 周

A/B 测试与灰度上线

向 10% 用户灰度发布

监控播放率与完播率

修复灰度期间发现的 3 个问题

交付：全量上线，首周 1000 万用户

💡

Spotify 最重要的发现：**将用户带入 Demo Friday 后，Sprint 评审质量显著提升**。从团队内部检查点变成真实反馈循环，每个 Sprint 结束时团队都知道「用户怎么想」而非「我们觉得应该怎样」。这是 Discover Weekly 能在 Sprint 4 就达到可全量发布质量的关键原因。

## 使用技巧

让 Sprint 真正运转的  
### 五条原则

Sprint 的仪式很容易学会，但让它真正产生价值的是团队对「承诺」和「反馈」的态度。

01

Sprint 目标是承诺，不是愿望清单

Sprint 计划结束时，团队对 Sprint 目标的完成要有真实的承诺感。「我们尽量」不是承诺。如果团队认为目标不可达，在计划会上说出来，而不是在 Sprint 结束时以「我们努力了」收场。

02

Backlog Refinement 在 Sprint 中就要做

不要等到计划会前一天才开始梳理下个 Sprint 的故事。每个 Sprint 中期，产品负责人和团队应该花 1–2 小时细化未来 2–3 个 Sprint 的故事——让计划会变成对话，而不是临时讨论。

03

「完成的定义」必须团队一致同意

「开发完成」不等于「完成」。在第一个 Sprint 开始前，团队要明确写下 Definition of Done（DoD）：代码审查通过？测试覆盖率达到 X%？产品负责人验收？DoD 不统一，Sprint 结束时的争议就不可避免。

04

评审会展示能用的软件，不是 PPT

Sprint 评审的价值在于真实反馈，而 PPT 演示能轻易掩盖产品实际状态。要求团队在真实环境或 staging 环境中演示功能。如果「功能还没好到可以 Demo」，这本身就是一个需要讨论的信号。

05

回顾会是改进团队的最快工具，不要跳过

当项目压力大时，回顾会往往是第一个被砍掉的会议。这是错误的——压力大时恰恰最需要改进工作方式。一次有效的回顾会只需要 45 分钟，但它带来的流程改进可以在接下来几个 Sprint 中节省数倍时间。

## 来源与历史

### 从丰田生产线到全球敏捷软件开发的核心节奏单元

Sprint（冲刺）是Scrum框架的核心时间盒单元，由肯·施瓦伯（Ken Schwaber）与杰夫·萨瑟兰（Jeff Sutherland）在1990年代初共同发展的Scrum方法论中正式确立。这一固定时长的迭代周期将复杂的软件开发过程切割为可管理、可检视的小段，从根本上改变了全球软件产品团队的工作方式。

1986

野中郁次郎发表"橄榄球式"开发研究

日本管理学家野中郁次郎与竹内弘高在《哈佛商业评论》发表论文，以橄榄球比赛中整队推进的协作方式类比新产品开发，强调跨职能小团队、高度自主与快速迭代的重要性。这篇论文直接启发了Scrum名称的由来，并为敏捷开发的核心理念奠定了学术基础。

1993至1995

萨瑟兰与施瓦伯独立发展Scrum

杰夫·萨瑟兰在Easel公司首次将Scrum方法应用于软件开发实践，肯·施瓦伯同期在ADM公司进行类似探索。1995年，两人在OOPSLA大会联合发表论文《Scrum开发流程》，正式将短周期迭代（Sprint）、每日站会、冲刺评审等核心实践系统化，Scrum框架正式进入软件工程视野。

2001

敏捷宣言将Sprint提升为行业共识

十七位软件开发领袖在犹他州雪鸟滑雪场共同签署《敏捷软件开发宣言》，确立了"可工作的软件胜于详尽的文档"等四项核心价值观。Scrum作为敏捷宣言发布后最迅速普及的方法论框架，Sprint概念随之进入全球软件开发团队的标准词汇。

2010

Scrum指南正式发布并持续更新

施瓦伯与萨瑟兰联合发布《Scrum指南》，以权威文档形式定义Sprint的标准规则：固定时长（通常1-4周）、冲刺目标不可变更、冲刺结束须交付可用增量。《Scrum指南》此后多次修订，成为全球Scrum Master认证考试的核心参考文件。

2019至今

Google Sprint衍生并拓展应用边界

Jake Knapp在Google Ventures推出"设计冲刺"（Design Sprint）方法，将Sprint概念压缩为五天的原型验证流程并向产品、设计领域大幅延伸。两种Sprint的并行传播使这一概念超越软件开发，成为现代产品创新工作的通用时间管理范式。
