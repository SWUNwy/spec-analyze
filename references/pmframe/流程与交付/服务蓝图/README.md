[← 返回框架列表](index.html)

用户洞察 · #07

Framework Deep Dive

服务  
_蓝图_
=========

服务不只是前台。每一个用户看得见的瞬间，背后都有看不见的机器在运转。

提出者G. Lynn Shostack

来源1984年 HBR 文章《Designing Services That Deliver》

适合阶段服务设计期 · 流程优化期

使用时长跨部门工作坊 1–2 天 · 绘制 + 审查 3–5 天

[下载 Skill](skills/service-blueprint.md)

01 它解决什么问题

什么时候该用它？
--------

服务蓝图最适合那些用户旅程横跨多个触点、涉及前后台协作的场景。它能让隐性的服务流程变得可见，从而发现断点、冗余与优化机会。

🏗️

新服务设计

在新服务上线前，用蓝图规划前台体验与后台支撑，避免上线后出现协调盲区。

🔍

客户投诉根因分析

当用户反馈体验差，蓝图帮助追溯问题是出在接触点、后台流程还是支持系统。

📱

线上线下整合

O2O 场景中，蓝图明确数字触点与实体触点如何无缝衔接，防止体验断层。

⚡

服务交付效率优化

识别后台流程中的瓶颈、重复操作和等待时间，针对性地优化交付效率。

🤝

外包流程梳理

明确哪些环节由第三方承接，界定服务边界与责任归属，降低外包风险。

🔄

数字化转型规划

将现有服务蓝图中的人工流程标注出来，评估哪些环节适合自动化或数字化替代。

02 框架结构

五层泳道，拆解服务的完整系统
--------------

服务蓝图以「可见线」为界，将服务分为用户可见的前台层与用户看不见的后台层。五条泳道从上到下依次展示用户行为、前台接触、后台支撑和支持系统，形成完整的服务地图。

.sb-wrap { margin-top: 40px; overflow-x: auto; } .sb-table { width: 100%; min-width: 680px; border-collapse: collapse; font-size: 12px; border-radius: 10px; overflow: hidden; border: 1px solid var(--line); } .sb-table th { padding: 10px 12px; background: var(--ink); color: rgba(255,255,255,0.85); font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; text-align: center; border-right: 1px solid rgba(255,255,255,0.1); font-weight: 500; } .sb-table th:first-child { text-align: left; width: 110px; } .sb-table td { padding: 12px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); vertical-align: top; text-align: center; } .sb-table td:first-child { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.06em; font-weight: 500; text-align: left; padding-left: 14px; } .sb-row-user td { background: var(--teal-light); } .sb-row-user td:first-child { color: var(--teal); } .sb-row-front td { background: var(--paper); } .sb-row-front td:first-child { color: var(--ink2); } .sb-row-back td { background: var(--amber-light); } .sb-row-back td:first-child { color: var(--amber); } .sb-row-sys td { background: var(--paper2); } .sb-row-sys td:first-child { color: var(--ink3); } /\* Divider rows \*/ .sb-divider td { background: var(--paper3); border-top: 2px dashed var(--ink3); border-bottom: 2px dashed var(--ink3); padding: 4px 12px; text-align: left; } .sb-divider-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink3); } .sb-chip { display: inline-block; font-size: 11px; padding: 3px 8px; border-radius: 3px; margin: 2px; line-height: 1.4; } .chip-u { background: var(--teal-light); color: var(--teal); } .chip-f { background: var(--paper3); color: var(--ink2); } .chip-b { background: var(--amber-light); color: var(--amber); } .chip-s { background: var(--rose-light); color: var(--rose); }

服务泳道

预约

到达

点单

等待取单

离开

用户行为

手机 App 下单

到店取号

确认订单

等叫号

拿咖啡离开

前台接触

App 界面菜单展示

取号屏幕店员问候

收银台支付确认

叫号显示屏

