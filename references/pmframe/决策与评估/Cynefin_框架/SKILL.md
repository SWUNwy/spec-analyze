---
name: cynefin-framework
description: Use when determining the right approach by classifying the type of problem you face
source: PMFrame/Cynefin_框架
imported: 2026-09-15
---

# Cynefin Framework

Classify problems into one of four domains — Clear, Complicated, Complex, Chaotic — to select the appropriate response strategy instead of applying a one-size-fits-all approach.

## Steps

1. **Describe the situation** — Lay out the problem, its context, and what is known vs. unknown.
2. **Classify the domain:**
   - **Clear** — Cause and effect are obvious. Best practice exists. Sense-Categorize-Respond.
   - **Complicated** — Cause and effect discoverable with analysis. Sense-Analyze-Respond. Bring in experts.
   - **Complex** — Cause and effect only visible in hindsight. Probe-Sense-Respond. Run safe-to-fail experiments.
   - **Chaotic** — No cause and effect discernible. Act-Sense-Respond. Stabilize first, then assess.
3. **Select the response pattern** — Match your approach to the domain classification above.
4. **Watch for domain shifts** — Monitor whether the situation moves between domains over time.
5. **Act accordingly** — Execute the response, then reassess the domain classification.

## Output Format

A classification statement naming the domain with evidence, the recommended response pattern, proposed actions, and signals to watch for domain shifts.

---

「Cynefin」（发音：kuh-NEV-in）是威尔士语，意为「栖居地」。它把问题分为五个领域，每个领域需要不同的决策逻辑。最关键的洞察：大多数产品决策活在复杂域（Complex），但团队用繁杂域（Complicated）的方法来处理它们。

## 它解决什么问题

### 用错误的方法处理正确的问题

产品团队常见的场景：一个功能效果不好，于是召开更多会议、做更多分析、请更多专家——结果还是不行。问题不是分析不够，而是**这类问题本质上无法通过分析来解决**，需要的是实验。

Cynefin 框架的核心贡献是：在开始解决问题之前，先识别「这是哪类问题」。不同类型的问题需要完全不同的响应模式——用处理「繁杂问题」的方法（分析→专家→方案）来处理「复杂问题」，不仅无效，还会产生虚假的确定感。

Cynefin 让你停下来问：**「我正在用正确的方法处理这个问题吗？」**这个元认知层面的问题，往往比任何具体工具都更有价值。

## 框架结构

### 五个领域，五种决策逻辑

每个领域由「因果关系的可预测程度」定义，并对应不同的行动循环。错误地将问题归入另一个领域，会导致完全错误的响应策略。

Clear（清晰域）

简单 / 显然

感知 → 分类 → 响应

因果关系显而易见，有公认的最佳实践。不需要分析，按规则执行即可。

产品示例：密码强度校验规则、支付成功页面跳转、错误码标准处理

Complicated（繁杂域）

复杂但可知

感知 → 分析 → 响应

因果关系存在但需要专业知识才能理解。有多个正确答案，需要专家分析后选择。

产品示例：推荐算法调优、大规模系统架构设计、数据库性能优化

Complex（复杂域）

涌现 / 回顾可知

探针 → 感知 → 响应

因果关系只有在事后才能看清。没有正确答案，只有在实验中涌现出来的答案。需要安全失败的小实验。

产品示例：用户增长策略、新功能产品市场契合、定价策略、病毒传播机制

Chaotic（混沌域）

无因果关系

行动 → 感知 → 响应

因果关系不存在或极度混乱。没有时间分析，必须立即行动以建立秩序，再转移到其他领域处理。

产品示例：P0 线上故障爆发初期、黑天鹅式竞争打击、严重数据安全事件

Disorder（混乱域）

中央 — 不知道自己在哪

不知道自己处于哪个领域。最危险的状态——每个人都用自己惯用的方法，团队陷入混乱的多声部决策。Cynefin 的首要任务是帮你逃离混乱域。

