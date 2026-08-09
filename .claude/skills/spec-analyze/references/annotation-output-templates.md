# 输出模板（Output Templates）

三种输出格式对应三条路由路径。Full 路径使用 spec-analyze 独有的标注框架与三文档输出。

## 输出路径

| 路径 | 输出 | 默认位置 |
|---|---|---|
| Lightweight | Insight Brief | 仅对话（不写文件） |
| Standard | Analysis Report + proposal.md | `docs/spec-analyze/reports/YYYY-MM-DD-<topic>-report.md` |
| Full | proposal.md + design.md + tasks.md（+ HTML 原型） | `docs/spec-analyze/specs/R0XX-<topic>/` |
| 已有方案注释 | 补充注释的 design.md / HTML 注释面板 | 输入文件同目录（追加注释，不创建新文件） |

用户偏好覆盖默认值。生成前展示路径。自动创建目标目录。

---

## Lightweight 路径 → Insight Brief

用于快速讨论。保持简洁——半页以内。

```markdown
## Insight Brief: [Topic]

### 核心洞见
1. **[洞见]** — [为什么重要（一句话）]
2. **[洞见]** — [为什么重要（一句话）]
3. **[洞见]** — [为什么重要（一句话）]

### 关键决策
| 决策 | 状态 | 上下文 |
|------|------|--------|
| [已决定或待决定事项] | 已决定 / 待定 | [简要上下文] |

### 下一步
- [ ] [具体动作]
- [ ] [具体动作]
```

---

## Standard 路径 → Analysis Report

用于带方案对比的多视角分析。目标 1-2 页。

```markdown
## Analysis Report: [Topic]

**日期：** [YYYY-MM-DD]
**范围：** [分析内容]
**路径：** Standard（[激活角色]）

### 执行摘要
[2-3 句核心发现与建议]

### 多视角分析

#### [角色 1] 视角
- **发现：** [发现了什么]
- **顾虑：** [要注意什么]
- **建议：** [怎么处理]

#### [角色 2] 视角
- **发现：** [发现了什么]
- **顾虑：** [要注意什么]
- **建议：** [怎么处理]

#### [角色 3] 视角
- **发现：** [发现了什么]
- **顾虑：** [要注意什么]
- **建议：** [怎么处理]

### 方案对比

| 维度 | 方案 A | 方案 B | 方案 C（如适用） |
|------|--------|--------|------------------|
| 模式一致性 | | | |
| 职责分离 | | | |
| 补丁抵抗力 | | | |
| 最小改动 | | | |
| 复杂度 | | | |
| 风险等级 | | | |
| **契合度** | /10 | /10 | /10 |

### 风险与假设

| 项目 | 类型 | 缓解 / 验证 |
|------|------|------------|

### 建议
**[代理建议]** — [2-3 句推理]

### 优先动作
| 优先级 | 动作 |
|--------|------|
| P0 | [必须最先做] |
| P1 | [接下来做] |
| P2 | [有则更好] |
```

---

## Full 路径 → 三文档输出（+ 可选 HTML 注释）

spec-analyze 的核心差异化。产出三份相互关联的文档，使用 spec-analyze 独有的**标注框架**；已存在原型时，可选注入 **HTML 注释**。

### 标注框架

框架有两个正交层：**类型模板**（决定字段结构）与**注释等级**（决定字段深度）。两层必须同时应用。

#### 层 1：类型模板（见 `references/annotation-templates.md`）

组件按交互模式分为 11 种类型（T1-T11）。每种类型定义：

- 必须存在的字段（如 FormFill 需要 `fields[]`，DataList 需要 `columns`）
- 强制状态覆盖（如 FormFill：normal、fieldError、submitting、success、apiError）
- 适用内容规则（产品语言，不是代码）
- 需要的共享块（DialogContext / APICall / Permission）

**使用规则：** 总是先把每个组件映射到类型。没有类型匹配时，组件可能是需要新类型定义的新颖交互模式。

#### 层 2：注释等级

| 等级 | 何时使用 | 字段 |
|---|---|---|
| **L1 基础** | 简单交互（hover tooltip、静态展示） | trigger / behavior / dismiss |
| **L2 详细** | 复杂交互（modal、dropdown、表单校验） | L1 + placement / style / state / timing |
| **L3 完整** | 高精度 / 全局组件（DatePicker、Table、Modal） | L2 + accessibility / responsive / i18n |

