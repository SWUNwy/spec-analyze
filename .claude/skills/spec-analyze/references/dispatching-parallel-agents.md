# 并行代理派发（Dispatching Parallel Agents）

> 改编自 superpowers 插件 v6.1.1（MIT）。方法论保留；语气对齐 analyze。

## 何时加载

面对 2+ 个无需共享状态或顺序依赖、可独立处理的问题时加载。常见触发：多个无关测试在不同文件失败。

## 核心原则

每个独立问题域派发一个代理。并发运行。每个代理拿到精心构造的上下文——**绝不是会话历史**。

## 决策流

| 问题 | 是 | 否 |
|---|---|---|
| 多个失败/问题？ | 继续 | 单代理即可 |
| 它们独立吗？ | 继续 | 一起调查 |
| 能并行工作（无共享状态）？ | 并行派发 | 顺序代理 |

## 何时使用

- 3+ 个测试文件以不同根因失败
- 多个子系统独立损坏
- 每个问题无需其他上下文即可理解
- 调查间无共享状态（无文件重叠、无资源争用）

## 何时不使用

- 失败相关（修一个可能修好其他）——先一起调查
- 任何修复前需要理解完整系统状态
- 代理会互相干扰（编辑相同文件、使用相同资源）
- 探索式调试——你还不知道坏在哪

## 模式

### 1. 识别独立域

按损坏内容给失败分组：
- File A tests: Tool approval flow
- File B tests: Batch completion behavior
- File C tests: Abort functionality

每个域独立——修 tool approval 不影响 abort 测试。

### 2. 创建聚焦的代理任务

每个代理拿到：
- **具体范围：** 一个测试文件或子系统
- **清晰目标：** 让这些测试通过
- **约束：** 不改其他代码
- **预期输出：** 你发现并修复了什么

### 3. 并行派发

在同一响应中发出全部子代理派发——它们并行运行。

```text
Agent (general-purpose): "Fix agent-tool-abort.test.ts failures"
Agent (general-purpose): "Fix batch-completion-behavior.test.ts failures"
Agent (general-purpose): "Fix tool-approval-race-conditions.test.ts failures"
# All three run concurrently.
```

一个响应多次派发 = 并行。一次一个 = 顺序。

### 4. 评审与集成

代理返回时：
1. 读每个摘要
2. 验证修复不冲突
3. 跑完整测试套件
4. 集成全部改动

## 代理提示结构

好提示：
1. **聚焦** — 一个清晰问题域
2. **自包含** — 理解问题所需全部上下文
3. **输出明确** — 代理该返回什么？

示例：

```markdown
Fix the 3 failing tests in src/agents/agent-tool-abort.test.ts:

1. "should abort tool with partial output capture" — expects 'interrupted at' in message
2. "should handle mixed completed and aborted tools" — fast tool aborted instead of completed
3. "should properly track pendingToolCount" — expects 3 results but gets 0

These are timing/race condition issues. Your task:

1. Read the test file and understand what each test verifies
2. Identify root cause — timing issues or actual bugs?
3. Fix by:
   - Replacing arbitrary timeouts with event-based waiting
   - Fixing bugs in abort implementation if found
   - Adjusting test expectations if testing changed behavior

Do NOT just increase timeouts — find the real issue.

Return: Summary of what you found and what you fixed.
```

## 常见错误

| 错误 | 修复 |
|---|---|
| 太宽："Fix all the tests" | 具体："Fix agent-tool-abort.test.ts" |
| 无上下文："Fix the race condition" | 粘贴错误消息与测试名 |
| 无约束：代理可能重构一切 | 加 "Do NOT change production code" 或 "Fix tests only" |
| 输出含糊："Fix it" | 具体："Return summary of root cause and changes" |

## 代理返回后的验证

1. **评审每个摘要** — 理解改了什么
2. **检查冲突** — 代理是否编辑了相同代码？
3. **跑完整套件** — 验证全部修复协同工作
4. **抽查** — 代理可能犯系统性错误

## 参考

- `references/subagent-driven-development.md` — 顺序的逐任务子代理派发（不同模式）
- `references/systematic-debugging.md` — 失败相关时一起调查
- `references/requesting-code-review.md` — 单一评审者派发
