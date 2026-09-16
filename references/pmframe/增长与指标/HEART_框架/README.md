[← 返回框架列表](index.html)

#94 · 验证测试

Framework Deep Dive

_HEART_ 框架
==========

Google 提出的用户体验度量框架：Happiness（幸福感）、Engagement（参与度）、Adoption（采用率）、Retention（留存率）、Task success（任务完成率）。把抽象的「体验好」转化为可追踪的量化指标。

[下载 Skill](skills/heart.md)

01 它解决什么问题

当「体验很好」无法被度量时
-------------

「用户体验好不好」是产品评审会上最常出现、也最难达成共识的话题。设计师说「界面很直觉」，工程师说「功能都实现了」，运营说「数据没变化」——三方说的都是事实，却得出不同结论。HEART 框架正是为了终结这种模糊讨论而诞生的。

2010 年，Google 研究员 Kerry Rodden 和她的团队在研究如何为大规模产品（数亿用户）建立可靠的 UX 度量体系时，发现传统的可用性测试无法规模化，而通用的商业指标（如 DAU、营收）又不能精准反映体验质量。HEART 框架因此被设计为一套「体验驱动」的指标选择方法论，而不是固定的 5 个指标。

它的核心价值在于：提供了一个共同语言，让产品、设计、数据团队在讨论体验改进时有清晰的分类框架，避免苹果和橘子混在一起比较。

02 · 框架维度

HEART 的五个度量维度
-------------

每个字母代表一个体验维度，每个维度都需要根据具体产品场景选择适合的指标，而不是照搬通用公式：

H

Happiness

幸福感

用户对产品的主观满意度。通常通过 NPS、CSAT 调查、应用商店评分采集。是「感受」层面的指标。

E

Engagement

参与度

用户在产品中的活跃程度。可以是会话频率、使用时长、内容生产量等，反映产品对用户的吸引力深度。

A

Adoption

采用率

新用户或新功能的采纳速度。关注新注册用户的激活比例，或新功能在现有用户中的渗透率。

R

Retention

留存率

用户随时间持续使用产品的比例。通常看次日、7 日、30 日留存，是衡量产品长期价值最核心的指标。

T

Task success

任务完成率

用户完成目标操作的效率与成功率。包括任务完成时间、错误率、完成比例，直接反映产品的可用性质量。

03 · 配套方法

Goals-Signals-Metrics：让 HEART 落地的三步法
------------------------------------

HEART 框架本身只是维度划分，真正让它可操作的是 GSM（Goals-Signals-Metrics）方法。对每个 HEART 维度，都需要依次回答三个问题：

层次

核心问题

说明

示例（以 Retention 为例）

Goals 目标

这个维度上，用户/产品的成功是什么样的？

用行为语言描述期望状态，而非数字。

「用户在尝试核心功能后，形成每周至少使用一次的习惯」

Signals 信号

用户的哪些行为或反应，说明我们正在/没在达成目标？

寻找行为上的可观测信号，不必是最终指标。

「用户在 7 天内再次登录并完成至少一个核心操作」

Metrics 指标

如何量化上述信号？

选择可追踪、可对比的具体数字形式。

「注册后 7 日内完成第二次核心任务的用户比例（次周激活留存率）」

04 · 执行步骤

在产品迭代中如何使用 HEART？
-----------------

01

明确当前迭代要解决的体验问题

迭代规划阶段

在开始之前，先问：这次迭代最主要的体验目标是什么？是提升新用户的激活（Adoption）？还是降低核心流程的错误率（Task success）？**不需要同时关注所有 5 个维度**——选择 1-2 个与本次迭代最相关的维度聚焦，其他作为监控指标即可。

02

用 GSM 为选定维度定义指标

指标设计阶段

对每个选定的 HEART 维度，依次完成 Goals → Signals → Metrics 的推导。这个过程最好以工作坊形式进行，产品、设计、数据分析三方共同讨论。重点是**从用户目标出发推导指标，而非从现有埋点反向定义目标**。

03

建立基线，设定改善目标

上线前

在功能上线前，先测量当前指标的基线值。基线是判断改善效果的参照系。同时设定改善目标——注意目标要基于历史数据和行业参考，而非主观期望。**没有基线的「提升 10%」目标毫无意义。**

04

上线后追踪，识别信号变化

上线后 2-4 周

监控各维度指标变化，特别注意**意外的负向信号**——有时某个维度的改善会以另一个维度的下降为代价。例如功能简化提升了 Task success，但可能降低了高级用户的 Engagement。这种权衡需要显性地讨论和决策。

05

将度量结果反哺下一轮迭代

迭代复盘

复盘时不只看「指标有没有达成」，更重要的是理解「为什么」。指标改善的背后，是哪个设计决策起了作用？指标未改善，是假设本身有问题，还是执行质量不够？这些问题的答案，决定下一轮迭代的投入方向。

05 · 案例拆解

Google Docs 的 HEART 实践
----------------------

Google Docs

协同文档 · HEART 框架原生使用场景

Kerry Rodden, 2010

📐

各维度指标选择

H

Happiness：通过弹窗调研采集 CSAT 分数，每季度一次，样本量足够大以覆盖不同用户群

E

Engagement：每用户每周的协同编辑次数（区分「只读」和「主动贡献」行为）

A

Adoption：新功能（如建议模式）在活跃用户中的 30 日渗透率

R

