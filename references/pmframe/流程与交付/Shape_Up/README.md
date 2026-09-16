[← 返回框架列表](index.html)

#49 · 执行落地

Framework Deep Dive

Shape _Up_
==========

Basecamp 发明的产品开发方法：6 周固定周期，固定预算浮动范围，成型问题而非任务清单，消除永无止境的积压。

[下载 Skill](skills/shape-up.md)

01 它解决什么问题

Scrum 的积压清单永远清不完
----------------

Scrum 创造了一个系统性问题：产品积压（Backlog）以比团队消化更快的速度增长。每次 Sprint 规划会，团队要估算他们并不真正理解的工作——Story Point 变成了表演，Velocity 成了政治工具，而不是决策依据。

更深层的问题是：在 Scrum 体系下，「范围」是固定的，「时间」是浮动的——项目总是会延期。Shape Up 把这个逻辑颠倒过来：**时间固定（6 周），范围浮动**。团队在固定的时间预算内找到最好的解法，而不是把一个固定的解法做到完美。

Shape Up 引入了三个核心阶段替代 Sprint 循环：Shaping（成型）在工作被分配前确定问题边界；Betting Table（押注桌）让管理层真正选择他们押注的工作而非管理积压；Building（构建）阶段团队有完全自主权，没有每日站会，没有外部干扰。周期结束，未完成的工作不会自动延续到下一周期——它必须重新被评估是否值得再次押注。

02 框架结构

固定时间，浮动范围
---------

Shape Up 的核心是一个 8 周的大循环：6 周构建 + 2 周冷却。在 Shaping 阶段，PM 或设计师将问题「成型」为一个 Pitch——不是详细规格，而是足够清晰的问题描述加上粗略解法轮廓。

01

并行进行

Shaping

持续进行 · 不对外公开

PM/设计师定义问题边界，写出 Pitch。包含：问题、胃口（Appetite）、粗略解法、不做什么。不是 spec，不是任务清单。

02

周期开始前

Betting Table

~2 小时决策会议

管理层审阅所有 Pitch，选择下一个周期要押注的工作。没有积压，不选就是不做。每个选择都是真正的承诺。

03

主周期

Building

固定 6 周

小团队（1 设计师 + 1–2 工程师）全权负责。无每日站会，无外部打断。用 Hill Chart 追踪进度，而非 Story Points。

04

周期结束后

Cool-down

2 周缓冲

修复 Bug、技术债、个人探索。也是下一周期 Shaping 的关键时间。让团队喘息，避免永续冲刺的疲惫。

Appetite（胃口）— Shape Up 的核心概念

「这件事值得用多少时间？」

在开始工作之前就决定时间预算。不是估算需要多少时间，而是主动决定愿意投入多少。如果解法在 2 周内做不完，就找更小的解法，而不是延长时间。

Estimate（估算）— 传统方法的陷阱

「做完这件事需要多少时间？」

估算把控制权交给了工作量本身。当估算超出预期，要么延期要么降质量。Shape Up 认为这个问题本身就是错的——应该先定预算，再找解法。

Hill Chart — 进度可视化（上坡 = 探索未知 · 下坡 = 确定执行）

通知中心 消息搜索 归档功能 标签系统 上坡 · 发现未知 下坡 · 确定执行

上坡早期：问题尚未定义清楚，方案未知，充满不确定性

上坡后期：已有解法思路，但实现细节仍在探索中

下坡阶段：解法已定，剩余工作是确定性的执行

03 适用场景

什么时候该用它？
--------

Shape Up 不是所有团队的万能答案，但对于特定的痛点，它是最直接的解药。

🔄

替换中小型团队的 Scrum

10–50 人的产品团队，已经感受到 Sprint 规划和积压管理的沉重负担，想要更少仪式感、更多自主权。

✂️

减少规划会议开销

把每两周一次的 Sprint 规划 + 评审 + 回顾，压缩为每 8 周一次 2 小时的 Betting Table，节省大量协调成本。

🚧

阻止范围蔓延

Appetite 机制强制在开始前定义「这件事值多少时间」，让团队有权说：「在 6 周内做不到这个范围，我们找更小的解法。」

