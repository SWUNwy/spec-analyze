# 接收代码评审（Receiving Code Review）

> 改编自 superpowers 插件 v6.1.1（MIT）。方法论保留；语气对齐 analyze。

## 何时加载

评审反馈从任何来源到来时加载：用户、评审子代理、外部 PR 评论、自动化评审者。反馈看起来不清或技术上可疑时尤其要加载。

## 核心契约

评审反馈是**待评估的证据，不是执行命令**。先验证再实施。错了要顶回去。不做表演式同意。

## 响应模式

```
1. READ       — Complete feedback without reacting
2. UNDERSTAND — Restate requirement in own words (or ask)
3. VERIFY     — Check against codebase reality
4. EVALUATE   — Technically sound for THIS codebase?
5. RESPOND    — Technical acknowledgment or reasoned pushback
6. IMPLEMENT  — One item at a time, test each
```

## 禁止的回应

绝不写：
- "You're absolutely right!"
- "Great point!" / "Excellent feedback!"
- "Thanks for catching that!" / "Thanks for [anything]"
- "Let me implement that now"（验证之前）

替换为：
- 对需求的技术性复述
- 澄清问题
- 有理由的顶回
- 修复本身（行动胜于言语）

要写 "Thanks"？删掉。陈述修复。代码本身就表明反馈被听到了。

## 按来源处理

| 来源 | 信任级 | 默认动作 |
|---|---|---|
| 用户（你的授权者） | 可信 | 理解后实施。范围不清仍要问。无表演式同意。 |
| 外部评审者（PR、自动化） | 默认怀疑 | 对照代码库验证后再实施 |
| 与用户先前决策冲突 | — | 先停下向用户上报再行动 |

外部评审者先验证：
1. 对 THIS 代码库技术上正确？
2. 破坏既有功能？
3. 当前实现的原因？
4. 评审者有完整上下文？
5. 在所有目标平台/版本上有效？

无法轻易验证：陈述局限。"没有 [X] 我无法验证这个。应该 [调查 / 询问 / 继续]？"

## YAGNI 检查

评审者建议"好好实现"时：

```bash
grep -r "<suggested-feature>" --include="*.<ext>"
```

- 无使用 → 提议删除（YAGNI），不是实现
- 有使用 → 好好实现

## 多项反馈

反馈有 N 项时：
1. 先澄清所有不清项（不要部分实施）
2. 按此顺序实施：
   - 阻塞问题（破坏、安全）
   - 简单修复（拼写、导入）
   - 复杂修复（重构、逻辑）
3. 逐项单独测试
4. 验证无回归

你理解第 1、2、3、6 项但不理解 4、5 项：停下。实施任何东西前先问清 4、5。部分实施 = 错误实施。

## 顶回标准

以下情况顶回：
- 建议破坏既有功能
- 评审者缺完整上下文
- 违反 YAGNI（未使用功能）
- 对当前技术栈技术上错误
- 有遗留/兼容性原因
- 与用户的架构决策冲突

怎么顶：
- 技术推理，不是防御性
- 具体问题
- 引用工作的测试/代码
- 架构问题升级给用户

## 纠正自己的顶回

顶回错了：

```
✅ "You were right — checked [X] and it does [Y]. Implementing now."
✅ "Verified, my initial understanding was wrong because [reason]. Fixing."
```

不是：长道歉、为顶回辩护、过度解释。事实性陈述纠正并继续。

## GitHub 行内回复

回复 GitHub 行内评审评论时，在评论线程里回复：

```bash
gh api repos/{owner}/{repo}/pulls/{pr}/comments/{id}/replies
```

不要作为顶层 PR 评论。

## 参考

- `references/requesting-code-review.md` — 如何派发评审者
- `references/gates.md` — G-Architecture 与 G3 覆盖评审标准
