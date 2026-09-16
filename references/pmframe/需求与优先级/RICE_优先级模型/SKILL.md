---
name: rice-prioritization
description: Prioritize features using RICE scoring (Reach, Impact, Confidence, Effort)
source: PMFrame/RICE_优先级模型
imported: 2026-09-15
---

# RICE Prioritization

Score and rank features or initiatives using a consistent formula to remove bias from prioritization. Use when your backlog has many competing items and stakeholders disagree on order.

## Steps

1. **Reach** — estimate how many users/events this will affect in a given time period.
2. **Impact** — rate the expected effect per user (3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal).
3. **Confidence** — rate how certain you are about estimates (100% = high, 80% = medium, 50% = low).
4. **Effort** — estimate work required in person-months (or person-weeks).
5. **Calculate** — RICE Score = (Reach x Impact x Confidence) / Effort.
6. **Rank** — sort by score descending; review the top items for sanity.

## Output Format

A ranked table with columns: Feature, Reach, Impact, Confidence, Effort, RICE Score. Include a brief rationale for each estimate.

---

Intercom 提出的量化优先级框架，用触达量（Reach）× 影响力（Impact）× 信心（Confidence）÷ 工作量（Effort）计算优先级分数，让功能排序有据可查，告别拍脑袋决策。

## 它解决什么问题

优先级讨论常常变成  
### 「谁嗓门大谁赢」

功能排序的争论往往沦为立场博弈：业务方说「这个对客户最重要」，工程负责人说「那个技术债不还要爆」，PM 夹在中间不知道听谁的。问题不在于缺少信息，而在于没有一个大家共同认可的评估框架。

RICE 用四个维度把模糊的「感觉」转化为可以讨论和挑战的数字。当有人要推一个功能，他需要具体说明：这个季度有多少用户会用到它？对我们核心指标的影响有多强？我们的估算有多可靠？需要花多少人力？把争论从「我觉得」转向「我的数据是」，优先级对话才能真正发生。

## 框架结构

### 一个公式，四个维度

RICE 分数由四个因子计算得出。每个因子的定义对齐是使用 RICE 的第一步——在团队内部统一定义比精确计算更重要。

R × I × C

E

\=

RICE Score

R

Reach · 触达量

每个周期内有多少用户会受到这个功能的影响。使用绝对数量，而非百分比。

例：每季度 2,000 个用户会经过这个流程

I

Impact · 影响力

对核心指标的影响程度。使用固定量表而非自由输入，减少主观膨胀。

0.25 最小 / 0.5 低 / 1 中 / 2 高 / 3 极高

C

Confidence · 信心值

你对 Reach 和 Impact 估算的确定程度。信心低说明需要先做验证实验。

100% 有数据 / 80% 合理推断 / 50% 猜测

E

Effort · 工作量

完成该项目所需的总人月数（设计 + 工程 + 测试）。分母越大分数越低。

例：0.5 人月 / 1 人月 / 3 人月

假设对比示例

功能

Reach

Impact

Confidence

Effort

RICE 分数

全局搜索优化

5,000

2

80%

1

8,000

批量导出功能

300

3

50%

2

225

移动端推送通知

4,000

2

80%

2

3,200

AI 智能建议

2,000

3

50%

6

500

入职引导流程

1,500

2

80%

0.5

4,800

## 适用场景

### 什么时候该用它？

RICE 最适合在「功能列表已经存在但排序有争议」的场景中登场，为定量对话提供结构化框架。

📊

季度规划时的功能优先级排序

将候选功能全部评分，按 RICE 分数排列，再讨论异常值——高分不做和低分坚持做的都值得审视。

🏗️

多产品线的资源分配决策

当工程资源需要在多条产品线间分配时，统一的 RICE 分数让跨线比较有共同语言。

⚖️

当团队对优先级有强烈分歧时

把分歧转化为「对哪个因子的估算不同」——这比「我觉得这个更重要」更容易收敛。

💬

PM 向工程团队解释排序逻辑

RICE 分数让 PM 的决策透明可追溯，工程师理解排序背后的数据后更容易形成认同。

🔧

评估是否值得投入技术债偿还

技术债的 Reach 和 Impact 可以用「解决后释放多少工程效率」来量化，让它参与同等竞争。

🔄

新功能 vs. 体验优化的取舍

体验优化往往 Reach 高但 Impact 打分低，RICE 让这种取舍有明确的权衡可见度。

## 真实案例

Intercom 团队如何用 RICE  
### 终结优先级内耗

2015 年，Intercom 产品团队公开记录了他们引入 RICE 的过程。当时团队 backlog 已经积累了数十个功能请求，每个 stakeholder 都坚持自己的优先级判断，季度规划会议常常以「谁级别高听谁的」收场。RICE 的引入不是为了得到一个「正确答案」，而是为了让争论聚焦在可以检验的数字上。

Intercom

产品团队优先级重构 · RICE 首次应用

2015

🎯

为什么引入 RICE

1

Backlog 过长，每季度规划耗时超过 3 周

2

销售团队推来自大客户的需求，优先级远高于普通用户

