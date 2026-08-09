# 并行代理派发

## 加载时机

同时存在 2 个以上互不依赖、不需要共享状态或顺序执行的问题时加载。典型触发：多个无关测试文件各自失败。

## 核心原则

每个独立问题域派发一个代理，并发运行。每个代理只拿到精心构造的上下文，**绝不包含会话历史**。

## 判断是否并行

| 判断 | 是 | 否 |
|---|---|---|
| 存在多个失败或问题？ | 继续判断 | 单代理即可 |
| 问题相互独立？ | 继续判断 | 合并调查 |
| 可并行处理（无共享状态）？ | 并行派发 | 顺序执行 |

## 适用场景

- 3 个以上测试文件以不同根因失败
- 多个子系统独立损坏
- 每个问题脱离其他上下文即可理解
- 调查之间无共享状态（无文件重叠、无资源竞争）

## 不适用场景

- 失败相互关联（修一个可能连带修好其他）——先合并调查
- 动手前必须理解整个系统状态
- 代理会互相干扰（编辑同一文件、争用同一资源）
- 探索式调试——还不知道问题出在哪

## 操作模式

### 1. 划分独立问题域

按损坏对象分组，例如：
- File A tests: Tool approval flow
- File B tests: Batch completion behavior
- File C tests: Abort functionality

各域独立：修复 tool approval 不会影响 abort 测试。

### 2. 构造聚焦任务

每个代理获得：
- **明确范围**：一个测试文件或子系统
- **清晰目标**：让这些测试通过
- **约束**：不改动其他代码
- **预期输出**：发现与修复的总结

### 3. 并行派发

在同一响应中发出全部派发指令，代理即并行运行。

```text
Agent (general-purpose): "Fix agent-tool-abort.test.ts failures"
Agent (general-purpose): "Fix batch-completion-behavior.test.ts failures"
Agent (general-purpose): "Fix tool-approval-race-conditions.test.ts failures"
# 三条并行执行
```

一个响应多次派发 = 并行；一次只发一个 = 顺序。

### 4. 汇总与集成

代理返回后：
1. 逐一阅读摘要
2. 检查修复之间是否有冲突
3. 运行完整测试套件
4. 合并全部改动

## 任务提示的要求

好的提示满足三点：
1. **聚焦**：只包含一个清晰的问题域
2. **自包含**：提供理解问题所需的全部上下文
3. **输出明确**：说明期望代理返回什么

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

## 常见错误与修正

| 错误 | 修正 |
|---|---|
| 范围过宽："Fix all the tests" | 具体到文件："Fix agent-tool-abort.test.ts" |
| 无上下文："Fix the race condition" | 附上错误消息与测试名 |
| 无约束：代理可能重构一切 | 加 "Do NOT change production code" 或 "Fix tests only" |
| 输出含糊："Fix it" | 明确："Return summary of root cause and changes" |

## 代理返回后的核查

1. **阅读每份摘要** — 弄清改动内容
2. **检查冲突** — 是否编辑了同一文件
3. **跑完整套件** — 确认各修复协同工作
4. **抽查** — 代理可能犯系统性错误

## 相关文档

- `references/subagent-driven-development.md` — 顺序的逐任务派发（不同模式）
- `references/systematic-debugging.md` — 失败相关时的合并调查
- `references/requesting-code-review.md` — 单评审者派发
