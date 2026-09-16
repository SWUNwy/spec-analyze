[← 返回框架列表](index.html)

用户洞察 · #06

Framework Deep Dive

Kano  
_模型_
===========

不是所有功能都一样重要。有些功能的缺失会让用户愤怒，有些功能的存在才会让用户惊喜。

提出者狩野纪昭（Noriaki Kano）

来源1984年论文《Attractive Quality and Must-be Quality》

适合阶段功能规划期 · 版本迭代

使用时长问卷设计 1 天 · 数据分析 3–5 天

[下载 Skill](skills/kano-model.md)

01 它解决什么问题

什么时候该用它？
--------

Kano 模型帮助团队在有限资源下做出更聪明的功能优先级决策——不是「什么都要」，而是清楚地知道哪些是底线、哪些是杠杆、哪些是惊喜。

📋

新功能优先级决策

面对功能 backlog 时，用 Kano 问卷快速判断哪些是必须做、哪些是加分项。

⚔️

竞品差异化分析

将自身功能与竞品对比，识别竞品已将魅力型变为必备型的信号，提前布局。

📊

用户满意度诊断

当 NPS 下滑但原因不明，Kano 分析能帮你找到哪些必备型功能出现了缺口。

🔀

版本 0.x 功能取舍

MVP 阶段资源极度有限，用模型区分哪些功能不做就上不了线，哪些可以放到下个版本。

🎯

高端/低端市场定制

同一功能在不同用户群的 Kano 分类可能截然不同，指导差异化产品线规划。

👥

用户分群差异化需求

对不同细分用户分别做 Kano 问卷，发现同一功能在不同人群中的分类差异。

02 框架结构

三条曲线，定义功能的命运
------------

Kano 模型通过二维坐标系展示功能完善程度与用户满意度的关系。三种不同类型的功能呈现出截然不同的曲线形态，揭示了功能投入与用户感知之间的非线性关系。

.kano-wrap { margin-top: 40px; } .kano-chart-container { position: relative; width: 100%; max-width: 720px; height: 380px; border-left: 2px solid var(--line); border-bottom: 2px solid var(--line); background: var(--paper2); border-radius: 0 0 0 4px; } .kano-axis-label-y { position: absolute; left: -48px; top: 50%; transform: translateY(-50%) rotate(-90deg); font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--ink3); letter-spacing: 0.08em; white-space: nowrap; } .kano-axis-label-x { position: absolute; bottom: -32px; left: 50%; transform: translateX(-50%); font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--ink3); letter-spacing: 0.08em; } .kano-axis-top { position: absolute; left: 10px; top: 8px; font-size: 11px; color: var(--ink3); font-family: 'JetBrains Mono', monospace; } .kano-axis-bottom { position: absolute; left: 10px; bottom: 8px; font-size: 11px; color: var(--ink3); font-family: 'JetBrains Mono', monospace; } .kano-axis-left { position: absolute; left: 8px; bottom: 10px; font-size: 11px; color: var(--ink3); font-family: 'JetBrains Mono', monospace; } .kano-axis-right { position: absolute; right: 8px; bottom: 10px; font-size: 11px; color: var(--ink3); font-family: 'JetBrains Mono', monospace; } /\* Center lines \*/ .kano-hline { position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--line); border-top: 1px dashed var(--line); } /\* SVG curves \*/ .kano-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: visible; } /\* Curve labels \*/ .kano-curve-label { position: absolute; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.05em; padding: 3px 8px; border-radius: 3px; } .kano-label-must { color: var(--rose); background: var(--rose-light); top: 30px; left: 20px; } .kano-label-perf { color: var(--teal); background: var(--teal-light); top: 48px; right: 40px; } .kano-label-attr { color: var(--amber); background: var(--amber-light); top: 20px; right: 20px; } /\* Legend \*/ .kano-legend { display: flex; gap: 24px; margin-top: 48px; flex-wrap: wrap; } .kano-legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink2); } .kano-legend-line { width: 28px; height: 3px; border-radius: 2px; } /\* Three column cards \*/ .kano-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 32px; } .kano-card { padding: 20px; border-radius: 8px; border: 1px solid var(--line); } .kano-card-must { background: var(--rose-light); border-color: var(--rose-mid); } .kano-card-perf { background: var(--teal-light); border-color: var(--teal-mid); } .kano-card-attr { background: var(--amber-light); border-color: var(--amber-mid); } .kano-card-badge { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; font-weight: 500; } .kano-card-must .kano-card-badge { color: var(--rose); } .kano-card-perf .kano-card-badge { color: var(--teal); } .kano-card-attr .kano-card-badge { color: var(--amber); } .kano-card-title { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 300; margin-bottom: 10px; color: var(--ink); } .kano-card-desc { font-size: 12px; color: var(--ink2); line-height: 1.6; margin-bottom: 10px; } .kano-card-example { font-size: 11px; color: var(--ink3); font-style: italic; }