3

工程团队对产品决策缺乏透明度，执行认同度低

4

缺乏跨功能比较的共同语言，新功能与修复、优化无法对比

📈

RICE 的实际效果

✓

季度规划会议从 3 周压缩至 4 天

✓

「高压需求」（大客户推动）得分普遍偏低，用数据替代了权力关系

✓

发现 Reach 估算差异最大——同一个功能，PM 和销售的估算可能相差 10 倍

✓

Confidence 低于 50% 的功能被改造为快速实验，避免直接大规模投入

Intercom 实际案例 · 三个功能的 RICE 对比计算

功能

R · 触达/季度

I · 影响

C · 信心

E · 工作量

计算过程

RICE 分数

移动端推送通知

2,000

2

80%

2 人月

2000×2×0.8÷2

1,600

高级筛选功能

150

3

50%

1 人月

150×3×0.5÷1

225

新用户引导向导

500

2

80%

0.5 人月

500×2×0.8÷0.5

1,600

💡

核心洞察：**移动端推送通知和新用户引导向导同分（1,600），都在 Q1 上线**。高级筛选虽然有强烈的 stakeholder 压力，得分仅 225，被推迟至后续季度。Intercom 团队发现 RICE 最大的价值不是得出最终答案，而是**强迫每个人为自己的 Reach 数字辩护**——当有人说「这个功能很多人用」，他们必须给出具体数字。

## 使用技巧

### 让 RICE 真正有效的五条原则

RICE 分数是对话工具，不是自动决策机器。以下五条原则帮助团队避免常见的滥用陷阱。

01

先对齐「Reach」的定义单位

Reach 是每周？每月？每季度？是独立用户数还是操作次数？在团队内部统一单位之前，不同功能的 RICE 分数没有可比性。建议选择与产品核心指标周期一致的时间窗口。

02

Impact 的分数要和具体指标挂钩

「影响力 = 3（极高）」必须对应一个可验证的指标变化，例如「预期将激活率提升 15%」，而不是「感觉用户会很喜欢」。脱离具体指标的 Impact 打分只是把主观感受转化成了数字。

03

Confidence 低于 50% 时，先做小实验

信心度反映的是你对 Reach 和 Impact 估算的把握程度。当 Confidence 低于 50%，说明假设本身未经验证，应先设计快速实验（如 A/B 测试或用户访谈）来提升信心，而不是直接投入大功能开发。

04

Effort 用相对单位，不要用绝对天数

用人周或人月（设计 + 工程 + 测试加总）而非「5 天开发」。绝对天数容易低估测试、沟通和返工成本。相对估算（0.5 / 1 / 2 / 5 人月）比精确估算更能反映真实规模差异。

05

RICE 分数是对话起点，不是终点

异常高的分数（是否低估了 Effort？）和异常低的分数（是否有团队共识之外的战略价值？）都值得专门讨论。RICE 的目标是让争论变得更精准，而不是消灭判断。

## 来源与历史

### 一个Intercom产品经理的优先级困惑催生的行业标准

RICE模型由Intercom产品经理肖恩·麦克布莱德（Sean McBride）于2015年创建，是对传统"影响力×信心"优先级公式的重要改进。通过引入"覆盖人数"与"工作量"两个维度，RICE将主观的产品直觉转化为可量化比较的优先级分数，迅速成为科技公司产品团队的标配工具。

2000年代初

产品优先级决策依赖主观判断

互联网产品进入高速扩张期，产品经理面临的需求数量远超团队承接能力，但彼时主流的优先级方法仍以"HiPPO效应"（最高薪酬者的意见）或简单的高中低分类为主。量化优先级工具的缺失导致资源争抢与决策效率低下成为普遍痛点。

2013至2014

ICE模型作为早期量化工具兴起

在RICE出现之前，ICE（影响力×信心×容易度）评分模型在部分产品圈子中流行。然而ICE模型缺少对"受影响用户规模"的度量，导致一个影响一万名用户的功能与影响一百名用户的功能可能获得相同分数，决策失真问题较为突出。

2015

肖恩·麦克布莱德在Intercom博客发布RICE框架

肖恩·麦克布莱德在Intercom官方博客发表文章，系统阐述了RICE评分方法：Reach（覆盖人数）× Impact（影响程度）× Confidence（信心指数）÷ Effort（工作量）。文章详细解释了每个维度的评估标准，并提供了Intercom内部的实际使用案例，使读者能够直接上手应用。

2016至2018

框架在硅谷产品社区快速扩散

RICE框架通过产品经理社区、Product Hunt、Medium等渠道迅速传播，被Asana、Dropbox等众多科技公司的产品团队采用。多家知名产品工具（如ProductPlan、Aha!）将RICE评分内置为标准功能，进一步巩固了其行业工具地位。

2019至今

成为产品优先级教育的标准案例

RICE被纳入主流产品管理课程与认证体系，成为产品经理求职面试中频繁被提及的工具。学界与实践者持续在RICE基础上探索改进方案，围绕权重设置、指标量化等问题的讨论推动了整个优先级方法论领域的进步。