🎨

给设计师更多主导权

Shaping 阶段由 PM 和设计师主导，建筑师级别的设计决策发生在工作分配之前，而不是在开发进行中。

🗂️

摆脱 JIRA 驱动的开发

用 Pitch 文档和 Hill Chart 替代 Epic/Story/Task 的层级体系，让团队聚焦于真正的进展而非票据管理。

🎯

构建聚焦功能而非功能汤

每个周期只押注少数几个 Pitch，逼迫团队真正选择最重要的事，而不是把所有「好想法」都装进 Backlog 积灰。

04 真实案例

Basecamp × HEY  
日历功能的 2 周 Appetite
-----------------------------------

Shape Up 不仅是 Basecamp 发明的，它也是 Basecamp 构建所有产品的实际方式。Ryan Singer 于 2019 年将这套方法发布为免费电子书，记录了他们用这个方法构建 Basecamp 3 和 HEY 的真实经历。

2020 年发布的 HEY（Basecamp 的电子邮件产品）是 Shape Up 最典型的产品级案例。其中日历视图功能的决策过程，完美展示了 Appetite 与 Estimate 思维的区别。

HEY by Basecamp

日历功能 · Shape Up 实战案例 · 2020 年

2020

The Pitch — 实际决策文档（节选重构）

「Appetite: 2 周。问题：用户无法快速浏览哪些日子有邮件往来。粗略解法：翻转时间线视图，按日历格式展示。不做：不支持 v1 的循环事件。」

这个 Pitch 明确说明了「不做什么」——循环事件在 v1 不在范围内。正是这个边界决策让团队在 2 周内完成了竞争对手花数月才做完的功能。

⚡

为什么 2 周能做完

→

Appetite 先于解法：先定「2 周」，再找「2 周能做到的解法」

→

明确「不做什么」：循环事件被显式排除，避免范围蔓延

→

团队全权决定实现细节，无需每步审批

→

6 周构建周期内，日历是其中一个 scope，与其他 scope 并行推进

📚

采用 Shape Up 的其他公司

→

Shapeways（3D 打印平台）：公开宣布从 Scrum 迁移至 Shape Up

→

Podia（创作者平台）：创始人撰文记录了完整迁移过程

→

Tidelift（开源依赖管理）：将 Shape Up 用于核心产品开发

→

Ryan Singer 的书已被下载逾百万次，影响了全球数千个团队

2周

HEY 日历功能的 Appetite

6周

Shape Up 标准构建周期

0

积压清单条目（Betting 模式下）

05 使用建议

Shape Up 最容易踩的六个坑
-----------------

Shape Up 看起来比 Scrum 简单，但真正实施时，大多数团队会在以下几个环节犯错。

01

**写 Spec 而不是 Pitch。**Pitch 是粗略解法的描述，留白是刻意设计的——让团队有空间在 Building 阶段找到最好的实现方式。如果你写了详细的 UI 规格，你已经越界了。

02

**跳过 Shaping 直接进入 Building。**「我们很清楚要做什么，直接开始吧」是最危险的想法。没有 Shaping 的工作会在 6 周内变成无边界的范围爬行，让团队在最后两周陷入混乱。

03

**保留了积压清单。**Betting Table 模型的精髓是「不选就是不做」——没有自动续期的积压。一旦你保留了 Backlog，Shape Up 就退化成了披着新外衣的 Scrum。

04

**Building 阶段不信任团队。**6 周内管理层频繁 check-in、要求更新进度报告，会破坏 Shape Up 的核心假设：团队是有能力自我组织的成年人。Hill Chart 是团队给自己看的，不是给管理层汇报的。

05

**把 Hill Chart 变成强制工具。**Ryan Singer 明确说过，Hill Chart 是可选工具，不是仪式。不是所有项目都需要它，也不应该用它来管控团队。如果团队发现它有用，才使用。

06

**用 Shape Up 管理维护性工作。**Shape Up 是为新功能开发设计的，不适合 Bug 修复、客服响应、基础设施维护等工作。Cool-down 期间可以处理这些，但不要把 Shape Up 的 Betting 机制强行套用在运维工作上。

