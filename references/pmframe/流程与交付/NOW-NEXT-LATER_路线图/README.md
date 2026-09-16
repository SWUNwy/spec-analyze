[← 返回框架列表](index.html)

#50 · 执行落地

Framework Deep Dive

NOW-NEXT-LATER _路线图_
====================

抛弃充满虚假精确性的季度时间轴，把工作分成三个桶：正在做、接下来做、以后可能做。越往后，越用结果描述，而非功能。这是路线图的诚实革命。

[下载 Skill](skills/now-next-later.md)

01 它解决什么问题

日期驱动的路线图为什么总是错的？
----------------

传统的季度路线图有一个根本性的谎言：它假装我们能够准确预测 6 个月后要交付的功能。这种假装带来的不是确定性，而是一系列代价高昂的后果。

当功能没有按期交付，外部关系（销售、客户、管理层）立刻破裂——「你们为什么没做到承诺的事？」产品团队陷入防御状态，大量时间用于解释延期而非解决真正的问题。更糟糕的是，为了赶上日期，团队往往交付半成品，或者把不该做的事情硬塞进去。

Janna Bastow 在 2014 年的核心洞察是：**问题不在于团队执行力，而在于路线图格式本身制造了虚假精确性。**NOW-NEXT-LATER 用「相对顺序」替代「绝对日期」，承认不确定性而不是掩盖它。

02 框架结构

三个桶，递减的细节，递减的信心
---------------

框架的核心原则：离当下越远，描述越模糊，这是对真实不确定性的诚实表达，而非懈怠。

NOW

高信心 ↑↑↑

重写 onboarding 流程

拆解为 7 个子任务，已完成 3 个。预计 3 周。负责人：Lisa。

任务级别

修复搜索性能问题

P1 bug，影响 15% 用户。正在排查索引优化方向。

任务级别

团队协作通知系统

需求已冻结，设计已 sign off，进入开发第二周。

任务级别

NEXT

中等信心 ↑↑

移动端 App（iOS 优先）

方向已确认，技术方案评估中。依赖 NOW 的 API 重构完成。

功能级别

高级权限管理

企业客户高频需求，已有初步设计草稿。

功能级别

数据导出功能

合规要求驱动，范围待进一步定义。

功能级别

LATER

低信心 ↑

提升团队协作效率

用户反馈跨部门协作摩擦大。具体方案待用户研究确认。

结果描述

降低新用户流失率

14 天留存率低于基准。是否做 onboarding 优化还是功能简化，尚未决定。

结果描述

进入东南亚市场

战略方向之一。本地化需求、定价策略均需研究。

结果描述

信心度曲线

高信心

NOW

中等信心

NEXT

低信心

LATER

注意 LATER 列：用「提升团队协作效率」而非「构建 Slack 集成」。这是 NOW-NEXT-LATER 最关键的创新——**LATER 用结果描述，不绑定解决方案**，为未来的探索保留空间。

03 适用场景

什么时候该用它？
--------

任何需要向外部沟通产品方向，又不想被日期绑架的场景，都是 NOW-NEXT-LATER 的主场。

📅

替代季度时间轴路线图

当你的日期路线图反复让销售团队或客户失望，是时候切换到不承诺日期的格式了。

🤝

向客户和销售沟通方向

客户想要的不是日期，是信心。NOW-NEXT-LATER 诚实地传递「我们知道在做什么」，而非「我们保证什么时候交付」。

🏢

向管理层汇报优先级

把对话从「为什么 X 功能延期了」转移到「下一个最有价值的事是什么」，重塑与管理层的沟通框架。

🌱

早期产品阶段规划

当方向还在快速变化，精确的时间轴不仅无用还有害。NOW-NEXT-LATER 允许你随时更新优先级而不违约。

🔄

季度规划会议

季度末，把 NEXT 升级为 NOW，把 LATER 重新评估，用不到半天完成规划更新，而非耗时数周的 roadmap 谈判。

🧭