用户满意度

满意 ↑

不满意 ↓

无 ←

→ 完善

必备型 Must-be

期望型 Performance

魅力型 Attractive

功能完善程度（从无 → 完善）

必备型：缺失→愤怒，完善→无感

期望型：越好越满意，线性关系

魅力型：缺失无所谓，存在超惊喜

Must-be · 必备型

底线功能

用户默认你应该有的功能。不具备时用户会极度不满，具备时也不会带来额外满意度。

例：手机能接打电话、App 不崩溃、登录不丢数据

Performance · 期望型

线性功能

做得越好，用户越满意；做得越差，用户越不满。投入与满意度呈正比，可量化对比竞品。

例：加载速度、照片清晰度、电池续航

Attractive · 魅力型

惊喜功能

用户没有预期，但一旦体验到就会惊喜。是差异化竞争的核心武器，随时间可能退化为必备型。

例：微信红包、Siri 最初发布、AirDrop

03 来源与历史

从品质工程到产品管理的跨界之旅
---------------

Kano 模型诞生于日本制造业品质管理领域，经过近四十年的传播与演化，成为全球产品经理最常用的功能优先级工具之一。

1982

狩野团队研究二维品质理论

日本东京理科大学教授狩野纪昭与团队开始研究顾客满意度的二维属性，发现满意度与功能之间并非简单线性关系，提出"魅力品质"与"必备品质"的区别。

1984

论文《Attractive Quality and Must-be Quality》发表

狩野纪昭在日本品质管理学会杂志正式发表论文，确立了必备型、期望型、魅力型、无差异型、逆向型五类品质属性，并提出配套的 Kano 问卷方法。

1993

西方质量管理界发现 Kano 模型

随着日本品质管理研究被译介到欧美，Kano 模型进入西方学术视野。美国质量协会（ASQ）开始将其纳入质量功能展开（QFD）方法体系，应用范围从制造业扩展至服务业。

2001

软件产品管理领域引入 Kano 模型

随着敏捷开发兴起，产品经理面临功能优先级压力，Kano 模型被引入软件产品规划。其问卷方法与用户研究流程天然契合，迅速在 Silicon Valley 产品团队中流行。

2015

与 Net Promoter Score 结合使用

数据驱动产品管理时代，Kano 分析与 NPS 调研结合，帮助团队不仅知道用户满不满意，还能知道哪类功能对推荐意愿贡献最大。成为产品增长工具箱的核心组件。

04 真实案例

Spotify Premium 功能优先级决策
-----------------------

Spotify 在规划 Premium 功能路线图时，面对超过 60 个候选功能需要取舍。产品团队对近 3000 名用户进行了 Kano 问卷调查，将功能分入三个象限，最终得出了一个反直觉的结论：用户最期待的功能，不是技术上最复杂的那些。

Spotify

音乐流媒体 · Kano 问卷驱动的 Premium 功能优先级

2019–2020

Kano 问卷逻辑

Kano 问卷对每个功能问两个问题：  
· **正向：**「如果产品有这个功能，你的感受是？」  
· **反向：**「如果产品没有这个功能，你的感受是？」  
答案组合决定功能类型。

必备型 Must-be

没有 = 不满意，有 = 理所当然

离线下载  
有此功能是基本，没有则流失

无广告播放  
Premium 核心承诺

跨设备同步播放进度

音质选择选项

期望型 Performance

越多越好，线性满意度

音频质量提升  
320kbps → lossless

下载数量上限  
5000 → 10000 首

推荐算法精准度

播客订阅管理

惊喜型 Delighters

有 = 惊喜，没有 = 无感

AI DJ 功能  
基于心情自动生成播放列表

歌词实时同步  
已上线，反响超预期

朋友正在听  
社交可见性