06 来源与历史

37signals用十五年产品实践提炼的反Scrum宣言
----------------------------

Shape Up由Basecamp（原37signals）产品策略师瑞恩·辛格（Ryan Singer）于2019年以免费电子书形式发布，是对Basecamp十余年产品开发经验的系统性总结。它以六周工作周期为核心，彻底摒弃传统backlog与冲刺模式，提出了一套以"塑形"与"构建"为核心的产品开发哲学。

2004

37signals发布Basecamp，开始积累产品方法论

杰森·弗里德（Jason Fried）与大卫·海涅迈尔·汉森（DHH）创立的37signals发布项目管理工具Basecamp，团队在没有风险投资、远程协作的约束下摸索出一套高度务实的产品开发方式。团队规模小、决策扁平、避免无意义会议的工作文化成为Shape Up方法论的精神底色。

2010年代初

六周周期实践逐步成形

Basecamp团队在尝试并放弃多种主流敏捷方法后，逐步确立了以六周为单位的工作节奏：前几周用于"塑形"（Shaping，即充分定义问题边界与解决方案草图），后几周由独立小团队全权负责构建。这种节奏既保留了灵活性，又避免了短冲刺带来的碎片化压力。

2019

瑞恩·辛格发布《Shape Up》电子书

瑞恩·辛格将Basecamp内部方法论整理成书，以免费在线形式发布于Basecamp官网。书中系统阐述了"塑形""下注""构建"三个阶段，以及"面包屑范围"（breadboarding）和"胖标记草图"（fat marker sketch）等独特工具，引发产品社区的广泛讨论与争鸣。

2020至今

成为Scrum替代方案的重要旗帜

疫情加速远程工作普及，Shape Up对异步协作与自主负责制的强调契合了这一时代需求，吸引了大量对传统Scrum产生疲惫感的产品团队。Linear、Notion等知名产品公司公开分享受Shape Up启发的工作方式，使其成为现代产品开发方法论版图上不可忽视的重要流派。

配合使用

与这些工具搭配效果更好
-----------

[Sprint 冲刺框架 — 同类比较：Sprint适合需要持续迭代的开发节奏 →](framework-sprint.html) [用户故事地图 — 互补使用：故事地图细化Pitch中的用户任务流程 →](framework-user-story-map.html) [NOW-NEXT-LATER 路线图 — 互补使用：路线图呈现多个Cycle的交付规划 →](framework-now-next-later.html) [反向工作法 — 上游输入：从用户价值倒推塑造功能范围 →](framework-working-backwards.html)

继续阅读下一个 →

pmframe.works · © 2026

(function(){ var slug='shape-up'; // Inject hero SVG var svgEl=document.getElementById('hero-svg'); if(svgEl&&typeof MODAL\_SVGS!=='undefined'&&MODAL\_SVGS\[slug\]){ svgEl.innerHTML=MODAL\_SVGS\[slug\]; } // Fill meta-inline from MODAL\_META if empty var mi=document.querySelector('.meta-inline'); if(mi&&!mi.querySelector('.m-item')&&typeof MODAL\_META!=='undefined'&&MODAL\_META\[slug\]){ var m=MODAL\_META\[slug\]; var fields=\[\['提出者',m.by\],\['类型',m.type\],\['适合',m.fit\],\['年份',m.year\]\]; mi.insertAdjacentHTML('afterbegin',fields.filter(function(f){return f\[1\];}).map(function(f){ return '<div class="m-item"><span class="m-label">'+f\[0\]+'</span><span class="m-value">'+f\[1\]+'</span></div>'; }).join('')); } // Favorites var favBtn=document.getElementById('nav-fav-btn'); if(favBtn&&typeof isFav==='function'){ function updateFavBtn(){ var f=isFav(slug); favBtn.className='nav-fav-btn'+(f?' is-fav':''); favBtn.textContent=f?'\\u2605 \\u5df2\\u6536\\u85cf':'\\u2606 \\u6536\\u85cf'; } favBtn.onclick=function(){toggleFav(slug);updateFavBtn();}; updateFavBtn(); } })();