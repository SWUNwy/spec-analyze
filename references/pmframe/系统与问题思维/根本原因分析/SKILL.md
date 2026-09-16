---
name: root-cause-analysis
description: Use when analyzing a problem with multiple potential contributing factors
source: PMFrame/根本原因分析
imported: 2026-09-15
---

# Root Cause Analysis (Fishbone / Ishikawa)

Use a fishbone diagram to systematically explore all potential causes of a problem across multiple categories, ensuring no contributing factor is overlooked.

## Steps

1. **State the problem** — Write the effect or problem at the head of the fishbone.
2. **Define cause categories** — Draw major branches for standard categories: People, Process, Technology, Environment, Materials, Measurement (adapt as needed).
3. **Brainstorm causes per category** — For each branch, list all possible contributing factors. Ask "why" to add sub-causes.
4. **Identify the most likely root causes** — Evaluate each cause for evidence and impact. Circle or highlight the most probable contributors.
5. **Define corrective actions** — For each root cause, propose a specific, measurable countermeasure.

## Output Format

A fishbone diagram with the problem at the head, 4-6 category branches with causes and sub-causes, highlighted root causes, and an action plan table with columns: Root Cause, Corrective Action, Owner, Timeline.

---

Root Cause Analysis（RCA）是系统性地从表象症状追溯到真正根源的分析方法。处理症状只会让问题反复出现；找到根本原因才能一次性解决。正确的 RCA 改变系统，而不仅仅修复零件。

## 它解决什么问题

### 为什么问题总是反复出现？

线上故障修复了，下次还会出现。Bug 关闭了，类似的 Bug 又来了。客户投诉处理了，同类投诉还在增加。这不是团队不努力——这是因为团队在处理症状，而非根本原因。

直接原因（Direct Cause）容易看到，也容易修复；但根本原因（Root Cause）往往藏在多层因果关系的底部，需要系统性的追问才能找到。RCA 提供了这种追问的结构化方法。

更重要的是：**没有 RCA 的复盘往往会把责任归咎于个人，而 RCA 的目的是找到系统性的原因**——流程设计、工具缺陷、激励机制、沟通结构。修复系统，才能防止问题再次发生。

## 框架结构

### 三类原因与 Fishbone 图

RCA 首先区分三类原因，防止过早停止追问；然后用结构化工具（鱼骨图、5 Why、故障树）系统性地探索每个维度的贡献因素。

第一类

直接原因（Direct Cause）

直接触发问题的事件或失效。容易识别，但修复它不能防止复发。例：O 形圈在低温下失效。

第二类

促成原因（Contributing Cause）

使直接原因得以发生或恶化的条件。通常有多个，代表了系统中的薄弱环节。例：工程师的警告被忽视。

第三类

根本原因（Root Cause）

如果消除此原因，直接原因就不会发生，或促成原因不会积累。通常是系统性问题。例：组织文化压制技术异议。

Fishbone（石川图）示例：用户无法完成支付

问题：用户无法完成支付

人（People）

客服未接受支付问题培训

开发未复现用户真实环境

流程（Process）

支付回调异常无告警流程

QA 未覆盖低网络环境测试

技术（Technology）

第三方支付 SDK 版本过旧

超时重试逻辑缺失

环境（Environment）

用户集中于 3G 网络地区

部分机型系统拦截回调

材料（Materials）

错误提示文案不清晰

支付文档更新滞后

管理（Management）

支付模块无专属负责人

已知问题积压未处理

根本原因（收敛结论）

支付链路缺乏端到端的归属责任人，导致异常无人主动追踪，已知问题长期积压——这是系统性治理问题，而非单一技术 bug。

## 适用场景

### 什么时候该用它？

RCA 最适合需要防止复发、而非仅仅快速修复的场景。凡是「这个问题之前出现过」或「下次还会出现」的地方，都需要 RCA。

🔥

线上事故复盘（Post-mortem）

服务宕机、数据错误、支付失败——复盘不是追责，是找到系统性漏洞并修复它们。

🐛

反复出现的 Bug 或质量问题

同类 bug 第三次出现时，不该再 fix bug，而是问：为什么这类 bug 能一再通过测试进入生产？

📉

指标异常下跌分析

转化率突然下降、DAU 连续下滑——用 RCA 区分直接原因（某个改动）和根本原因（流程问题）。

😤

用户投诉集中爆发

同一类投诉大量涌入，说明不是个别用户问题，而是产品或流程的系统性缺陷需要被找到。

🏗️

项目延期或需求频繁变更

需求总是在开发阶段改变、项目总是延期——背后往往有可被修复的流程根因，而非「PM 太任性」。

🔒

安全事件与合规问题

数据泄露、权限越界——安全工程领域最早系统化了 RCA，每次安全事件都需要彻底的根因分析。

## 真实案例

NASA 挑战者号  
### 灾难 RCA (1986)

1986 年 1 月，挑战者号航天飞机在发射 73 秒后爆炸解体，机上 7 名宇航员全部遇难。这是人类历史上最著名的 RCA 案例之一——因为它揭示了技术问题背后的组织系统性失败。

NASA 挑战者号灾难

Rogers 委员会根本原因调查 · 1986 年

1986

