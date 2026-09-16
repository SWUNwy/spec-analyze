[← 返回框架列表](index.html)

用户洞察 · #08

Framework Deep Dive

情境  
_调研_
=========

走进用户的世界，而不是把他们带到你的会议室。真实场景里发生的，才是设计真正的原材料。

提出者Hugh Beyer & Karen Holtzblatt

来源1993年论文 · 1998年《Contextual Design》

适合阶段产品早期定义期 · 深度用户研究

使用时长单次调研 2–4 小时 · 系列 1–2 周

[下载 Skill](skills/contextual-inquiry.md)

01 它解决什么问题

什么时候该用它？
--------

情境调研特别适合那些「用户说的」与「用户做的」差距很大的领域——复杂工作流、专业工具、日常习惯性行为。当问卷和访谈无法捕捉真实使用模式时，情境调研是最有力的答案。

🔧

复杂工作流理解

当用户工作涉及多步骤、多工具协作，在真实工作环境中观察远比访谈更能揭示隐性流程。

🏢

B2B 企业软件

企业用户的实际使用方式往往与理想路径相差甚远，情境调研能发现"变通方案"和非官方工作流。

🏥

医疗健康产品

医疗场景中的细节决策、信息流转和环境因素，只有在真实临床或家庭环境中才能被完整记录。

👶

儿童/老人产品

这两类用户难以准确表达自身需求，通过观察其自然使用行为获取设计洞察是最有效的方式。

🔨

硬件与环境设计

物理产品的使用受环境约束极大，观察用户在真实空间中的行为是不可替代的研究手段。

🌍

跨文化产品设计

不同文化背景的用户有独特的使用习惯与隐性规则，只有进入其日常环境才能理解这些差异。

02 框架结构

师徒关系与四大原则
---------

情境调研的核心隐喻是「师徒关系」：用户是师傅，研究员是学徒。学徒在师傅的工作现场学习，而不是把师傅请到教室讲课。这一关系奠定了整个方法的基本姿态。

.ci-wrap { margin-top: 40px; } .ci-diagram { display: flex; align-items: center; gap: 40px; padding: 40px; background: var(--paper2); border-radius: 12px; border: 1px solid var(--line); max-width: 760px; } .ci-figure { display: flex; flex-direction: column; align-items: center; gap: 12px; flex: 1; } .ci-avatar { border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; border: 2px solid var(--line); } .ci-avatar-user { width: 80px; height: 80px; background: var(--teal-light); border-color: var(--teal); font-size: 32px; } .ci-avatar-res { width: 60px; height: 60px; background: var(--amber-light); border-color: var(--amber); font-size: 24px; } .ci-fig-label { font-family: 'Fraunces', serif; font-size: 15px; font-weight: 400; color: var(--ink); text-align: center; } .ci-fig-sub { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--ink3); letter-spacing: 0.08em; text-align: center; } .ci-relationship { display: flex; flex-direction: column; align-items: center; gap: 6px; flex-shrink: 0; } .ci-rel-line { width: 60px; height: 2px; background: linear-gradient(to right, var(--teal), var(--amber)); } .ci-rel-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--ink3); letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap; } /\* Four principles \*/ .ci-principles { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-top: 24px; max-width: 760px; } .ci-principle { padding: 16px; border: 1px solid var(--line); border-radius: 8px; background: var(--paper); } .ci-principle-icon { font-size: 20px; margin-bottom: 8px; } .ci-principle-en { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.08em; color: var(--amber); margin-bottom: 4px; text-transform: uppercase; } .ci-principle-zh { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 6px; } .ci-principle-desc { font-size: 11px; color: var(--ink3); line-height: 1.55; } /\* Four models 2x2 \*/ .ci-models { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-top: 32px; max-width: 760px; } .ci-model { padding: 16px; border-radius: 8px; text-align: center; } .ci-model-seq { background: var(--teal-light); border: 1px solid var(--teal-mid); } .ci-model-cul { background: var(--amber-light); border: 1px solid var(--amber-mid); } .ci-model-flo { background: var(--rose-light); border: 1px solid var(--rose-mid); } .ci-model-phy { background: var(--paper2); border: 1px solid var(--line); } .ci-model-icon { font-size: 24px; margin-bottom: 8px; } .ci-model-name { font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 4px; } .ci-model-desc { font-size: 11px; color: var(--ink2); line-height: 1.5; } .ci-models-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink3); margin-top: 32px; margin-bottom: 12px; }

