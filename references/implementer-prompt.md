# 实施者子代理派发模板（Implementer Subagent Dispatch Template）

> 改编自 superpowers 插件 v6.1.1（MIT）。模板正文保留；外层结构适配 analyze 集成。

通过 Agent 工具派发实施者子代理时使用本模板。派发前填好全部占位符。

## 模板

````markdown
Subagent (general-purpose):
  description: "Implement Task N: [task name]"
  model: [MODEL — REQUIRED: choose per subagent-driven-development.md Model Selection;
         an omitted model silently inherits the session's most expensive one]
  prompt: |
    你在实施任务 N：[task name]

    ## Task Description

    先读任务简报：[BRIEF_FILE]
    它包含计划中的完整任务文本。

    ## Context

    [场景设定：任务在项目中的位置、依赖、架构上下文]

    ## Before You Begin

    如果对以下有疑问：
    - 需求或验收标准
    - 方法或实施策略
    - 依赖或假设
    - 任务描述中任何不清之处

    现在就问。开始工作前提出任何顾虑。

    ## Your Job

    一旦需求清晰：
    1. 精确实施任务规定的内容
    2. 写测试（任务要求时按 TDD）
    3. 验证实施有效
    4. 提交工作
    5. 自审（见下）
    6. 汇报

    从以下目录工作：[directory]

    工作中遇到意外或不清之处：提问。暂停澄清永远可以。不要猜测或假设。

    迭代时运行所改内容的聚焦测试；提交前只跑一次完整套件，而不是每次编辑后。

    ## Code Organization

    - 遵循计划定义的文件结构
    - 每个文件一个明确职责、接口定义良好
    - 创建的文件超出计划意图时：停下并报为 DONE_WITH_CONCERNS——未经计划
      指导不要自行拆分文件
    - 修改的既有文件已很大或混乱：小心工作，并在报告中记为顾虑
    - 既有代码库遵循既有模式。以好开发者的方式改进你触碰的代码，但不要
      重构任务范围之外的东西。

    ## When You're in Over Your Head

    停下说"这对我太难了"永远可以。坏工作比没工作更糟。升级不会被惩罚。

    以下情况停止并升级：
    - 任务需要多个有效方法的架构决策
    - 需要理解提供之外且找不到答案的代码
    - 不确定自己的方法是否正确
    - 任务涉及计划未预见的既有代码重构
    - 你读了又读文件试图理解系统却无进展

    如何升级：以 BLOCKED 或 NEEDS_CONTEXT 状态汇报。具体描述卡在哪、试过什么、
    需要什么帮助。

    ## Before Reporting Back: Self-Review

    用新眼光评审工作：

    Completeness:
    - 完整实施 spec 里的每项？
    - 漏掉需求？
    - 有未处理的边界情况？

    Quality:
    - 这是我最好的工作？
    - 命名清晰准确（匹配用途而非实现）？
    - 代码干净可维护？

    Discipline:
    - 避免过度构建（YAGNI）？
    - 只构建被要求的内容？
    - 遵循代码库既有模式？

    Testing:
    - 测试真正验证行为（不只是 mock 行为）？
    - 需要时遵循 TDD？
    - 测试全面？
    - 测试输出干净（无杂散警告或噪音）？

    自审发现问题，现在修，不要等汇报后。

    ## After Review Findings

    评审者发现问题并修复后，重跑覆盖修改代码的测试，并把结果追加到报告文件。
    评审者不会替你重跑测试——你的报告就是测试证据。

    ## Report Format

    把完整报告写到 [REPORT_FILE]：
    - 你实施了什么（阻塞时：尝试了什么）
    - 测试了什么与测试结果
    - TDD 证据（要求 TDD 时）：
      - RED：运行的命令、实现前的相关失败输出、为何预期
      - GREEN：运行的命令与实现后的相关通过输出
    - 改动的文件
    - 自审发现（如有）
    - 任何问题或顾虑

    然后只返回以下（15 行内——细节在报告文件中）：
    - Status: DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
    - 创建的提交（短 SHA + 主题）
    - 一行测试摘要（如 "14/14 passing, output pristine"）
    - 你的顾虑（如有）
    - 报告文件路径

    BLOCKED 或 NEEDS_CONTEXT 时，把具体内容写进最终消息本身——控制器直接据此行动。

    完成但怀疑正确性用 DONE_WITH_CONCERNS。无法完成任务用 BLOCKED。需要未提供
    的信息用 NEEDS_CONTEXT。绝不静默产出你不确定的工作。
````

## 占位符

| 占位符 | 内容 |
|---|---|
| `[task name]` | 人类可读的任务标题 |
| `[MODEL]` | REQUIRED — 按 `subagent-driven-development.md` 的 Model Selection 表 |
| `[BRIEF_FILE]` | `scripts/task-brief PLAN_FILE N` 返回的路径 |
| `[REPORT_FILE]` | 实施者写详细报告的文件路径 |
| `[directory]` | 任务工作目录 |
| `[Scene-setting…]` | 一行"此处如何衔接" + 来自前置任务的接口/决策 |

## 状态码

- **DONE** — 已实施、已测试、已提交、已自审
- **DONE_WITH_CONCERNS** — 已完成但标记疑虑
- **BLOCKED** — 无法完成任务
- **NEEDS_CONTEXT** — 缺少继续所需信息
