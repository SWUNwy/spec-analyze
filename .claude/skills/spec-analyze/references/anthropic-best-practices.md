# Skill 编写最佳实践（Skill Authoring Best Practices）

> 改编自 Anthropic 官方 skill 编写文档与 superpowers 插件 v6.1.1（MIT）。语气对齐 analyze。

**何时加载：** 部署前创建、编辑或评审 skill 时。把 Anthropic 已发布指导压缩为操作规则。

概念背景见 [Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)。

## 核心原则

### 简洁为王

上下文窗口是公共资源。你的 skill 与系统提示、对话历史、其他 skill 元数据、用户实际请求共享它。

**默认假设：** 代理已经很聪明。只加他们不知道的。质疑每段内容：
- 代理真的需要这个解释吗？
- 能假设代理知道这个吗？
- 这段配得上它的 token 成本吗？

**好（简洁）：**
```markdown
## Extract PDF text

Use pdfplumber:

```python
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```
```

**坏（冗长）：** 任何解释 PDF 是什么、有哪些库、或为何推荐 pdfplumber 的版本。

### 设定合适的自由度

让具体度匹配任务的脆弱度。

| 自由度 | 何时用 | 形式 |
|---|---|---|
| 高 | 多个方法有效；依赖上下文；启发式 | 文本指令 |
| 中 | 存在首选模式；有些变体；配置驱动 | 伪代码或参数化脚本 |
| 低 | 脆弱操作；一致性关键；精确顺序 | 具体脚本，无参数 |

**类比：** 机器人探索路径。
- 悬崖边的窄桥 → 低自由度（精确命令，无标志）。示例：数据库迁移。
- 无险阻的开阔地 → 高自由度（大方向）。示例：代码评审。

### 用计划使用的所有模型测试

skill 叠加在模型上；有效性取决于底层模型。用每个会加载 skill 的模型测试：

| 模型 | 问题 |
|---|---|
| Haiku（快、经济） | skill 提供足够指导吗？ |
| Sonnet（均衡） | skill 清晰高效吗？ |
| Opus（强推理） | skill 避免过度解释吗？ |

适合 Opus 的可能需要为 Haiku 加细节。目标：在你覆盖的所有模型上有效。

## Skill 结构

### Frontmatter（必需）

两个 YAML 字段，合计最多 1024 字符：
- `name` — 仅字母、数字、连字符（最多 64 字符）
- `description` — 第三人称，只描述何时使用（不描述做什么）

### 命名

主动语态、动词开头、动名词形式优先：
- ✅ `creating-skills`、`processing-pdfs`、`analyzing-spreadsheets`
- ✅ 可接受：名词短语（`PDF Processing`）、行动导向（`Process PDFs`）
- ❌ 避免：`Helper`、`Utils`、`Tools`、`Documents`、`Data`、`Files`

### Description（关键——驱动发现）

description 被注入系统提示并把关 skill 选择。代理仅凭该字段从潜在 100+ skill 中选择。

规则：
- 只第三人称（系统提示注入需要一致）
- 具体术语与触发
- 既描述做什么也描述何时用
- 绝不总结工作流

```yaml
# ❌ BAD: summarizes workflow — agents follow this instead of reading skill
description: Use when executing plans — dispatches subagent per task with code review between tasks

# ✅ GOOD: triggering conditions only
description: Use when executing implementation plans with independent tasks in the current session
```

**经验发现：** 测试揭示，总结工作流的 description 导致代理只做一次评审，即使 skill 流程图明确要求两次。改成只写触发条件后行为正确。

### 渐进披露

SKILL.md 是概览。细节按需加载。规则：
- SKILL.md 正文保持在 500 行以内
- 接近上限时拆分内容
- 三种模式：

**模式 1：高层指南 + 引用**
```markdown
## Quick start
[code in SKILL.md]

## Advanced features
**Form filling**: See FORMS.md
**API reference**: See REFERENCE.md
```

**模式 2：按域组织**
```
skill/
├── SKILL.md (navigation)
└── reference/
    ├── finance.md
    ├── sales.md
    └── product.md
```
用户问营收时，只加载 `reference/finance.md`。

**模式 3：条件细节**
```markdown
## Creating documents
Use docx-js. See DOCX-JS.md.

## Editing documents
For simple edits, modify XML directly.
**For tracked changes**: See REDLINING.md
```