👩‍💼

用户（师傅）

在真实工作场景中  
展示实际使用方式

师徒关系

🔍

研究员（学徒）

观察、提问、记录  
不打断用户工作节奏

📍

Context

情境

在用户真实工作或生活环境中进行，不在实验室或会议室。

🤝

Partnership

伙伴关系

研究员与用户共同探索，不是单向的观察者与被观察者关系。

💬

Interpretation

诠释

研究员的解读要当场与用户确认，避免私自假设行为含义。

🎯

Focus

聚焦

带着研究目标进入，不漫无目的地观察，有意识地引导调研深度。

情境调研产出的四大数据模型

➡️

顺序模型

记录用户完成任务的步骤顺序与触发条件

🌐

文化模型

揭示影响用户行为的组织规范、价值观与隐性规则

🔄

流程模型

描述信息、工件和责任在人与人之间如何流转

🗂️

物理模型

记录用户工作环境的物理空间布局与工具摆放

03 来源与历史

从人类学田野调查到用户研究方法
---------------

情境调研的根源在于社会学家 Lucy Suchman 对「计划与情境行动」的研究，由 Beyer 和 Holtzblatt 在工业界实践中转化为系统化的 UX 研究方法。

1985

Lucy Suchman《Plans and Situated Actions》

施乐 PARC 研究员 Lucy Suchman 的博士研究发现：人类实际行动很少按预设计划进行，而是随情境即时适应。这一发现颠覆了当时 AI 与 HCI 领域对用户行为的假设，成为情境调研的理论基础。

1988

Beyer & Holtzblatt 在 DEC 公司实践

Hugh Beyer 和 Karen Holtzblatt 在数字设备公司（DEC）软件开发项目中首次系统实践情境调研，将人类学田野方法引入产品设计流程，发展出可操作的研究协议与数据记录规范。

1993

ACM SIGCHI 论文正式发表

Beyer 和 Holtzblatt 在人机交互顶级会议 CHI 发表情境调研方法论论文，为学术界和工业界提供了可复制的方法框架，引发广泛关注，标志着 CI 作为独立方法的确立。

1998

《Contextual Design》出版

Beyer 和 Holtzblatt 出版完整方法论书籍，将情境调研嵌入更大的「情境设计」体系中，涵盖从调研到设计的完整流程，成为 UX 领域经典教材。2017 年出版更新版，加入敏捷与移动时代内容。

2010

Agile CI 快速版本兴起

随着敏捷开发普及，传统情境调研耗时长的问题引发改良需求。Rapid CI、Flash Studies 等快速版本出现，将单次调研压缩到 1–2 小时，并发展出远程情境调研方法，适应分布式团队需求。

04 真实案例

Microsoft — Office 2003 可用性危机研究
-------------------------------

随着 Office 功能越来越多，微软发现用户花大量时间在菜单里找功能，满意度持续下滑。传统的实验室测试无法复现真正的工作场景。微软于是派出研究人员深入用户的真实办公环境，进行了为期 6 个月的情境调研，最终诞生了 Office 2007 的 Ribbon 界面革命。

Microsoft Office

企业生产力软件 · Office 2003 可用性情境调研

2003–2004

研究配置

研究持续时长 6 个月（2003年9月–2004年3月）

访问用户数量 238 名真实办公场景用户（非实验室招募）

研究员角色 师徒关系——研究员作为「学徒」向用户「学习」如何工作

覆盖场景 律师事务所、会计师事务所、医院行政、中小学教室、新闻编辑室

观察①

功能使用分布极度不均

"238 名用户中，超过 90% 的实际操作只使用了 Office 所有功能的 5% 以下。大量功能从未被触达，但用户反复抱怨'找不到某个功能'。"

观察②

工具栏被个人定制到无法辨认

"用户会把最常用功能拖入工具栏，导致每个人的界面完全不同。新来的实习生或接手他人电脑时，完全不知道如何操作。"

观察③

'我知道有这个功能但找不到'是高频行为

"研究员记录了超过 4000 次'功能寻找失败'事件。用户通常会放弃并用低效替代方式完成任务，而不是继续搜索。"

观察④

帮助文档几乎从不被使用

"只有 3% 的用户在遇到困难时选择查看帮助文档。97% 的人要么放弃、要么问同事、要么用错误方式完成任务。"