**使用规则：**
- **L1 默认**：所有注释从 L1 开始
- **按需升级**：仅当 L1 不足以支撑实施时才升级到 L2
- **L3 保留给全局组件**：仅用于跨多页面复用的组件
- **不重复显而易见的事**：Ant Design / MUI 默认行为不需要注释

#### 两层同时应用

1. 识别组件 → 映射类型（T1-T11）→ 确定必需字段
2. 选择注释等级（L1-L3）→ 确定字段深度
3. 对每个类型强制字段，按所选等级的深度填充

**示例：** L2 的 FormFill 组件得到：
- 类型强制字段：trigger、fields[]、api、behavior、context（权限）、dismiss、state（强制：normal、fieldError、submitting、success、apiError）、style
- L2 深度增加：placement（DialogContext）、timing（200ms）、完整状态描述
- 类型模板中没有的字段（如 pagination）省略

#### 字段定义

```
L1 公共字段（按类型模板应用）
──────────────────────────────────────
trigger   触发条件      hover / click / focus / scroll / blur
behavior  行为描述      描述用户可感知的结果，而非实现
dismiss   关闭条件      mouse leave / click outside / Esc / auto-dismiss / confirm/cancel

L2 增加（按类型模板应用）
──────────────────────────────────────
placement 显示位置      center / topRight / dropdown / tooltip direction
style     视觉细节      color / spacing / font / z-index / border / shadow
state     状态行为      见 annotation-templates.md §4 的类型最小覆盖
timing    动画与延迟     200ms fade in / 100ms fade out / 300ms debounce

L3 增加
──────────────────────────────────────
accessibility  无障碍    Tab focus / Enter triggers / Esc closes / aria-label
responsive   响应式      Touch fallback / small screen adaptation / print
i18n         国际化      是否需要翻译
```

#### 状态规格规则

状态覆盖是**类型强制**的，不是可选的。`annotation-templates.md` §4 的每个类型模板定义最小状态：

| 类型 | 强制状态覆盖 |
|------|--------------|
| DisplayMetric | normal、loading、error |
| DataList | normal、loading、empty、error |
| ActionButton | normal、disabled、loading |
| ActionMenu | normal、open、disabled |
| ConfirmAction | normal、submitting、error |
| FormFill | normal、fieldError、submitting、success、apiError |
| ItemSelect | normal、loading、empty、searchEmpty、selected、confirming、error |
| SearchSelect | idle、focus、searching、selected、empty、error |
| Toast | show、hidden |
| StatusPlaceholder | empty、loading、error |
| PageInfo | hidden、visible |

每个状态必须覆盖两个视角：

| 视角 | 要求 | 示例 |
|---|---|---|
| **开发视角** | 描述组件在该状态下的行为 | `submitting: button loading + disabled, text "Logging in..."` |
| **测试视角** | 描述从触发到呈现的完整路径 | `error: blur on invalid email → red border + "Invalid email format"` |

#### 角色 ↔ 注释字段映射

| 角色 | 关注字段 | 原因 |
|---|---|---|
| PM / 产品评审 | behavior、context(permission)、data、preCheck | 业务规则、范围、访问控制 |
| 开发 | trigger、behavior、dismiss、state、api、fields.validation | 实现行为、API 集成、错误处理 |
| 测试 | state（全部分支）、trigger、dismiss | 状态转换变成测试用例 |
| UI | style、placement、timing、responsive | 视觉细节、位置、动画 |

### 模板：proposal.md