### 避免深层嵌套引用

代理部分读引用文件。引用保持从 SKILL.md 一级深。

❌ 坏：`SKILL.md → advanced.md → details.md → actual content`
✅ 好：`SKILL.md → advanced.md`（以及 `SKILL.md → details.md`）

### 长引用文件用 TOC

引用文件 >100 行时，顶部加 TOC，让部分读取也能看到范围：
```markdown
# API Reference

## Contents
- Authentication and setup
- Core methods
- Advanced features
- Error handling
```

## 内容指南

### 避免时效敏感信息

```markdown
# ❌ Bad (becomes wrong)
If you're doing this before August 2025, use the old API.

# ✅ Good
## Current method
Use v2 API: `api.example.com/v2/messages`

## Old patterns
<details>
<summary>Legacy v1 API (deprecated 2025-08)</summary>
The v1 API used `api.example.com/v1/messages` — no longer supported.
</details>
```

### 一致术语

选一个词并全篇使用：
- ✅ 总是 "API endpoint"
- ❌ 混用 "API endpoint"、"URL"、"API route"、"path"

## 常见模式

### 模板模式

严格度匹配需求。API 响应/数据格式要严格；分析/报告灵活。

### 示例模式

输出质量依赖风格的 skill，提供输入/输出对：

```markdown
**Example 1:**
Input: Added user authentication with JWT tokens
Output:
feat(auth): implement JWT-based authentication

Add login endpoint and token validation middleware
```

3 个示例胜过一段描述。

### 条件工作流模式

```markdown
1. Determine modification type:
   **Creating?** → Creation workflow
   **Editing?** → Editing workflow
2. Creation workflow: [steps]
3. Editing workflow: [steps]
```

### 带检查清单的工作流

复杂多步工作流给代理可复制的检查清单：

```markdown
Copy and track progress:
- [ ] Step 1: Analyze form
- [ ] Step 2: Create mapping
- [ ] Step 3: Validate
- [ ] Step 4: Execute
- [ ] Step 5: Verify
```

### 反馈循环

验证器 → 修错误 → 重复。对质量关键。

```markdown
1. Make edits
2. **Validate immediately**: `python validate.py path/`
3. If fails: fix, validate again
4. Only proceed when validation passes
```

## 评估与迭代

### 先建评估

写大量文档前先创建评估。确保 skill 解决真实问题，而非想象的问题。

**评估驱动开发：**
1. 识别缺口——无 skill 在代表性任务上跑代理；记录失败
2. 创建评估——三个测试缺口的场景
3. 建立基线——测无 skill 的代理表现
4. 写最小指令——刚好覆盖缺口
5. 迭代——跑评估、对比基线、精修

**评估结构：**
```json
{
  "skills": ["pdf-processing"],
  "query": "Extract all text from this PDF file",
  "files": ["test-files/document.pdf"],
  "expected_behavior": [
    "Reads the PDF using an appropriate library",
    "Extracts text from all pages",
    "Saves output in readable format"
  ]
}
```

### 与代理迭代开发

最有效的流程用两个代理实例：

| 角色 | 工作 |
|---|---|
| Agent A（专家） | 用你的领域专长设计与精修 skill |
| Agent B（用户） | 在真实任务上测试 skill；通过行为揭示缺口 |

工作流：
1. 无 skill 完成一个任务——注意你反复提供什么上下文
2. 识别可复用模式
3. 请 Agent A 创建捕获它的 skill
4. 简洁性评审——移除代理已知道的解释
5. 改进信息架构——把 schema 拆进引用文件
6. 用 Agent B 在相似任务上测试
7. 按观察行为迭代

### 观察代理如何导航 skill

观察：
- **意外探索路径** — 代理按你没预料的顺序读文件；结构可能不直观
- **错失连接** — 代理没跟引用；链接需要更显式
- **过度依赖章节** — 代理反复读同一文件；该内容可能属于 SKILL.md
- **被忽略内容** — 代理从不访问捆绑文件；它可能没必要

基于观察迭代，不基于假设。

## 进阶：带可执行代码的 skill

### 解决问题，不要踢皮球

脚本里处理错误条件。不要失败后让代理自己摸索。