Retention：28 日活跃留存率，以「在文档中完成至少一次编辑」为活跃定义

T

Task success：从打开文档到完成首次分享链接的中位时间与失败率

💡

应用中的关键发现

A

发现 Happiness 评分高的用户，Retention 不一定高——「喜欢但不用」是常见模式，说明两个维度需要分开追踪

B

Task success 中的「分享」流程是最大摩擦点，改善后带动了 Adoption 指标的显著提升

C

GSM 方法帮助团队发现原有指标（页面访问量）与体验目标脱节，推动了指标体系的重构

06 · 注意事项

使用 HEART 框架时的常见误区
-----------------

⚠️

把框架变成固定的 5 个指标

HEART 是维度分类，不是指标模板。每个产品、每个功能需要根据自身目标选择适合的指标，直接套用别人的指标会导致度量失焦。

⚠️

忽视维度间的权衡关系

Engagement 和 Happiness 可能是负相关的——高频使用有时来自产品设计的上瘾机制，而非真正满意。要识别并明确团队对这种权衡的态度。

⚠️

Happiness 指标采集频率过高

过于频繁的满意度调研会导致用户疲劳，反而降低调研质量。建议每季度一次大规模调研，配合事件触发的即时微调研。

💡

最佳实践：建立体验健康看板

将 HEART 各维度的核心指标做成周报看板，让产品、设计、工程团队都能实时看到体验质量变化趋势，而不是等到季度复盘才发现问题。

02 来源与历史

Google 用数据回答「用户真的喜欢这个产品吗」
-------------------------

HEART 框架由 Google 用户体验研究员凯莉·罗登（Kerry Rodden）、霍利·罗杰斯（Hobby Hutchinson）和 Yvonne Rogers 于 2010 年共同提出，发表于 CHI 会议论文《Measuring the User Experience on a Large Scale: User-Centered Metrics for Web Applications》。它将用户体验质量拆解为五个可量化维度，解决了产品团队长期面临的难题：如何用数据证明用户体验的改善。

2000s 初

大规模用户体验度量缺乏标准

随着 Google 产品用户量级突破亿级，传统的可用性测试已无法代表整体用户体验。产品团队依赖页面访问量、点击率等单一工程指标，缺乏能够系统反映用户体验质量的多维度量化框架。

2010

Kerry Rodden 等人发表 HEART 框架

Kerry Rodden 等研究员在 ACM CHI 大会发表论文，提出 Happiness（幸福感）、Engagement（参与度）、Adoption（采纳率）、Retention（留存率）、Task Success（任务完成率）五个维度，以及配套的目标—信号—指标（GSM）方法，将定性体验目标与可量化指标系统连接。

2012

Google 内部全面推广

HEART 框架在 Google 内部被推广为产品设计与评估的标准工具，Google 搜索、Google Maps、Gmail 等核心产品团队将其纳入季度 OKR 和用户体验评审流程，推动了数据驱动设计文化在大型科技公司的落地。

2014

Google Ventures 将框架推广至创业公司

Google Ventures 设计合伙人开始在投资组合公司中推广 HEART 框架，与 Design Sprint 共同构成 GV 的产品设计工具包。框架随大量 Google 前员工流向 Facebook、Twitter、Airbnb 等公司，在科技行业广泛传播。

配合使用

与这些工具搭配效果更好
-----------

[北极星指标框架 — 下游承接：从体验指标提炼核心北极星指标 →](framework-north-star-metric.html) [A/B 测试框架 — 验证工具：对 HEART 指标假设进行实验验证 →](framework-ab-testing.html) [任务完成率测试 — 互补使用：用完成率量化任务维度的具体表现 →](framework-task-completion-rate.html) [PURE 可用性评估 — 互补使用：深入评估可用性维度的任务体验 →](framework-pure.html) [AARRR 海盗指标 — 同类比较：从增长漏斗角度补充用户行为分析 →](framework-aarrr.html)

继续阅读下一个 →

pmframe.works · © 2026

(function(){ var slug='heart'; var svgEl=document.getElementById('hero-svg'); if(svgEl&&typeof MODAL\_SVGS!=='undefined'&&MODAL\_SVGS\[slug\]){ svgEl.innerHTML=MODAL\_SVGS\[slug\]; } var mi=document.querySelector('.meta-inline'); if(mi&&!mi.querySelector('.m-item')&&typeof MODAL\_META!=='undefined'&&MODAL\_META\[slug\]){ var d=MODAL\_META\[slug\]; mi.insertAdjacentHTML('afterbegin','<div class="m-item"><span class="m-label">提出者</span><span class="m-value">'+d.by+'</span></div>' +'<div class="m-item"><span class="m-label">类型</span><span class="m-value">'+d.type+'</span></div>' +'<div class="m-item"><span class="m-label">适合</span><span class="m-value">'+d.fit+'</span></div>' +'<div class="m-item"><span class="m-label">年份</span><span class="m-value">'+d.year+'</span></div>'); } // Favorites var favBtn=document.getElementById('nav-fav-btn'); if(favBtn&&typeof isFav==='function'){ function updateFavBtn(){ var f=isFav(slug); favBtn.className='nav-fav-btn'+(f?' is-fav':''); favBtn.textContent=f?'\\u2605 \\u5df2\\u6536\\u85cf':'\\u2606 \\u6536\\u85cf'; } favBtn.onclick=function(){toggleFav(slug);updateFavBtn();}; updateFavBtn(); } })();