⚡

**清晰域与混沌域之间有一道「悬崖」（Cliff）：**过度依赖最佳实践会导致自满，一旦环境变化，团队会从「清晰」直接跌入「混沌」，没有缓冲。COVID-19 初期各国政府的反应就是典型案例——原本认为已有「应对流行病的最佳实践」，却发现根本无从套用。

核心洞察

大多数产品决策活在复杂域（Complex）——因果关系只有在事后才知道。但团队往往把它当成繁杂域（Complicated）来处理：召开更多会议、雇佣更多专家、做更多分析。在复杂域，**跑小实验，而非大分析**。

## 适用场景

### 什么时候该用它？

Cynefin 不是在特定场合才拿出来的工具，而是一个持续运行的元认知框架——在做任何重要决策前，先问「这属于哪个领域？」

🧭

战略决策前的情境诊断

在确定「怎么做」之前，先用 Cynefin 确认「这是什么类型的问题」，避免策略与问题本质错位。

🔬

产品实验 vs. 分析决策

在做数据分析或启动 A/B 测试前，判断这个问题是繁杂域（需要分析）还是复杂域（需要实验）。

🚨

危机响应与事故处理

线上事故初期（混沌域）需要立即行动；稳定后转为复杂域或繁杂域处理，策略需随情境切换。

🏗️

团队流程设计

Scrum/敏捷适合复杂域；标准化 SOP 适合清晰域；雇专家顾问适合繁杂域——不能一刀切。

💡

创新策略制定

突破性创新在复杂域（需要探针实验），渐进式优化在繁杂域（需要专家分析）。两种创新需要不同资源配置。

🤝

跨团队对齐与分歧调解

团队争论往往是因为各方对「这是什么类型的问题」有不同假设。用 Cynefin 先对齐问题类型，再讨论解决方案。

## 真实案例

COVID-19 防疫响应  
### 与台湾 CDC 的复杂域决策 (2020)

2020 年 COVID-19 疫情爆发，成为人类历史上最大规模的 Cynefin 四个领域同时出现的真实案例——不同的问题需要完全不同的决策逻辑。

COVID-19 防疫响应

台湾 CDC 的复杂域决策 · 2020 年

2020

同一场危机，四个 Cynefin 领域同时出现

Clear（清晰域）

**洗手规程**——既有最佳实践，直接套用。20 秒皂液洗手是成熟的科学共识，无需重新发明。

Complicated（繁杂域）

**疫苗分发物流**——需要专家（流行病学家、物流工程师）分析后制定最优方案，有正确答案但需要专业知识。

Complex（复杂域）

**传播建模与封锁效果**——只有在事后才知道哪个措施有效。台湾 CDC 选择跑多个小实验（口罩配给、接触追踪 App）并快速学习。

Chaotic（混沌域）

**疫情最初几周**——因果关系混乱，需要立即行动（关闭边境、暂停大型活动），而非等待分析结果。

✓

台湾 CDC：复杂域的正确做法

→

公开发布实时数据，允许社会各方平行实验（去中心化探针）

→

口罩配给、接触追踪 App 作为小规模「安全失败」实验快速测试

→

基于实验结果快速调整，而非等待完整分析报告（感知→响应循环快）

→

2020 年全年 GDP 正增长，死亡人数在全球主要经济体中最少

💡

Spotify Squad 模型：为复杂域设计的产品团队

→

小型自治 Squad = 探针工具：每个 Squad 独立运行小实验（build features）

→

检查指标（check metrics）= 感知（Sense）阶段

→

迭代或终止（iterate or kill）= 响应（Respond）阶段

→

这远胜于瀑布式规划——把复杂域问题误当繁杂域（大分析、慢决策）来处理

## 使用建议

### 让 Cynefin 真正有效的五个关键

Cynefin 最难的部分不是理解框架本身，而是抵制把所有问题都归入「我最擅长处理的领域」的心理倾向。

