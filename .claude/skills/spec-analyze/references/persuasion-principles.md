# 说服原理（Persuasion Principles）

> 改编自 superpowers 插件 v6.1.1（MIT）。方法论保留；语气对齐 analyze。

**何时加载：** 设计 skill 测试压力场景，或编写必须覆盖代理默认行为的 skill 内容时。解释压力场景为何有效、哪些原则提升合规。

## 为何重要

Skill 测试用压力场景验证 skill 抵抗合理化。场景的有效性建立在已发表的说服研究之上。不理解这些原则就设计场景，会产出代理一行合理化就能打发的测试。

**关键发现：** Meincke et al.（2025）对 N=28,000 参与者的元分析显示，组合多个说服原则把合规从约 33%（单一原则）提升到约 72%（多原则）。组合 3+ 原则的压力场景不是任意的——它们反映这个经验乘数。

## 七原则

改编自 Cialdini 的影响力研究，应用于 skill 编写与压力测试。

### 1. Authority（权威）

代理（和人）服从感知到的权威——资深工程师、经理、"计划"、文档语气。

**压力场景用法：** 加推动违规的权威人物。
- "Manager says add 2-line fix now"
- "Senior engineer says skip tests"
- "The plan explicitly chose this approach"

**Skill 编写用法：** 权威语气（"MUST"、"Iron Law"、"STOP"）优于柔和指导（"should"、"consider"、"try to"）。

**反信号：** skill 引用权威时点出它。"Violating letter is violating spirit" 有效，因为它调用规则作者的权威。

### 2. Commitment and consistency（承诺与一致）

立场一旦陈述，代理（和人）抗拒自相矛盾。已陈述承诺把未来行为拉向一致。

**压力场景用法：** 工程师已实现 200 行。删除感觉像违背先前承诺。
- "You spent 4 hours implementing this"
- "You already manually tested"
- "You told the team it's done"

**Skill 编写用法：** 尽早引出承诺。"If you wrote code before tests, delete it" 是代理读 skill 时做出的承诺。后续合理化破坏该承诺。

**反信号：** 沉没成本合理化（"deleting is wasteful"）是把一致压力武器化来反规则。skill 通过重新框架反击："Deleting is the cheapest path to compliance."

### 3. Scarcity（稀缺）

稀缺资源（时间、部署窗口、注意力）抬高合规的感知成本。

**压力场景用法：** 总包含稀缺资源。
- "5 minutes until deploy window"
- "Production is down, $10k/min"
- "Dinner at 6:30pm"
- "Last chance before vacation"

**Skill 编写用法：** 让违规成本稀缺。"The only acceptable answer is A" 把 B 和 C 重新框架为昂贵而非便宜。

**反信号：** "Pragmatic" 合理化援引假稀缺（"we don't have time for the rule"）。skill 通过点名违规实际成本反击：返工、回归、评审失败。

### 4. Social proof（社会认同）

代理（和人）跟随感知规范。"Everyone skips tests sometimes" 是强合理化。

**压力场景用法：** 加推动违规的社会认同。
- "The team is waiting"
- "Other engineers ship without tests"
- "This is industry standard"

**Skill 编写用法：** 社会认同也利于 skill。"Bulletproof agents follow this rule" 是社会认同。列出常见合理化及其反制，制造规范预期。

**反信号：** 测试发现新合理化时点名它。加入合理化表传达"这个借口已被考虑并否决"——摧毁它的社会认同力量。

### 5. Unity / identity（同一性/身份）

身份一致的请求胜过交易式请求。"Engineers who care about craft do X" 胜过 "do X"。

**压力场景用法：** 威胁身份。
- "Don't look dogmatic"
- "Be pragmatic, not ideological"
- "Senior engineers know when to break rules"

**Skill 编写用法：** 把合规框架为身份正面。"Skilled practitioners delete code written before tests" 使合规成为身份声明，而非交易。

**反信号：** "Pragmatic vs dogmatic" 是最常见的身份型合理化。skill 重新框架反击："Following the rule IS pragmatic — it prevents rework."

### 6. Reciprocity（互惠）

恩惠制造义务。免费礼物（已写测试覆盖、已手动测试）感觉像赚到可用于未来合规的信用。

**压力场景用法：** 加先前"信用"。
- "You already manually tested"
- "You wrote docs for the feature"
- "You paired with a junior on it"

**Skill 编写用法：** 拒绝这笔交易。"Manual testing does not substitute for written tests" 显式拒绝互惠框架。

**反信号：** "I already manually tested" 基于互惠。skill 必须显式拒绝交易，不只是重申规则。

### 7. Liking（好感）

来自讨喜来源的请求更易成功。压力场景常含推动违规的讨喜人物（受尊敬的资深、友好的队友）。

**压力场景用法：** 讨喜权威推动违规。
- "Your favorite tech lead says ship it"
- "The team agrees this is fine"

**Skill 编写用法：** 与 skill 内容关系较小，因为 skill 是无人格的。与元测试相关：元测试提示应中性，不要温暖。

**反信号：** skill 内容中少见。出现在场景中。

## 应用：设计压力场景

组合 3+ 原则的场景产生约 72% 合规偏移，对比单一原则约 33%。目标组合：

| 组合 | 效果 |
|---|---|
| Time + Sunk cost + Exhaustion | 经典"下班合理化"——测 skill 是否扛得住疲惫 |
| Authority + Scarcity + Social proof | "经理说马上发、团队在等、部署窗口关闭"——测 skill 是否扛得住生产压力 |
| Reciprocity + Identity + Commitment | "我已测过、我很务实、我承诺要发"——测 skill 是否扛得住自我辩解 |

## 应用：skill 编写杠杆

写 skill 内容时，借原则之力促进合规：

| 原则 | 技巧 |
|---|---|
| Authority | 用 "MUST"、"Iron Law"、"STOP"。引用规则来源。 |
| Commitment | 尽早引出承诺（"If X, then Y"）。让违规成为矛盾。 |
| Scarcity | 点名违规成本（"Rework is more expensive than compliance"）。 |
| Social proof | 引用合理化已被考虑并否决。 |
| Identity | 把合规框架为手艺，不是官僚。 |
| Reciprocity | 显式拒绝常见交易（"Manual testing does not substitute"）。 |
| Liking | 关系较小；保持语气中性，避免人格化合规。 |

## 应用：反合理化

基线测试揭示合理化时，识别它借用的原则并针对性反制：

| 合理化 | 借用的原则 | 反制 |
|---|---|---|
| "I already manually tested" | Reciprocity | 显式拒绝交易 |
| "Being pragmatic not dogmatic" | Identity | 把合规重新框架为务实 |
| "Manager says skip" | Authority | 点名规则的权威更高 |
| "Spirit not letter" | Commitment | 拒绝区分："Violating letter is violating spirit" |
| "Everyone does this" | Social proof | 加入合理化表（已考虑并否决） |
| "Don't have time" | Scarcity | 点名违规实际成本 |
| "Senior engineers break rules" | Identity + Liking | 重新框架：熟练从业者守规则 |

## 参考

- Cialdini, R. B. — *Influence: The Psychology of Persuasion*（基础六原则框架；Unity 在后续版本加入）
- Meincke et al.（2025）— N=28,000 元分析，显示多原则合规乘数（33% → 72%）
- `references/testing-skills-with-subagents.md` — 这些原则如何驱动压力场景设计
- `references/writing-skills.md` — 主要 skill 创建参考