传统实验室测试结论

用户能完成基本任务

帮助文档被使用

功能满意度尚可

情境调研发现的真相

用户通过记住菜单位置完成，换了版本立即失效

帮助文档在真实压力下从不使用

真实场景下大量功能根本无法被发现

设计影响

这次情境调研的发现驱动了 Office 2007 最大的一次界面革命——**Ribbon（功能区）**的诞生。Ribbon 将所有功能按任务场景分组展示，消除了"功能隐藏在深层菜单"的核心问题。上线后，首月用户的**功能发现率提升 3 倍**，「找不到功能」的支持工单减少 60%。

05 使用步骤

五步完成一次情境调研
----------

情境调研不是简单的「去用户家里看看」，它需要系统化的准备、有技巧的观察与访谈，以及严格的数据整理流程。研究质量高度依赖研究员的现场判断力。

01

选择典型用户

针对研究目标选择 8–12 名代表性用户，涵盖核心场景。确保用户在调研期间有实际工作/使用任务可观察。

›

02

进入真实场景

前往用户的工作或生活环境。提前说明研究目的和保密承诺，建立信任，让用户以正常方式工作。

›

03

观察与同步访谈

用「边做边说」的方式请用户解释其行为。在关键时刻提问：「你刚才为什么这么做？」「这步骤你怎么判断的？」

›

04

记录关键行为

用笔记、录音（需授权）记录观察到的行为、用户的解释、工作工件（文件/便签/工具）和环境细节。

›

05

提炼行为洞察

将多次调研数据进行整合分析，绘制顺序模型、流程模型等，提炼出可指导设计的行为洞察与设计机会。

✓ 这样做

→带着好奇心进入，不带任何「我知道用户需要什么」的预设

→当用户说「我一般都会……」，追问「你能现在演示给我看吗？」

→记录工作工件（便签、打印件、自制模板），它们是隐性需求的外化

→调研后 24 小时内完成笔记整理，记忆细节会快速消退

✗ 避免这些

→不要打断用户的工作节奏，观察优先于访谈

→不要问「你觉得理想的功能是什么」——用户会说梦话而非真实需求

→不要只在顺利的时候观察，故障、出错、变通方案才是金矿

→不要独自进行调研，双人组合（一人观察一人记录）效果更好

配合使用

与这些工具搭配效果更好
-----------

[日记研究法 — 互补使用：日记法捕捉单次观察无法覆盖的行为 →](framework-diary-study.html) [亲和图（KJ 法） — 下游承接：将现场观察数据聚类提炼洞察 →](framework-affinity-diagram.html) [同理心地图 — 下游承接：将情境观察转化为用户共情理解 →](framework-empathy-map.html) [用户访谈五问法 — 互补使用：访谈深挖观察中发现的行为动机 →](framework-user-interview-five-questions.html)

继续阅读下一个 →

pmframe.works · © 2026

(function(){ var slug='contextual-inquiry'; // Inject hero SVG var svgEl=document.getElementById('hero-svg'); if(svgEl&&typeof MODAL\_SVGS!=='undefined'&&MODAL\_SVGS\[slug\]){ svgEl.innerHTML=MODAL\_SVGS\[slug\]; } // Fill meta-inline from MODAL\_META if empty var mi=document.querySelector('.meta-inline'); if(mi&&!mi.querySelector('.m-item')&&typeof MODAL\_META!=='undefined'&&MODAL\_META\[slug\]){ var m=MODAL\_META\[slug\]; var fields=\[\['提出者',m.by\],\['类型',m.type\],\['适合',m.fit\],\['年份',m.year\]\]; mi.insertAdjacentHTML('afterbegin',fields.filter(function(f){return f\[1\];}).map(function(f){ return '<div class="m-item"><span class="m-label">'+f\[0\]+'</span><span class="m-value">'+f\[1\]+'</span></div>'; }).join('')); } // Favorites var favBtn=document.getElementById('nav-fav-btn'); if(favBtn&&typeof isFav==='function'){ function updateFavBtn(){ var f=isFav(slug); favBtn.className='nav-fav-btn'+(f?' is-fav':''); favBtn.textContent=f?'\\u2605 \\u5df2\\u6536\\u85cf':'\\u2606 \\u6536\\u85cf'; } favBtn.onclick=function(){toggleFav(slug);updateFavBtn();}; updateFavBtn(); } })();