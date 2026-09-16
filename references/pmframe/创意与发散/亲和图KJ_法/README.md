[← 返回框架列表](index.html)

用户洞察 · #09

Framework Deep Dive

亲和图  
_KJ 法_
============

混乱不是问题，混乱是原材料。把一切写下来，贴上去，然后让规律自己浮现。

提出者川喜田二郎（Jiro Kawakita）

来源1960年代人类学田野调查方法

适合阶段定性研究整理 · 团队洞察对齐

使用时长小组练习 2–3 小时 · 大规模 半天–全天

[下载 Skill](skills/affinity-diagram.md)

01 它解决什么问题

什么时候该用它？
--------

亲和图最适合在大量定性数据面前「不知从哪里下手」的时刻。它是一种集体智慧的提炼工具，通过分组聚类让隐藏在混乱信息中的规律自然浮现。

🗂️

用户访谈数据整理

将数十份访谈中的关键引述、观察和痛点逐条写出，通过聚类发现主题规律。

🧠

头脑风暴后归纳

头脑风暴产生大量想法后，用亲和图将相似的想法聚在一起，提炼核心方向。

🤝

团队共识建立

跨职能团队对同一问题有不同理解时，共同参与亲和图过程可建立共同心智模型。

📞

客服反馈分类

将数百条用户投诉或反馈进行主题聚类，发现高频问题类别，指导优先级决策。

🔍

产品问题聚类

将 bug 报告、用户反馈、内部问题清单按根因归类，发现系统性问题区域。

🏛️

跨部门知识整合

来自不同部门的隐性知识通过亲和图被组织化，转化为可共享的团队资产。

02 框架结构

一块白板，无数便利贴
----------

亲和图的物质形态极其简单：白板 + 便利贴。但其背后是一套严格的认知过程——先发散、后归类、再命名，每一步都有其不可简化的必要性。

