# 测试驱动开发（Test-Driven Development）

> 改编自 superpowers 插件 v6.1.1（MIT）。方法论保留；语气对齐 analyze。

## 何时加载

在 `execute` 阶段（见 `executing-plans.md`）写任何生产代码之前加载。`verify` 或 `systematic-debugging.md` 期间修 bug 也要加载。

## 契约

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

违反规则的字面形式就是违反精神。测试前写的代码？删掉。"Keep as reference" = 事后测试 = 不是 TDD。

例外（先与用户确认）：一次性原型、生成代码、纯配置文件。

## 循环：Red → Green → Refactor

| 阶段 | 动作 | 强制验证 |
|---|---|---|
| RED | 为一个行为写一个最小测试 | 测试失败（不是报错）；因预期原因失败（功能缺失，不是拼写/导入） |
| GREEN | 写最小代码让测试通过 | 测试通过；无其他测试回归；输出干净 |
| REFACTOR | 改进命名、去重、抽取辅助 | 全部测试保持绿；不新增行为 |

跳过 RED 验证意味着测试可能因错误原因通过或测了错误的东西。"I'll verify failure later" = 跳过。

首次运行就通过？测试是错的——它在测既有行为或什么都没测。修测试，不要进入 GREEN。

测试报错（不是失败）？修报错原因，重新运行直到干净地失败。

## 决策：TDD 何时适用

| 情形 | TDD? | 说明 |
|---|---|---|
| 新功能 | 必需 | |
| 修 bug | 必需 | 先写复现 bug 的失败测试 |
| 重构 | 必需 | 测试在改动前钉住行为 |
| 一次性原型 | 问用户 | 默认仍 TDD |
| 生成代码 | 问用户 | |
| 配置文件 | 跳过 | |

想着"就这一次跳过 TDD"？停下。这是合理化。见下表。

## 门禁：TDD-Complete

宣称一个工作单元完成前：

- [ ] 每个新函数/方法都有测试
- [ ] 每个测试都在实现前看到过它失败
- [ ] 每个测试都因预期原因失败
- [ ] 为每个测试写最小代码让它通过
- [ ] 全部测试通过
- [ ] 输出干净（无警告、无错误）
- [ ] 测试练到真实代码（万不得已才用 mock）
- [ ] 边界情况与错误路径已覆盖

不能全打勾 = TDD 被跳过。重来。

## 合理化处理

出现以下任何想法，停下并以 TDD 重来：

| 想法 | 现实 |
|---|---|
| "Too simple to test" | 简单代码也会坏。测试只要 30 秒。 |
| "I'll add tests after" | 事后测试立即通过，证明不了任何事 |
| "Tests after achieve the same goals" | 事后测试问"这东西做什么？"；测试先行问"这东西该做什么？" |
| "Manual testing covered it" | 临时 ≠ 系统化。无记录、不能重跑 |
| "Already spent X hours, deleting is wasteful" | 沉没成本。未验证代码是债 |
| "Keep as reference, write tests first" | 你会去改它。那就是事后测试 |
| "Need to explore first" | 可以。扔掉探索，用 TDD 重来 |
| "Test hard = design unclear" | 听测试的。难测 = 难用 |
| "TDD will slow me down" | TDD 比事后调试更快 |
| "TDD is dogmatic, I am being pragmatic" | TDD 就是务实——提交前就发现 bug |
| "This is different because..." | 不。它不是。 |

## Bug 修复集成

执行或验证期间发现 bug：

1. 写复现 bug 的失败测试
2. 运行 RED 验证——确认因正确原因失败
3. 走 Red-Green-Refactor 循环
4. 测试现在证明修复并防止回归

没有回归测试就不要修 bug。

## 测试质量

| 质量 | 好 | 坏 |
|---|---|---|
| Minimal | 一个测试一个行为。名字里有 "and"？拆 | `test('validates email and domain and whitespace')` |
| Clear | 名字描述行为 | `test('test1')` |
| Realistic | 用真实代码；万不得已才 mock | 测试 mock 行为而非代码行为 |

卡住时：

| 问题 | 可能原因 |
|---|---|
| 不知道怎么测 | 先写想要的 API，再写断言。设计不清。 |
| 测试太复杂 | 设计太复杂。简化接口。 |
| 必须 mock 一切 | 代码耦合太强。用依赖注入。 |
| 测试 setup 巨大 | 抽取辅助。仍复杂？简化设计。 |

## Mocking 反模式

避免：
- 测 mock 行为而非真实行为
- 给生产类加仅测试用的方法
- 不理解依赖就 mock

## 参考

- `references/executing-plans.md` — TDD 接入 execute 阶段的位置
- `references/systematic-debugging.md` — 要求回归测试的 bug 修复工作流
- `references/verification-before-completion.md` — 最终验证门禁
- `references/testing-anti-patterns.md` — 五种"通过却什么都没验证"的测试模式