```markdown
# Proposal — {R0XX-需求名称}

> **需求 ID**：R0XX
> **日期**：YYYY-MM-DD

## 1. 概述

### 1.1 背景
### 1.2 目标
### 1.3 范围
- **范围内**：[功能清单]
- **范围外**：[排除清单]

---

## 2. 功能需求

| ID | 描述 | 优先级 | 验收标准 | 数据注释 | 交互注释 | UI 文案注释 |
|----|------|--------|----------|----------|----------|-------------|
| F001 | [描述] | P0 | [条件] | [字段/格式/边界] | [L 等级 + 行为] | [文案/标签] |

**数据注释** — 必须包含：API 来源 + 格式规则 + 边界值。示例：
```
❌ Bad: email: validate email format
✅ Good: email: string, required, email format (with @ and domain, max 50 chars), empty → "Please enter email"
❌ Bad: POST /api/auth/login
✅ Good: POST /api/auth/login, body: {email: string, password: string}, returns: {token: string}
```

**交互注释** — 必须包含：交互等级 + 一行行为。示例：
```
✅ L2: input → blur individual validation → submit full validation → API → success redirect / failure Toast
✅ L1: click Tab to switch forms, reset validation state
```

**UI 文案注释** — 必须包含全部可见文案。示例：
```
✅ placeholder: "Enter email"; submit: "Log in"; format error → "Invalid email format"
```

---

## 3. 非功能需求

| 类型 | 需求 | 验证方法 |
|------|------|----------|

## 4. 技术依赖

| 依赖 | 来源 | 状态 |
|------|------|------|
```

#### 填充示例（登录页邮箱字段）

```
| F001 | Email-password login | P0 | Enter email+password → login success → redirect to home | email: string, required, email format (with @, max 50); password: string, required, min 6, max 32; POST /api/auth/login body: {email, password} returns {token} | L2: input→blur validation, click login→full validation→API→success store token redirect / failure Toast | placeholder: "Enter email", "Enter password"; format error: "Invalid email format","Password needs at least 6 characters"; submit: "Log in", loading: "Logging in..." |
```

### 模板：design.md

```markdown
# Design Doc — {R0XX-需求名称}

## 1. 设计概述

## 2. 系统架构

## 3. 接口设计

| Endpoint | 方法 | 参数 | 返回 | 错误场景 |
|----------|------|------|------|----------|

## 4. 数据模型

## 5. 组件设计

### 5.1 {组件名称}

| 组件 | 职责 | Props | 状态 |
|------|------|-------|------|
| {名称} | {职责} | {props} | {states} |

#### 注释块 @{组件名} {L 等级}

<!--
  内联注释渲染说明：
  - 此 Annotation Block 渲染为折叠卡片，位于组件内容下方
  - 默认折叠，显示完整 L2 字段
  - 渲染顺序由 type 决定（T1-T11），见 html-annotation-system.md §2.2
  - 视觉锚定：虚线分隔 + 左侧色块 + 背景色区分
  - 每个组件独占一个折叠状态，组件间独立

  v2 字段级注释：
  - 组件内每个字段（统计指标/表格列/表单输入）可附加独立注释
  - 字段级注释用 ℹ️ 触发，弹窗展示
  - 字段级 key 使用 dot notation: componentKey.fieldKey
  - 字段级注释写入 ANNOTATIONS[componentKey].fields 或 .columns 子对象
-->

\```
[Dev]   trigger:   ...
[Dev·Tester] behavior: ...
[UI]   style:     ...
[Tester] state:    ...
[Dev]   dismiss:   ...
\```

#### 示例：注释块 @EmailPasswordForm L2

\```
[Dev]   trigger:   input → blur triggers field validation
                  click "Log in" → triggers full validation + API call
[Dev·Tester] behavior:  blur: validate single field, error→red border + red error text
                  submit: full validation→pass→POST /api/auth/login
                  → success: localStorage.setItem('token') → redirect to home
                  → failure: Toast with backend m field
[UI]   style:     border-radius 4px, height 40px; focus border highlight
[Tester] state:    normal: empty form; focused: focus highlight;
                  error: red border + error text; submitting: button loading + disabled "Logging in..."
[Dev]   dismiss:   success→redirect; failure→restore normal
\```

## 6. 错误处理

| 错误类型 | 场景 | 处理 |
|----------|------|------|

## 7. 附录：字段规格表

| 模块 | 字段 | UI 标签 | 格式约束 | 空值策略 | 数据来源 |
|------|------|---------|----------|----------|----------|

## 8. 组件注册表（Component Manifest）

> 组件注册表，用于 Step 9.5F 交互式注释编辑的组件定位。Full 路径生成时自动填充。

| ID | 名称 | 类型 | 位置 | L 等级 | 字段注释 |
|----|------|------|------|--------|----------|
| C01 | @StatsRow | T1-DisplayMetric | §5.1 | L1 | internal, total, active |
| C02 | @DataTable | T2-DataList | §5.2 | L2 | name, type, status, createdAt |
| C03 | @CreateUserForm | T6-FormFill | §5.2 | L2 | name, email, type |

## 7.5 注释展示模式决策

> 组件枚举完成后，确认注释展示模式偏好。
> 在 Step 8F 输出生成时向用户询问。

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| 内联模式 | 注释在组件下方折叠展示 | 默认推荐，评审者逐组件查看 |
| 侧边面板 | 注释仅在右侧面板展示 | 组件数多（≥10），需要快速切换 |
| 双模式 | 两者同时启用 | 需要同时查看当前组件和全局对比 |
```