三层原因追溯：从 O 形圈到组织文化

直接

直接原因（Direct Cause）

**O 形圈在低温下失去弹性密封能力**，导致固体火箭助推器连接处燃气泄漏，最终引发爆炸。发射当天气温仅 -2°C，远低于设计工作温度。

促成

促成原因（Contributing Causes）

**Morton Thiokol 的工程师曾多次警告低温下 O 形圈存在风险**，但这些警告在上报给 NASA 管理层的过程中被系统性地过滤和淡化。发射前夜的电话会议中，管理层施压要求工程师「换顶工程师的帽子，戴上管理者的帽子」。

根本

根本原因（Root Cause）

**NASA 的组织文化使异议工程师的声音被系统性压制**，同时决策流程将发射时间表压力与安全评估置于同等权重。Rogers 委员会的最终结论：这不是 O 形圈的失败，而是 NASA 决策文化和组织结构的失败。

⚠

如果只修复直接原因会怎样

→

更换更好的 O 形圈材料，在更低温度下仍能密封

→

17 年后，哥伦比亚号在类似的组织文化失败中再次坠毁（2003年）

→

Columbia 事故调查委员会发现：NASA 的组织文化问题从未真正被修复

✓

RCA 带来的根本性改变

→

NASA 建立了独立安全委员会，有权暂停任何发射

→

改变了异议沟通机制：工程师的安全反对意见必须被正式记录

→

安全评估与发射计划分离，消除了时间表压力对安全决策的影响

## 使用建议

### 让 RCA 真正有效的五个关键

RCA 的难点不在于工具，而在于团队是否有勇气持续追问、承认系统性问题，并真正落实改进行动。

01

**不要停在症状层面——「O 形圈失效→换 O 形圈」是最危险的陷阱。**直接原因总是显而易见的，这就是为什么大多数团队都停在这里。问自己：「修复这个原因后，类似问题还可能再次发生吗？」如果答案是「可能」，继续追问。

02

**RCA 的目标是找到系统原因，而非归咎个人。**「因为 XX 同学操作失误」几乎从不是根本原因——真正的问题是：为什么系统允许这个失误发生？是培训不足、工具设计不合理、流程缺失，还是激励机制扭曲？

03

**鱼骨图要覆盖所有维度，不能只填「技术」骨头。**产品事故通常同时涉及人员、流程、技术、管理多个维度。只分析技术骨头的鱼骨图是残缺的，往往会遗漏真正的根本原因（通常藏在流程或管理骨头里）。

04

**用数据验证根本原因，不依赖团队的直觉共识。**「我们都觉得是 XX 原因」不是验证。根本原因需要数据支撑：如果消除这个原因，问题是否就不会发生？能否找到历史数据或实验来验证这个假设？

05

**追踪纠正措施的执行效果，否则 RCA 等于白做。**最好的 RCA 报告如果没有执行跟踪，六个月后问题会以稍微不同的形式重新出现。为每个根本原因指定 DRI（直接负责人）和验收标准，并在下次复盘时检查是否真正修复了。

## 来源与历史

### 从核电站安全规程到产品缺陷溯源的跨界旅程

根本原因分析（Root Cause Analysis，RCA）起源于二十世纪中叶的核能与航空航天安全领域，由美国军方与NASA在重大事故调查中逐步系统化。这套"追问到底"的思维方法后来被制造业、医疗行业乃至软件产品团队广泛采用，成为解决复杂问题、防止缺陷复发的通用工具。

1950年代

军工与核能行业开创故障分析先河

冷战背景下，美国军方与核能工业面临高风险系统的可靠性挑战，故障树分析（FTA）与失效模式与影响分析（FMEA）在这一时期相继出现。贝尔实验室与波音公司的工程师开始系统性地向上追溯故障链条，探寻系统性失效的深层原因，奠定了RCA的工程学基础。

1960年代

丰田"五个为什么"提供方法论雏形

丰田生产系统创始人大野耐一将"连续追问五个为什么"的方法编入丰田标准作业规程，要求工人在任何生产异常发生时不得停留于表象原因，必须层层深挖至根本原因并加以永久性解决。这一简单而强大的方法论后来成为RCA实践中最广为人知的工具之一。

1979

三里岛核事故推动RCA制度化

美国三里岛核电站事故震惊全球，事后调查发现事故根源在于人为操作错误与系统设计缺陷的叠加。此次调查促使美国核管理委员会（NRC）将RCA纳入强制性事故报告与预防体系，正式确立了RCA作为安全管理制度工具的法律地位。

1986

挑战者号事故深化NASA的RCA实践

航天飞机挑战者号失事后，NASA展开史上最为彻底的RCA调查，揭示出O形密封圈失效背后深层的组织沟通与决策文化问题。这次调查将RCA的分析层次从技术原因延伸至组织与文化根因，极大地丰富了根本原因分析的方法论维度。

2000年代至今

软件与产品行业全面引入RCA

敏捷开发中的"事后复盘"（Retrospective）与DevOps中的"故障后分析"（Post-mortem）将RCA的核心逻辑移植到软件产品领域。Google、Netflix等科技公司将无责归因的RCA文化制度化，产品经理也将其作为用户流失、功能失败等问题的标准诊断工具。