.affinity-wrap { margin-top: 40px; } .affinity-board { position: relative; background: #f0ede4; border-radius: 12px; border: 2px solid var(--line); padding: 32px 24px 28px; min-height: 440px; overflow: hidden; max-width: 840px; } .affinity-board-label { position: absolute; top: 12px; left: 16px; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink3); } /\* Cluster groups \*/ .affinity-clusters { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 8px; } .affinity-cluster { border: 2px dashed rgba(0,0,0,0.15); border-radius: 8px; padding: 12px 10px 14px; display: flex; flex-direction: column; gap: 8px; } .cluster-rose { border-color: rgba(var(--rose-rgb),0.3); background: rgba(var(--rose-light-rgb),0.4); } .cluster-teal { border-color: rgba(var(--teal-rgb),0.3); background: rgba(var(--teal-light-rgb),0.4); } .cluster-amber { border-color: rgba(var(--amber-rgb),0.3); background: rgba(var(--amber-light-rgb),0.4); } .cluster-gray { border-color: rgba(138,135,128,0.3); background: rgba(232,229,222,0.4); } .cluster-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; margin-bottom: 4px; padding: 4px 8px; border-radius: 4px; display: inline-block; align-self: flex-start; } .cl-rose { background: var(--rose-light); color: var(--rose); } .cl-teal { background: var(--teal-light); color: var(--teal); } .cl-amber { background: var(--amber-light); color: var(--amber); } .cl-gray { background: var(--paper3); color: var(--ink3); } /\* Sticky notes \*/ .sticky { padding: 8px 10px; border-radius: 3px; font-size: 11px; line-height: 1.45; color: var(--ink); box-shadow: 1px 2px 4px rgba(0,0,0,0.12); font-weight: 500; } .sticky-rose { background: #f9d0cc; } .sticky-rose2 { background: #f5bcb6; } .sticky-teal { background: #c2e8df; } .sticky-teal2 { background: #aaddd2; } .sticky-amber { background: #f7df9a; } .sticky-amber2 { background: #f2d070; } .sticky-gray { background: #dedad2; }

亲和图看板（Affinity Board）

用户痛点

等了20分钟还没来

根本不知道能叫车

定位老是不准确

高峰期叫不到车

使用场景

上下班通勤必备

深夜回家最放心

出差接机用得多

喝酒后代驾替代

功能诉求

希望能提前预约

想看司机评分

发票要能自动生成

拼车更便宜就好了

待归类

司机态度有好有坏

车内广播太吵了

亲和图的三个阶段

01 · 发散

每条写便利贴

一条数据一张贴，不评判不筛选，越多越好。保持沉默，独立进行。

02 · 聚类

无声移动便利贴

全程保持沉默，靠直觉将相似的贴放在一起。可以打破他人的归类。

03 · 命名

为每组命名讨论

聚类稳定后，为每个组写一个代表性标题，命名即是洞察的提炼。

03 来源与历史

从人类学田野到数字白板的跨越
--------------

亲和图诞生于一位日本人类学家整理田野笔记的实际需求，经历了从纸质便利贴到数字协作工具的演变，始终是团队意义建构最有效的视觉思维工具之一。

1960s

川喜田二郎田野调查方法

日本人类学家川喜田二郎（Jiro Kawakita）在尼泊尔田野调查中面对海量杂乱笔记，发展出将数据聚类整理的方法，初步建立了亲和图的核心思想。

1967

KJ 法正式命名出版

川喜田二郎出版《发想法》，将方法以其姓名缩写命名为「KJ 法」，并系统阐述了从数据收集、聚类到命名的完整流程。此书在日本企业界引发广泛关注，推动质量管理界大量采用。

1986

引入软件工程与质量管理领域

随着全面质量管理（TQM）在欧美推广，KJ 法被引入软件工程和产品质量管理。它被纳入「七种新质量工具」体系，成为团队头脑风暴结果整理的标准方法之一。

2000s

成为 UX 研究标配工具

随着用户体验研究专业化，亲和图成为整理定性研究数据的标准方法。IDEO、尼尔森·诺曼集团等机构在其方法论体系中将亲和图列为基础技能，配合用户访谈、情境调研系统使用。

2020

Miro 等工具数字化亲和图

疫情推动远程工作，Miro、FigJam、MURAL 等协作工具推出数字便利贴功能，支持分布式团队实时共建亲和图。数字化亲和图还可连接研究数据库、自动分类标签，与 AI 辅助洞察工具集成。

04 真实案例

IDEO — 急诊室体验重设计
---------------

IDEO 受美国医疗机构 Kaiser Permanente 委托，改善急诊室的患者体验。研究团队在 4 家医院进行了密集的田野调查，收集了超过 800 条患者、护士、医生的原始观察记录。面对如此庞大的定性数据，他们运用亲和图法将混沌信息转化为可操作的洞察。

IDEO × Kaiser Permanente

医疗体验设计 · 急诊室患者体验研究

2008

第一步：原始数据——800+ 条田野观察便利贴（部分示例）

护士平均每班走 5 英里，大部分时间在找设备

患者不知道自己排在急诊队列的第几位

家属找不到等候区，在走廊焦虑站立

医生在 3 个不同系统里记录同一患者信息

护士交接班时口头传达，信息经常遗漏

患者觉得被遗忘——没人告诉他们进展

药品柜位置随机，不同班次的护士记忆不同

入院流程需要患者反复回答相同问题

急诊推车堵在走廊，影响患者被及时转移

夜班护士人手不足时，响铃 30 秒才被响应

医生和护士使用不同的患者状态术语

患者家属希望知道治疗进展但不敢打扰

亲和图聚类 → 主题涌现

信息不透明

患者、家属、医护人员之间的信息断层

患者不知道排队位置 · 家属无法获知进展 · 交接班信息遗漏

流程低效

重复操作与多系统信息孤岛

多系统重复录入 · 患者反复回答相同问题 · 医生护士术语不统一

物理环境障碍

空间与设备设计制约护理效率

护士每班走 5 英里找设备 · 推车堵塞走廊 · 药品柜位置随机

情感忽视

患者与家属的情绪需求未被系统考虑

患者感觉被遗忘 · 家属焦虑无处安置 · 不敢打扰医生

洞察 → 行动转化

→ **信息不透明** → 设计「状态展示屏」，实时显示患者所在阶段

→ **流程低效** → 引入统一数字记录系统，消除多次重复录入

→ **物理障碍** → 重新规划护理站布局，常用设备集中就近放置

→ **情感忽视** → 增设「患者沟通专员」角色，专职更新患者/家属状态

**实施结果：**患者满意度评分提升 18%，护士每班步行距离减少 29%，入院信息采集时间从 40 分钟降至 17 分钟。

05 使用步骤

五步从混乱到洞察
--------

亲和图的执行有一个反直觉的规则：聚类过程必须保持沉默。沉默排除了权力和口才的干扰，让数据本身说话，让规律自然浮现。

01

收集原始数据

整理访谈记录、用户反馈、观察笔记等原始数据。每条数据应是一个具体的事实或引述，而非已经被概括的结论。

›

02

每条写便利贴

将每条数据写在独立的便利贴上，每张只写一条。语言要具体，避免抽象概括。全组成员独立完成，不相互商量。

›

03

静默分组聚类

全程保持沉默，将所有便利贴贴到白板上，靠直觉移动相似的贴。任何人都可以移动任何贴，过程中不讨论。

›

04

为每组命名

当分组趋于稳定，打破沉默，共同为每个组讨论并写下一个代表性标题。命名过程往往是最有价值的讨论时刻。

›

05

输出核心洞察

将命名后的各组转化为洞察陈述，排列优先级，识别哪些主题最关键，作为后续设计或决策的输入。

✓ 这样做

→严格执行「沉默聚类」规则，防止资深成员主导分组

→允许便利贴同时属于多个组（可复制），不要强行二选一

→保留「未分类」区域，不要强行把每条贴都归组

→拍照保存每个阶段的看板状态，聚类过程本身也有价值

✗ 避免这些

→不要在聚类之前就预设分类框架，那会变成填空练习

→不要让一个人单独完成所有便利贴，失去多元视角

→不要在命名阶段匆忙，组名质量决定洞察深度

→不要只做一层聚类，大组可以继续细分出子主题

配合使用

与这些工具搭配效果更好
-----------

[情境调查法 — 上游输入：现场观察提供归类所需的原始数据 →](framework-contextual-inquiry.html) [同理心地图 — 下游承接：将归类主题转化为用户情感认知 →](framework-empathy-map.html) [HMW 问题框架 — 下游承接：将归类痛点转化为设计机会问题 →](framework-hmw.html) [用户访谈五问法 — 上游输入：确认访谈需深入探索的问题主题 →](framework-user-interview-five-questions.html) [机会解决方案树 — 下游承接：将归类机会点映射到解决方案树 →](framework-opportunity-solution-tree.html)

继续阅读下一个 →

pmframe.works · © 2026

(function(){ var slug='affinity-diagram'; // Inject hero SVG var svgEl=document.getElementById('hero-svg'); if(svgEl&&typeof MODAL\_SVGS!=='undefined'&&MODAL\_SVGS\[slug\]){ svgEl.innerHTML=MODAL\_SVGS\[slug\]; } // Fill meta-inline from MODAL\_META if empty var mi=document.querySelector('.meta-inline'); if(mi&&!mi.querySelector('.m-item')&&typeof MODAL\_META!=='undefined'&&MODAL\_META\[slug\]){ var m=MODAL\_META\[slug\]; var fields=\[\['提出者',m.by\],\['类型',m.type\],\['适合',m.fit\],\['年份',m.year\]\]; mi.insertAdjacentHTML('afterbegin',fields.filter(function(f){return f\[1\];}).map(function(f){ return '<div class="m-item"><span class="m-label">'+f\[0\]+'</span><span class="m-value">'+f\[1\]+'</span></div>'; }).join('')); } // Favorites var favBtn=document.getElementById('nav-fav-btn'); if(favBtn&&typeof isFav==='function'){ function updateFavBtn(){ var f=isFav(slug); favBtn.className='nav-fav-btn'+(f?' is-fav':''); favBtn.textContent=f?'\\u2605 \\u5df2\\u6536\\u85cf':'\\u2606 \\u6536\\u85cf'; } favBtn.onclick=function(){toggleFav(slug);updateFavBtn();}; updateFavBtn(); } })();