### 模板：tasks.md

```markdown
# Task List — {R0XX-需求名称}

## 1. 任务清单

| 任务 ID | 描述 | 预估工时 | 优先级 |
|---------|------|----------|--------|
| T001 | [描述] | [小时] | P0 |

## 2. 任务步骤

### T001: {任务描述}

> **注释引用：**
> - 注释块 → design.md §{章节} @{组件名}
> - 字段文案 → design.md 附录「字段规格表」
> - 数据来源 → design.md §{章节}

1. {步骤 1}
2. {步骤 2}
...

## 3. 依赖
```

---

## 全链路工作流

```
Product requirements (natural language)
   │
   ├── 1. spec-analyze analysis
   │       ├── Route assessment → path selection
   │       ├── Context exploration (files/docs/code)
   │       ├── Multi-role questioning (converge requirements)
   │       ├── Stress testing (identify boundaries & risks)
   │       └── Solution convergence + design presentation → S3
   │
   ├── 1b. Component enumeration & type mapping (see annotation-templates.md)
   │       ├── List all interactive components on the page
   │       ├── Map each to type (T1-T11)
   │       └── Declare nesting relationships → S3a
   │
   ├── 2. Output generation (Full path)
   │       ├── Fill type templates per component (see annotation-templates.md §4)
   │       ├── proposal.md (functional requirements + 3-column annotations)
   │       ├── design.md (component design + annotation blocks + field table)
   │       └── tasks.md (task steps with annotation references)
   │
   ├── 2b. HTML Annotation Build-in (conditional — user agrees in Step 8F)
   │       ├── Step 8F: 确认注释展示模式（内联/侧边/双模式）
   │       ├── If yes: generate HTML FROM SCRATCH with annotation system built in (not retrofitted)
   │       ├──   ├── ANNOTATIONS JS data object (含 type 字段) from design.md Annotation Blocks
   │       │   ├── CSS: 内联注释样式 + 侧边面板样式 (.annot-trigger, .annot-inline, .annot-panel, .annot-overlay, .annot-nav, .annot-body)
   │       │   ├── HTML: 内联容器 + 侧边面板结构 (overlay + panel + nav tabs + trigger buttons + inline containers)
   │       │   └── JS: toggleInline + togglePanel + renderInline + editAnnot + closeAnnot + escapeHtml
   │       ├── 如果选择内联或双模式: 生成带内联注释容器的 HTML
   │       ├── 如果选择纯侧边面板: 使用现有方案（不变）
   │       ├── Then Step 9F: verify annotations are correctly embedded (not re-generate)
   │       └── Run back-propagation: sync HTML annotation fixes back to design.md
   │
   │
   ├── 3. Quality self-check → S4
   │       ├── Content quality: product language, no code syntax, no placeholders
   │       ├── State coverage: per type minimums (see annotation-templates.md §4)
   │       ├── Permission & validation: declared for all relevant components
   │       ├── Cross-component consistency: same type, same depth
   │       ├── Trigger placement: every component has trigger ≤ 8px
   │       └── Error scenarios: coverage against annotation-templates.md error table
   │
   ├── 4. Requirements review
   │       ├── PM → F00X descriptions + acceptance criteria
   │       ├── Dev → data annotation (format constraints) + annotation blocks + field table
   │       ├── Tester → annotation state + error handling + boundary values
   │       └── UI → style colors/spacing + responsive + copy
   │
   ├── 5. Agent development
   │       ├── Read tasks → follow annotation references
   │       ├── Jump to design.md annotation blocks
   │       └── Implement behavior from annotations
   │
   └── 6. Code output
           ├── Field copy → placeholder / label / error text
           ├── Format constraints → regex / length / required
           ├── Interaction behavior → matches design annotations
           └── Boundary handling → matches annotation state
```