产品交付道别

── 可见线（Line of Visibility）─────────────────────────────────────────

后台支撑

订单系统接收

排队算法

备料指令制作分配

咖啡师制作质检

库存更新

── 内部互动线（Line of Internal Interaction）───────────────────────────

支持系统

支付平台POS 系统

会员数据库

ERP 库存

设备维护供应链

数据分析

03 来源与历史

从金融服务到服务设计的通用语言
---------------

服务蓝图由银行家出身的 G. Lynn Shostack 发明，她意识到服务业缺少像工程图纸一样精确描述服务流程的工具，于是借鉴工业流程图，创造了这一至今仍在广泛使用的方法。

1982

Shostack 提出服务设计可视化理念

时任花旗银行副总裁的 G. Lynn Shostack 发现服务业长期缺乏系统化设计工具，开始研究如何将服务流程像工程图纸一样可视化，提出「服务蓝图」概念原型。

1984

HBR 论文《Designing Services That Deliver》发表

Shostack 在《哈佛商业评论》发表服务蓝图完整方法论，引发广泛关注。论文中以鞋子擦鞋服务为例，展示如何用蓝图拆解服务流程，揭示失败点与等待时间。

1992

Bitner 等人完善方法论

Mary Jo Bitner、Amy Ostrom 等学者系统完善了服务蓝图框架，增加了「可见线」与「内部互动线」的概念，使蓝图能够更精确地区分前台与后台，成为今天通用的标准形式。

2004

IDEO 将其纳入服务设计工具箱

设计咨询公司 IDEO 在服务创新实践中大量采用服务蓝图，并与用户旅程图结合使用，推动该工具从学术界走向设计实践社区，成为 HCD（以人为中心的设计）方法论的重要组件。

2018

数字化服务蓝图工具涌现

Miro、Lucidchart、Smaply 等协作工具推出专属服务蓝图模板，支持远程团队实时共绘。数字化服务设计时代，蓝图开始加入 API 调用、数据流等技术层，适应互联网产品需求。

04 真实案例

Marriott Hotels — 数字入住体验重设计
---------------------------

Marriott 推出手机钥匙（Mobile Key）功能后发现，尽管 App 下载量高，但实际使用率不足 30%。团队绘制了完整的服务蓝图，发现问题根本不在 App，而在后台系统与前台流程的多个断点。

Marriott Hotels

国际酒店集团 · Mobile Key 数字入住体验

2019

预订房间

抵达酒店

办理入住

入住期间

退房离开

用户行为

在 App 或网站选房下单

停车场走向大堂，掏出手机准备直接上楼

绕过前台直接乘电梯上楼（使用手机钥匙）

用手机开门、控制房间设施

App 上一键退房

前台接触点

预订确认邮件 + App 推送

大堂指示牌、前台接待员

无交互

房间内智能控制面板

退房确认推送

后台支撑

PMS 系统分配房间，生成数字钥匙令牌

门卫系统接收 App 信号

房间清洁状态需实时同步到 App

物联网设备状态监控

生成账单、关闭钥匙权限、触发客房清洁任务

支持系统

PMS + 身份验证 API

BLE 蓝牙门禁系统

客房管理系统 (HMS) + App 后端

IoT 平台 + 客服系统

PMS + billing 系统

痛点识别

数字钥匙提前 24h 才激活，但用户预订后立即期望有钥匙

信号不稳定，30% 用户在大堂门口刷卡失败，被迫去前台排队

客房未打扫完毕但钥匙已激活，用户到了房间才发现需要等

手机没电时完全无法进房，且无备用方案提示

退房后账单有时延迟 1 小时才到，用户以为出了问题

关键设计改进 — 蓝图绘制后发现 3 个关键断点

① 数字钥匙激活时机（预订→到达之间的 24h 空白）→ 改为「接近酒店 2km 自动激活」

② 蓝牙信号覆盖盲区 → 在大堂入口增设 4 个 BLE 信号放大器