01

**不要把复杂域（Complex）当繁杂域（Complicated）处理——这是产品团队最普遍的错误。**「我们需要更多数据」「我们需要做更详细的分析」——当问题本质上无法通过分析确定答案时，越多分析只是越多延误。在复杂域，跑小实验比写大报告有效 10 倍。

02

**不要把混沌域（Chaotic）当复杂域（Complex）处理——危机时刻需要行动，不是探针。**P0 故障爆发时，「我们先跑几个实验来理解问题」是错误的——此时需要的是立即行动、建立秩序，等稳定后再进入系统性分析阶段。

03

**定期检查是否陷入了混乱域（Disorder）——不确定自己在哪里是最危险的状态。**当团队对一个问题有完全不同的假设时（有人觉得「这就是 bug，修一下」，有人觉得「这是战略问题」），先停下来，对齐「这是什么类型的问题」，再讨论解决方案。

04

**不要把一个领域的最佳实践照搬到另一个领域。**Scrum 在复杂域效果极好，但在清晰域（已有成熟 SOP 的流程）会制造不必要的开销。专家顾问在繁杂域极有价值，但在复杂域可能反而阻碍实验——因为他们倾向于给出确定的答案，而非承认「需要探索」。

05

**区分「繁杂」（hard but knowable）和「复杂」（unknowable in advance）——这是 Cynefin 最重要的语义区分。**火箭发射是繁杂的（工程专家可以计算出正确答案）；用户是否会喜欢新功能是复杂的（只有在发布后才知道）。前者请专家，后者做实验。

## 来源与历史

### 从 IBM 知识管理项目到全球领导力框架：Cynefin 的二十五年旅程

Cynefin 框架（威尔士语，意为"栖息地"或"归属感"）由 Dave Snowden 于 1999 年在 IBM 知识管理部门工作期间提出，是少数真正融合了复杂性科学、认知科学与管理实践的决策框架，帮助领导者识别当前问题所处的系统类型，选择匹配的应对策略。

1999

Dave Snowden 在 IBM 开发 Cynefin 框架

Dave Snowden 在 IBM 全球服务部担任知识管理主任期间，受威尔士文化中"环境决定认知"理念启发，开始构建一套能够区分不同决策情境的分类体系。Cynefin 最初以知识管理为应用场景，将情境分为已知、可知、复杂与混沌四个域。

2002

Snowden 创立 Cognitive Edge，深化框架研究

Snowden 离开 IBM 创立 Cognitive Edge 咨询公司，专注于将 Cynefin 与复杂适应系统（Complex Adaptive Systems）理论相结合。这一阶段引入了"混乱"（Disorder/Confused）中心域，框架从四象限演化为五域结构，并开始融入叙事性实践方法。

2007

《哈佛商业评论》文章使框架进入主流管理视野

Snowden 与 Mary Boone 在《哈佛商业评论》发表《领导者框架》（A Leader's Framework for Decision Making），将 Cynefin 以清晰的商业语言呈现给全球管理者受众。文章获得 HBR 高阅读量，成为框架被管理咨询和领导力培训领域广泛采用的转折点。

2013

敏捷社区将 Cynefin 纳入复杂产品决策工具

Scrum 和 Kanban 社区开始广泛引用 Cynefin 框架来解释"复杂领域中的产品开发为何不适合详细预测性规划"。Cynefin 成为敏捷教练和 Scrum Master 培训课程的必备内容，帮助团队向管理层解释迭代试探而非预先规划的合理性。

2020

疫情危机验证了 Cynefin 在极端不确定性中的价值

新冠疫情初期，多位管理学者引用 Cynefin 的"混沌域"概念分析各国政府的应对策略差异，框架再次获得大量关注。Snowden 本人也撰文指出，疫情是典型的复杂自适应系统问题，不应用简单或复杂框架应对，进一步确立了 Cynefin 在危机决策语境中的权威地位。
