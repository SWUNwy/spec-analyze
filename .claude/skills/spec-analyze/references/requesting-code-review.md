# 请求代码评审（Requesting Code Review）

> 改编自 superpowers 插件 v6.1.1（MIT）。方法论保留；语气对齐 analyze。

## 何时加载

完成任务、完成大功能或合并前加载。派发代码评审子代理，让其对照计划与质量标准评估 diff。

## 核心原则

早评审，常评审。评审者拿到精心构造的上下文——**绝不是你的会话历史**。这让评审者聚焦工作产物，并保留你的上下文继续工作。

## 何时请求

**强制：**
- `subagent-driven-development.md` 中每个任务之后
- 完成大功能后
- 合并到 main 之前

**可选但有价值：**
- 卡住时（新视角）
- 重构前（基线检查）
- 修复复杂 bug 后

## 如何请求

### 1. 捕获 git 范围

```bash
BASE_SHA=$(git rev-parse HEAD~1)    # or origin/main, or a task-start marker
HEAD_SHA=$(git rev-parse HEAD)
```

### 2. 派发评审子代理

使用 `general-purpose` 子代理类型。用占位符填好的 `references/code-reviewer-template.md` 模板：

| 占位符 | 内容 |
|---|---|
| `[DESCRIPTION]` | 构建内容的简要总结 |
| `[PLAN_OR_REQUIREMENTS]` | 它该做什么（计划文件路径、任务文本或需求） |
| `[BASE_SHA]` | 起始提交 |
| `[HEAD_SHA]` | 结束提交 |

### 3. 处理反馈

| 严重度 | 动作 |
|---|---|
| Critical | 立即修复，先于任何其他工作 |
| Important | 继续前修复 |
| Minor | 记下稍后处理，或顺手修 |

评审者错了，用技术推理顶回。见 `receiving-code-review.md`。

## 评审者输出格式

评审者返回：

- **Strengths** — 做得好之处（具体）
- **Issues**
  - Critical（必须修）
  - Important（应该修）
  - Minor（有更好）
- **Recommendations** — 质量、架构、流程改进
- **Assessment** — Ready to merge: Yes / No / With fixes

每个 issue 包含 file:line 引用、哪里错、为何重要、怎么修。

## 与执行的集成

| 工作流 | 何时评审 |
|---|---|
| `subagent-driven-development.md` | 每个任务之后——在问题叠加前抓住 |
| `executing-plans.md` | 每个任务后或自然检查点 |
| 临时开发 | 合并前；卡住时 |

## 红旗

绝不：
- 因为"它简单"跳过评审
- 忽略 Critical issue
- 带着未修的 Important issue 继续
- 与有效的技术反馈争论

评审者错了：
- 用技术推理顶回
- 展示证明工作的代码/测试
- 请求澄清

## 参考

- `references/code-reviewer-template.md` — 完整派发模板
- `references/receiving-code-review.md` — 反馈返回后如何处理
- `references/subagent-driven-development.md` — 编排每任务 + 最终评审