```python
# ✅ Solves
def process_file(path):
    try:
        with open(path) as f: return f.read()
    except FileNotFoundError:
        print(f"{path} missing, creating default")
        with open(path, 'w') as f: f.write('')
        return ''
    except PermissionError:
        print(f"Cannot access {path}, using default")
        return ''

# ❌ Punts
def process_file(path):
    return open(path).read()
```

### 论证配置值（Ousterhout 定律）

```python
# ✅ Self-documenting
REQUEST_TIMEOUT = 30  # typical HTTP completion; allows slow connections
MAX_RETRIES = 3       # most intermittent failures resolve by retry 2

# ❌ Magic numbers
TIMEOUT = 47   # why 47?
RETRIES = 5    # why 5?
```

### 提供工具脚本

预制脚本胜过代理生成代码：更可靠、省 token、省时间、保证一致。

**关键区分：** 明确代理应：
- **执行**（最常见）：`Run analyze_form.py to extract fields`
- **作为参考读**（复杂逻辑）：`See analyze_form.py for the extraction algorithm`

### 创建可验证的中间输出

复杂开放式任务用 plan-validate-execute 模式：分析 → 建计划文件 → 验证计划 → 执行 → 验证。

何时用：批量操作、破坏性改动、复杂验证规则、高利害操作。

实现提示：让验证脚本啰嗦——`"Field 'signature_date' not found. Available: customer_name, order_total, signature_date_signed"`——帮代理修问题。

### 视觉分析

输入可渲染为图像时用代理视觉：
```markdown
1. Convert PDF to images: `python pdf_to_images.py form.pdf`
2. Analyze each page image to identify fields
3. Agent sees field locations and types visually
```

### 包依赖

| 平台 | 能力 |
|---|---|
| claude.ai | 可从 npm、PyPI、GitHub 安装 |
| Anthropic API | 无网络访问；无运行时安装 |

在 SKILL.md 列出所需包并验证可用性。

### MCP 工具引用

总是用全限定工具名：`ServerName:tool_name`。

```markdown
# ✅ Good
Use the BigQuery:bigquery_schema tool to retrieve schemas.
Use the GitHub:create_issue tool.

# ❌ Bad — may fail to locate tool
Use bigquery_schema.
```

### 不要假设工具已安装

```markdown
# ❌ Bad
Use the pdf library.

# ✅ Good
Install: `pip install pypdf`
Then:
```python
from pypdf import PdfReader
reader = PdfReader("file.pdf")
```
```

## 反模式

| 反模式 | 修复 |
|---|---|
| Windows 风格路径（`scripts\helper.py`） | 总是正斜杠（`scripts/helper.py`） |
| 提供太多选项（"use pypdf, pdfplumber, PyMuPDF, ..."） | 给默认 + 逃生舱 |
| 深层嵌套引用 | 从 SKILL.md 一级深 |
| 主内容里的时效敏感信息 | 移到 "old patterns" 章节 |
| 术语不一致 | 选一个词，全篇使用 |
| 泛化命名（`Helper`、`Utils`） | 主动语态、动词开头 |
| description 里总结工作流 | description = 只写触发条件 |
| 未测试 skill | 至少三个评估；先基线 |

## 高效 skill 检查清单

### 核心质量

- [ ] Description 具体，包含 what 与 when
- [ ] SKILL.md 正文 500 行内
- [ ] 无时效敏感信息（或移到 "old patterns"）
- [ ] 术语一致
- [ ] 具体示例
- [ ] 引用一级深
- [ ] 恰当使用渐进披露
- [ ] 工作流有清晰步骤

### 代码与脚本

- [ ] 脚本解决问题而非踢皮球
- [ ] 显式、有帮助的错误处理
- [ ] 无魔数（全部值有论证）
- [ ] 必需包已列出并验证
- [ ] 清晰的脚本文档
- [ ] 只正斜杠路径
- [ ] 关键操作有验证/校验
- [ ] 质量关键任务有反馈循环

### 测试

- [ ] 至少创建三个评估
- [ ] 写内容前测过基线
- [ ] 用全部目标模型测试
- [ ] 用真实使用场景测试
- [ ] 纳入团队反馈（适用时）

## 参考

- Anthropic Skills overview — https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- `references/writing-skills.md` — skill 创建的方法论参考
- `references/testing-skills-with-subagents.md` — skill 的 TDD
- `references/persuasion-principles.md` — 压力场景为何有效
