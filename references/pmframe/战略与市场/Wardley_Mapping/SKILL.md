---
name: wardley-mapping
description: Map value chain components on an evolution axis to inform strategic decisions
source: PMFrame/Wardley_Mapping
imported: 2026-09-15
---

# Wardley Mapping

Visualize your value chain by plotting components from user need to underlying infrastructure, positioned by their evolutionary stage.

## Steps

1. Start with the **user need** at the top of the map
2. List all **components** needed to serve that need (capabilities, services, data, infrastructure)
3. Map **dependencies** -- draw the chain from user-visible to invisible components
4. Position each component on the **evolution axis**: Genesis -> Custom -> Product -> Commodity
5. Identify **strategic moves** -- build custom in Genesis, buy commodity, watch Product for disruption
6. Spot components ripe for **inertia** (resisting evolution) or **climatic patterns** (inevitable shifts)

## Output Format

**Anchor:** [User need]

| Component | Evolution Stage | Build/Buy/Partner | Strategic Note |
|-----------|----------------|-------------------|---------------|
| [Name] | [Genesis/Custom/Product/Commodity] | [Decision] | [Note] |

**Key moves:**
1. [Component] -- [Action and rationale]
2. [Component] -- [Action and rationale]

**Watch list:** [Components about to shift stage]

---

沃德利地图是一种战略态势分析工具，它用二维地图把企业的价值链与组件的进化阶段同时可视化，帮助团队找到真正需要差异化投入的地方，以及应该外包或购买的商品化组件。

## 它解决什么问题

### 为什么大多数战略会议是在盲人摸象？

大多数战略规划会议犯同一个错误：每个人对「现在在哪里」的理解都不一样，却在讨论「去哪里」。Simon Wardley 在 Canonical 担任 CEO 时发现，几乎没有一种工具能让团队以共同的视觉语言讨论战略——直到他发明了 Wardley Map。

Wardley Map 的核心洞见来自地图学：好的地图必须有两个要素——位置（组件在哪里）和运动方向（组件往哪里演化）。他把这个思路引入商业战略：X 轴是组件的进化程度（从创新 Genesis 到商品化 Commodity），Y 轴是组件离用户需求的距离（从可见 Visible 到不可见 Invisible）。

对产品团队最实用的价值是：Wardley Map 能帮你做三类关键决策——哪些能力应该自建、哪些应该购买、哪些应该外包。处于进化早期（Genesis）的能力需要自建以建立差异化；处于商品化阶段的能力应该购买或使用云服务，内部自建是浪费资源。

## 框架结构

### 二维地图：进化轴 × 价值链轴

地图的两个轴分别捕捉了战略的两个核心维度：你的组件处于价值链的哪个位置（对用户的可见度），以及它处于市场进化的哪个阶段（竞争差异化的空间大小）。

用户 不可见 可见度 / 价值链 Genesis Custom Product Commodity Utility ← 进化方向 → 用户需求 UI / UX 应用逻辑 数据库 基础设施 图例 差异化组件 成熟组件 商品化组件

概念 01

价值链 Value Chain

从用户需求出发，逐层分解实现该需求所需的所有技术和业务组件。位于地图顶端的对用户可见，底端的是不可见但必需的基础支撑。

概念 02

进化阶段 Evolution

Genesis（首创）→ Custom（定制）→ Product（产品化）→ Commodity（商品化）。每个组件都在这条轴上有其位置，且不可逆地向右移动。

概念 03

战略行动 Gameplay

基于组件在地图上的位置做出构建 / 购买 / 外包决策，并预判竞争对手的下一步。左侧（Genesis）需自建差异化；右侧（Commodity）外包以节省资源。

## 适用场景

### 什么时候该用它？

Wardley Mapping 最适合在团队需要对「自建 vs. 购买 vs. 外包」做出重大决策，或者需要识别竞争对手看不见的战略机会时使用。

🔧

技术栈构建-购买-外包决策

把所有技术组件定位到进化轴，快速识别哪些值得自建，哪些直接采购 SaaS 更明智。

☁️

云计算迁移战略规划

评估现有基础设施组件的商品化程度，制定有优先级的迁移路线图，避免在已商品化的能力上重复投资。

🔍

识别竞争对手的战略盲点

绘制竞争对手的价值链地图，找出他们在某个 Genesis 阶段组件上的投入不足——这就是你的差异化机会。

🏗️

产品平台化时机判断

当某个组件从 Custom 进化到 Product 阶段时，正是将其平台化、对外开放 API 的战略窗口期。

💡

组织能力投资优先级

对照地图判断团队在哪些领域投入了过多资源（商品化区域），哪些差异化能力反而人力不足。

🤝

生态系统合作伙伴策略