跨团队对齐工作优先级

设计、工程、市场、客成都能看懂 NOW-NEXT-LATER，不需要理解甘特图或 JIRA Epic 也能对齐方向。

04 真实案例

Intercom 的路线图革命  
（2017）
------------------------

2017 年，Intercom（客户沟通平台）公开撰文记录了他们从日期驱动路线图切换到 NOW-NEXT-LATER 格式的全过程。这是产品管理社区讨论最多的路线图案例之一。

Intercom 的旧体系是典型的季度日期路线图。每个 Q 开始，产品和工程花大量时间谈判哪些功能放入哪个季度。每当功能延期（几乎总会延期），客户和销售就会问「为什么 X 功能没有按时上线？」整个团队陷入解释和防御的死循环。

Intercom

从日期路线图切换到 NOW-NEXT-LATER · 2017 年

2017

💡

核心发现

「移除日期之后，对话从『为什么 X 延期了？』变成了『什么是现在最有价值的事？』」

格式的改变，带来的是对话质量的根本性改变

✓

切换后的具体成果

→

季度规划所需时间**减少 60%**——停止了无休止的日期谈判

→

销售团队和客户的「功能延期投诉」大幅减少，因为承诺框架变了

→

LATER 列里有若干功能最终从未被构建——**这被认为是成功，不是失败**——因为省下了构建错误东西的资源

📋

Buffer 的类似转变

→

Buffer（社交媒体工具）也公开分享了类似转变，指出日期路线图制造了「虚假精确性」

→

当日期滑落，**被损害的是信任**；而 NOW-NEXT-LATER 让他们可以诚实传达方向，不破坏信任

→

Buffer 的团队反馈：「终于可以专注于做对的事，而不是赶上承诺的日期。」

60%

季度规划时间减少（Intercom）

0个

LATER 中未构建的功能不是失败，是胜利

1个

格式改变带来对话质量的根本性转变

05 使用建议

避免 NOW-NEXT-LATER 失效的六个关键
-------------------------

NOW-NEXT-LATER 看起来简单，但有几个常见陷阱会让它退化成你试图逃离的旧路线图。

01

**NOW 列不能超过团队真正在做的事情。**如果把所有紧急事项都塞进 NOW，它就失去了聚焦的意义。NOW 应该代表「我们现在全力以赴在做的事」，不是「我们想快点做的事」。

02

**LATER 绝对不能加日期。**「2026 年 Q4 我们会做用户留存计划」——这句话出现就意味着你把 NOW-NEXT-LATER 变回了日期路线图。LATER 是方向，不是承诺。

03

**LATER 用结果描述，不用功能描述。**「提升用户留存率」而非「构建积分奖励系统」。功能是假设，结果是目标。写功能意味着你已经决定了解决方案，LATER 阶段不应该有这种确定性。

04

**定期清理 LATER，它不是积压列表。**每季度检查 LATER——删除已经不重要的条目，合并相似的方向。如果 LATER 越积越多，它就变成了 backlog 的别名，失去路线图的沟通价值。

05

**它是沟通工具，不是承诺文件。**明确告诉所有看到这个路线图的人：「这代表我们当前的优先级判断，会随着学习更新，不是任何功能的交付承诺。」开始就对齐期望，比事后解释便宜得多。

06

**至少每季度更新一次，否则会失去可信度。**过期的路线图比没有路线图更糟糕——它传递的信息是「我们不认真对待自己的规划」。每季度末花 2–4 小时，把 NEXT 升级为 NOW，重新评估 LATER。

06 来源与历史

打倒甘特图：Janna Bastow 如何用三列重新定义路线图
-------------------------------

NOW-NEXT-LATER 路线图由 ProdPad 联合创始人 Janna Bastow 于 2014 年前后正式提出，是对传统日期驱动路线图的直接反叛——它以战略方向而非具体交付日期组织产品工作，帮助团队在保持灵活性的同时清晰传达优先级。这套方法迅速成为结果导向产品团队的首选路线图格式，在敏捷和 OKR 文化盛行的组织中尤为流行。