③ 客房状态未实时同步 → 与 HMS 系统做双向 API 集成，钥匙仅在客房确认就绪后激活

结果 手机钥匙使用率从 28% 提升至 61%，前台等候时间减少 43%

05 使用步骤

五步绘制一张服务蓝图
----------

服务蓝图绘制应由跨职能团队共同参与——前台、后台、技术、运营缺一不可。单一视角绘制的蓝图往往遗漏关键支撑环节。

01

映射用户行为层

从用户旅程图出发，将用户的每个行为动作按时间顺序排列在最顶层，这是蓝图的骨架。

›

02

绘制前台接触点

在每个用户行为下方，列出用户能直接看到或感知到的服务元素：界面、人员、物理环境。

›

03

梳理后台支撑流程

划出可见线，在线下方列出支撑前台行为所需的后台操作：审批、备货、制作、物流等。

›

04

标注支持系统

画出内部互动线，在最底层列出支撑后台运作的系统与工具：ERP、数据库、第三方 API。

›

05

识别薄弱环节

标注失败点（X）、等待时间（⏱）和协调断点（⚡），为每个问题点制定改进行动。

✓ 这样做

→邀请前台与后台人员共同参与绘制，视角缺一不可

→用不同颜色标注失败点、等待时间和情感高/低点

→先绘制现状蓝图（As-is），再绘制目标蓝图（To-be）

→定期更新蓝图，新功能上线后同步反映在服务蓝图中

✗ 避免这些

→不要只由产品团队单独绘制，后台流程必须由执行者确认

→不要把蓝图绘制得过于理想，必须反映现实中实际发生的流程

→不要忽视「支持系统」层，很多失败点源于系统间的数据断层

→不要试图一次覆盖所有服务路径，先聚焦最常见的主流程

配合使用

与这些工具搭配效果更好
-----------

[用户旅程地图 — 上游输入：提炼前台用户视角的体验关键点 →](framework-user-journey-map.html) [同理心地图 — 互补使用：补充服务触点背后的用户情感细节 →](framework-empathy-map.html) [情境调查法 — 验证工具：实地观察验证蓝图中的服务假设 →](framework-contextual-inquiry.html) [亲和图（KJ 法） — 下游承接：归类服务断点和痛点找改进方向 →](framework-affinity-diagram.html)

继续阅读下一个 →

pmframe.works · © 2026

(function(){ var slug='service-blueprint'; // Inject hero SVG var svgEl=document.getElementById('hero-svg'); if(svgEl&&typeof MODAL\_SVGS!=='undefined'&&MODAL\_SVGS\[slug\]){ svgEl.innerHTML=MODAL\_SVGS\[slug\]; } // Fill meta-inline from MODAL\_META if empty var mi=document.querySelector('.meta-inline'); if(mi&&!mi.querySelector('.m-item')&&typeof MODAL\_META!=='undefined'&&MODAL\_META\[slug\]){ var m=MODAL\_META\[slug\]; var fields=\[\['提出者',m.by\],\['类型',m.type\],\['适合',m.fit\],\['年份',m.year\]\]; mi.insertAdjacentHTML('afterbegin',fields.filter(function(f){return f\[1\];}).map(function(f){ return '<div class="m-item"><span class="m-label">'+f\[0\]+'</span><span class="m-value">'+f\[1\]+'</span></div>'; }).join('')); } // Favorites var favBtn=document.getElementById('nav-fav-btn'); if(favBtn&&typeof isFav==='function'){ function updateFavBtn(){ var f=isFav(slug); favBtn.className='nav-fav-btn'+(f?' is-fav':''); favBtn.textContent=f?'\\u2605 \\u5df2\\u6536\\u85cf':'\\u2606 \\u6536\\u85cf'; } favBtn.onclick=function(){toggleFav(slug);updateFavBtn();}; updateFavBtn(); } })();