通过地图识别哪些组件适合与合作伙伴共建，哪些需要独占，从而设计最优的生态系统结构。

## 真实案例

英国政府数字服务（GDS）  
### 重构政府 IT 战略

2011 年，英国政府每年在 IT 上花费数十亿英镑，却产出了大量过时、重复的定制系统。Wardley Mapping 如何帮助 GDS 识别了浪费根源并催生了全球政府数字化标杆。

英国政府数字服务 GDS

重构政府 IT 战略 · 2011–2014

2011–2014

🔎

问题发现：Wardley Map 揭示的浪费

→

大量「商品化」基础设施被各部门重复定制开发，没有一个部门意识到自己在做别人做过的事

→

政府采购锁定在少数大型 IT 外包商，这些商家以「定制需求」为由阻止商品化，维持高利润

→

真正需要差异化的政务用户体验却投入极少——资源分配完全倒置

✓

战略行动：基于地图的重构

→

建立 GOV.UK 统一平台，把商品化组件（hosting, security, payments）集中采购并云化

→

把节省出来的资源聚焦在用户体验创新（位于 Genesis/Custom 的真正差异化区域）

→

引入「云优先」政策，打破与大型 IT 外包商的不当依赖

数十亿

英镑 IT 支出节省

80%+

GOV.UK 用户满意度

17国

政府借鉴学习对象

## 使用步骤

### 如何绘制你的第一张 Wardley Map？

绘制 Wardley Map 不需要工具，一张白纸就够了。关键是把注意力放在「定位」而不是「美化」上——一张粗糙但准确的地图远胜过一张精美但错误的地图。

01

明确用户需求（地图顶端）30 分钟

从「用户需要什么」出发，而不是「我们有什么能力」。把用户需求写在地图最顶端，这是整张地图的锚点。

02

分解价值链组件1–2 小时

列出实现用户需求所需的所有技术和业务组件，并用垂直方向表示它们之间的依赖关系（上方的依赖下方的）。

03

在进化轴上定位每个组件1–2 小时

判断每个组件处于 Genesis / Custom / Product / Commodity 哪个阶段，用市场数据和行业观察支撑判断，不要凭直觉。

04

识别战略行动点1 小时

哪些 Genesis/Custom 组件应该加大投资创新？哪些 Commodity 组件应该外包节省成本？地图会让答案变得非常直观。

05

预判演化方向并持续更新持续

定期更新地图（建议每季度），保持战略感知持续更新。特别关注正在从 Custom 进化到 Product 的组件——那是战略窗口期。

## 来源与历史

### 一位CEO的困惑，催生了战略制图的全新语言

Wardley战略地图由英国企业家西蒙·沃德利于2005年前后创立，起源于他担任Fotango公司CEO时对"为何传统战略工具无法帮助做出有效技术决策"的深度反思。这一方法论将价值链映射与技术演进轴结合，创造出一种能够可视化竞争态势随时间动态演变的战略分析工具，在云计算时代被广泛用于技术战略与产品定位决策。

2005

沃德利在Fotango开始构建初始框架

身为Fotango（雅虎英国子公司）CEO的西蒙·沃德利发现自己无法用传统SWOT或波特框架来解释公司所处的竞争环境，遂开始自行探索。他将"用户需求—价值链活动—技术演进阶段"三者结合，绘制出第一张原型地图，首次实现了战略态势的空间可视化。

2008

在O'Reilly开源商业大会上首次公开分享

沃德利在O'Reilly开源商业大会上公开展示Wardley Mapping方法论，引发技术领导者社区的强烈兴趣。他将地图的横轴（从"起源"到"商品化"的演进阶段）定义为理解云计算颠覆传统IT格局的关键分析维度，与当时AWS快速崛起的时代背景高度契合。

2016

UK政府数字服务（GDS）大规模采用

英国政府数字服务团队将Wardley Mapping引入公共部门的技术战略规划，用于分析政府IT系统的现代化路径与外包决策。这一高知名度的应用案例大幅提升了该方法在企业数字化转型领域的可信度与采用率。

2017

沃德利在Medium连载完整方法论文章

沃德利在Medium平台发表数十篇系列文章，系统阐述Wardley Mapping的核心原则、绘图方法与战略推导规则，并将全部内容免费开放。这种开放的知识分享策略使方法论迅速在全球技术战略社区中扩散，形成活跃的实践者社群。

2020s至今

云原生与AI时代的战略决策标配工具

在多云策略、API经济与AI基础设施快速演进的背景下，Wardley Mapping被广泛用于分析技术组件的演进位置，辅助"构建/购买/开源"决策以及平台竞争战略制定。OnlineWardleyMaps等配套工具的出现进一步降低了使用门槛，使其成为CTO与产品战略师的重要工具。