2013

ProdPad 创立，Janna Bastow 开始探索替代路线图方案

Janna Bastow 与 Simon Cast 创立 ProdPad 时，发现市面上所有路线图工具都默认以时间线为轴，强迫团队对未来做出虚假的精确承诺。她开始系统思考"如果路线图不绑定日期，应该如何组织？"这一根本性问题。

2014

NOW-NEXT-LATER 框架首次公开发布

Bastow 在产品管理社区和 ProdPad 博客上首次系统阐述了 NOW-NEXT-LATER 三栏框架：NOW 表示当前冲刺聚焦的问题，NEXT 表示解决方案已明确的近期问题，LATER 表示方向正确但方案未定的远期机会。该框架将路线图从"承诺清单"重新定位为"战略沟通工具"。

2016–2018

Mind the Product 社区助推方法全球传播

Bastow 在 Mind the Product 伦敦大会及系列文章中深度分享 NOW-NEXT-LATER 实践，引发热烈反响。该框架因其与 OKR 体系的高度兼容性，迅速被欧美大量 SaaS 公司采纳，Intercom、Monzo 等知名产品团队公开表示受其影响。

2019

"基于问题的路线图"理念深化框架内涵

Bastow 进一步发展框架，强调路线图中每一项应填写"待解决的问题"而非"要构建的功能"，彻底区隔了战略路线图与交付计划的职责边界。这一细化使 NOW-NEXT-LATER 从排期工具升格为产品战略沟通的核心载体。

2021–至今

成为敏捷路线图主流格式，获主流工具原生支持

Productboard、Miro、Notion 等主流产品管理和协作工具相继内置 NOW-NEXT-LATER 模板，Atlassian 官方文档也将其列为推荐路线图格式之一。该框架在远程协作普及的背景下因可视化沟通的优势获得更广泛认可。

配合使用

与这些工具搭配效果更好
-----------

[用户故事地图 — 下游承接：将路线图阶段展开为详细用户故事 →](framework-user-story-map.html) [Shape Up — 互补使用：Shape Up规划具体周期内的交付范围 →](framework-shape-up.html) [OGSM 战略规划 — 上游对齐：确保路线图优先级与战略目标一致 →](framework-ogsm.html) [反向工作法 — 上游输入：从目标结果倒推路线图的规划逻辑 →](framework-working-backwards.html)

继续阅读下一个 →

pmframe.works · © 2026

(function(){ var slug='now-next-later'; // Inject hero SVG var svgEl=document.getElementById('hero-svg'); if(svgEl&&typeof MODAL\_SVGS!=='undefined'&&MODAL\_SVGS\[slug\]){ svgEl.innerHTML=MODAL\_SVGS\[slug\]; } // Fill meta-inline from MODAL\_META if empty var mi=document.querySelector('.meta-inline'); if(mi&&!mi.querySelector('.m-item')&&typeof MODAL\_META!=='undefined'&&MODAL\_META\[slug\]){ var m=MODAL\_META\[slug\]; var fields=\[\['提出者',m.by\],\['类型',m.type\],\['适合',m.fit\],\['年份',m.year\]\]; mi.insertAdjacentHTML('afterbegin',fields.filter(function(f){return f\[1\];}).map(function(f){ return '<div class="m-item"><span class="m-label">'+f\[0\]+'</span><span class="m-value">'+f\[1\]+'</span></div>'; }).join('')); } // Favorites var favBtn=document.getElementById('nav-fav-btn'); if(favBtn&&typeof isFav==='function'){ function updateFavBtn(){ var f=isFav(slug); favBtn.className='nav-fav-btn'+(f?' is-fav':''); favBtn.textContent=f?'\\u2605 \\u5df2\\u6536\\u85cf':'\\u2606 \\u6536\\u85cf'; } favBtn.onclick=function(){toggleFav(slug);updateFavBtn();}; updateFavBtn(); } })();