音乐会提前通知 + 购票入口

分析结论 · Priority Decision

❌

团队原本计划优先投入：**高清音频**（期望型，但调查显示改善幅度有限，用户感知差异不明显）

✅

实际调整后优先：**离线下载稳定性**（必备型失分——很多用户因下载失败流失）+ **歌词同步**（惊喜型，成本低但情感价值极高）

结果：重新排序后的版本上线 6 个月，Premium 续订率提升 11%

05 使用步骤

五步完成一次 Kano 分析
--------------

Kano 分析的核心是标准化问卷：针对每个功能，同时问「有这个功能你感觉如何」和「没有这个功能你感觉如何」，通过两个问题的组合来确定功能类别。

01

收集待评估功能

从产品 backlog 中选出 10–20 个候选功能，每个功能用一句话清晰描述用户可感知的价值。

›

02

设计 Kano 问卷

对每个功能设计正向问题（有这个功能如何？）和反向问题（没有这个功能如何？），答案选项：喜欢/理应如此/无所谓/勉强接受/不喜欢。

›

03

统计用户反馈

收集至少 30 份有效问卷（细分市场可分别统计），用 Kano 评估矩阵将正反两题答案组合，确定每条反馈对应的功能类别。

›

04

绘制分类矩阵

对每个功能统计各类别的比例，取最高频率作为该功能的 Kano 类别。制作功能分类总览图，按必备/期望/魅力排列。

›

05

制定差异化策略

必备型：保证不出问题；期望型：与竞品比较后决定投入度；魅力型：作为差异化亮点重点打磨。

✓ 这样做

→对不同细分用户群分别做 Kano 问卷，类别因人而异

→定期重做分析，魅力型功能会随时间退化为必备型

→结合满意度系数（Better/Worse）计算功能优先级分数

→问卷中用具体场景描述功能，避免抽象的技术描述

✗ 避免这些

→不要把 Kano 结果当唯一决策依据，结合开发成本评估

→不要用内部讨论替代真实问卷，团队直觉往往偏向魅力型

→不要问卷样本太少，少于 30 份结果容易失真

→不要忽视「无差异型」功能——那是你可以砍掉节省资源的机会

配合使用

与这些工具搭配效果更好
-----------

[用户访谈五问法 — 上游输入：访谈验证需求分类的用户感知假设 →](framework-user-interview-five-questions.html) [RICE 优先级模型 — 下游承接：将需求类别转化为可量化优先级 →](framework-rice.html) [MoSCoW 方法 — 同类比较：更直观的必须与可选分层方式 →](framework-moscow.html) [需求优先级四象限 — 下游承接：将满意度分层映射到优先级矩阵 →](framework-priority-quadrant.html) [精益画布 — 下游承接：将核心需求洞察纳入商业模型验证 →](framework-lean-canvas.html)

继续阅读下一个 →

pmframe.works · © 2026

(function(){ var slug='kano-model'; // Inject hero SVG var svgEl=document.getElementById('hero-svg'); if(svgEl&&typeof MODAL\_SVGS!=='undefined'&&MODAL\_SVGS\[slug\]){ svgEl.innerHTML=MODAL\_SVGS\[slug\]; } // Fill meta-inline from MODAL\_META if empty var mi=document.querySelector('.meta-inline'); if(mi&&!mi.querySelector('.m-item')&&typeof MODAL\_META!=='undefined'&&MODAL\_META\[slug\]){ var m=MODAL\_META\[slug\]; var fields=\[\['提出者',m.by\],\['类型',m.type\],\['适合',m.fit\],\['年份',m.year\]\]; mi.insertAdjacentHTML('afterbegin',fields.filter(function(f){return f\[1\];}).map(function(f){ return '<div class="m-item"><span class="m-label">'+f\[0\]+'</span><span class="m-value">'+f\[1\]+'</span></div>'; }).join('')); } // Favorites var favBtn=document.getElementById('nav-fav-btn'); if(favBtn&&typeof isFav==='function'){ function updateFavBtn(){ var f=isFav(slug); favBtn.className='nav-fav-btn'+(f?' is-fav':''); favBtn.textContent=f?'\\u2605 \\u5df2\\u6536\\u85cf':'\\u2606 \\u6536\\u85cf'; } favBtn.onclick=function(){toggleFav(slug);updateFavBtn();}; updateFavBtn(); } })();