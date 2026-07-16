# Output Templates

Three output formats matching the three routing paths. Full path uses spec-analyze's exclusive annotation framework and triple-document output.

## Output Paths

| Path | Output | Default Location |
|------|--------|-----------------|
| Lightweight | Insight Brief | Conversation only (no file written) |
| Standard | Analysis Report + proposal.md | `docs/spec-analyze/reports/YYYY-MM-DD-<topic>-report.md` |
| Full | proposal.md + design.md + tasks.md (+ HTML prototype) | `docs/spec-analyze/specs/R0XX-<topic>/` |
| 已有方案注释 | 补充注释的 design.md / HTML 注释面板 | 输入文件同目录（追加注释，不创建新文件） |

User preferences override defaults. Show path before generation. Auto-create target directory.

---

## Lightweight Path → Insight Brief

For quick discussions. Keep concise — half a page.

```markdown
## Insight Brief: [Topic]

### Core Insights
1. **[Insight]** — [Why it matters in one sentence]
2. **[Insight]** — [Why it matters in one sentence]
3. **[Insight]** — [Why it matters in one sentence]

### Key Decisions
| Decision | Status | Context |
|----------|--------|---------|
| [What was decided or needs deciding] | Decided / Open | [Brief context] |

### Next Steps
- [ ] [Specific action]
- [ ] [Specific action]
```

---

## Standard Path → Analysis Report

For multi-perspective analysis with approach comparison. Aim for 1-2 pages.

```markdown
## Analysis Report: [Topic]

**Date:** [YYYY-MM-DD]
**Scope:** [What was analyzed]
**Path:** Standard ([personas activated])

### Executive Summary
[2-3 sentences capturing the core finding and recommendation]

### Multi-Perspective Analysis

#### [Persona 1] Perspective
- **Finding:** [What was discovered]
- **Concern:** [What to watch out for]
- **Recommendation:** [What to do about it]

#### [Persona 2] Perspective
- **Finding:** [What was discovered]
- **Concern:** [What to watch out for]
- **Recommendation:** [What to do about it]

#### [Persona 3] Perspective
- **Finding:** [What was discovered]
- **Concern:** [What to watch out for]
- **Recommendation:** [What to do about it]

### Approach Comparison

| Dimension | Approach A | Approach B | Approach C (if applicable) |
|-----------|------------|------------|----------------------------|
| Pattern consistency | | | |
| Responsibility separation | | | |
| Patch resistance | | | |
| Minimal change | | | |
| Complexity | | | |
| Risk level | | | |
| **Fit score** | /10 | /10 | /10 |

### Risks & Assumptions

| Item | Type | Mitigation / Validation |
|------|------|------------------------|

### Recommendation
**[Agent's recommendation]** — [Reasoning in 2-3 sentences]

### Priority Actions
| Priority | Action |
|----------|--------|
| P0 | [Must do first] |
| P1 | [Should do next] |
| P2 | [Nice to have] |
```

---

## Full Path → Triple-Document Output (+ Optional HTML Annotation)

The core differentiator of spec-analyze. Produces three interconnected documents with spec-analyze's exclusive **annotation framework**, plus an optional **HTML Annotation Injection** when a prototype already exists.

### Annotation Framework

The framework has two orthogonal layers: **Type Templates** (determine field structure) and **Annotation Tiers** (determine field depth). Both must be applied together.

#### Layer 1: Type Templates (see `references/annotation-templates.md`)

Components are classified by interaction pattern into 11 types (T1-T11). Each type defines:

- What fields must exist (e.g., FormFill requires `fields[]`, DataList requires `columns`)
- What state coverage is mandatory (e.g., FormFill: normal, fieldError, submitting, success, apiError)
- What content rules apply (product language, not code)
- What shared blocks are needed (DialogContext / APICall / Permission)

**Usage rule:** Always start by mapping each component to a type. If no type fits, the component may be a novel interaction pattern that needs a new type definition.

#### Layer 2: Annotation Tiers

| Tier | When to Use | Fields |
|------|-------------|--------|
| **L1 Core** | Simple interactions (hover tooltip, static display) | trigger / behavior / dismiss |
| **L2 Standard** | Complex interactions (modal, dropdown, form validation) | L1 + placement / style / state / timing |
| **L3 Complete** | High-precision / global components (DatePicker, Table, Modal) | L2 + accessibility / responsive / i18n |

**Usage rules:**
- **L1 default**: all annotations start at L1
- **Upgrade on demand**: only upgrade to L2 when L1 is insufficient for implementation
- **L3 reserved for global components**: only for components reused across multiple pages
- **Don't restate the obvious**: Ant Design / MUI default behavior doesn't need annotation

#### Applying Both Layers Together

1. Identify component → map to type (T1-T11) → determine required fields
2. Choose annotation tier (L1-L3) → determine field depth
3. For each type-mandatory field, fill at the chosen tier's depth

**Example:** A FormFill component at L2 gets:
- Type-mandatory fields: trigger, fields[], api, behavior, context (permission), dismiss, state (mandatory: normal, fieldError, submitting, success, apiError), style
- L2 depth adds: placement (DialogContext), timing (200ms), full state descriptions
- Fields NOT in the type template (e.g., pagination) are omitted

#### Field Definitions

```
L1 Common (applied per type template)
──────────────────────────────────────
trigger   Trigger condition     hover / click / focus / scroll / blur
behavior  Behavior description  Describe user-perceptible outcomes, not implementation
dismiss   Dismiss condition     mouse leave / click outside / Esc / auto-dismiss / confirm/cancel

L2 Adds (applied per type template)
──────────────────────────────────────
placement Display position      center / topRight / dropdown / tooltip direction
style     Visual details        color / spacing / font / z-index / border / shadow
state     State behaviors       See type-specific minimum coverage in annotation-templates.md §4
timing    Animation & delay     200ms fade in / 100ms fade out / 300ms debounce

L3 Adds
──────────────────────────────────────
accessibility  Accessibility    Tab focus / Enter triggers / Esc closes / aria-label
responsive    Responsive        Touch fallback / small screen adaptation / print
i18n          Internationalization   Whether translation is needed
```

#### State Specification Rules

State coverage is **type-mandatory**, not discretionary. Each type template in `annotation-templates.md` §4 defines the minimum states:

| Type | Mandatory State Coverage |
|------|-------------------------|
| DisplayMetric | normal, loading, error |
| DataList | normal, loading, empty, error |
| ActionButton | normal, disabled, loading |
| ActionMenu | normal, open, disabled |
| ConfirmAction | normal, submitting, error |
| FormFill | normal, fieldError, submitting, success, apiError |
| ItemSelect | normal, loading, empty, searchEmpty, selected, confirming, error |
| SearchSelect | idle, focus, searching, selected, empty, error |
| Toast | show, hidden |
| StatusPlaceholder | empty, loading, error |
| PageInfo | hidden, visible |

Each state must cover two perspectives:

| Perspective | Requirement | Example |
|-------------|-------------|---------|
| **Dev perspective** | Describe component behavior in that state | `submitting: button loading + disabled, text "Logging in..."` |
| **Tester perspective** | Describe full trigger-to-presentation path | `error: blur on invalid email → red border + "Invalid email format"` |

#### Role ↔ Annotation Field Mapping

| Role | Fields of Interest | Reason |
|------|-------------------|--------|
| PM / Product Reviewer | behavior, context(permission), data, preCheck | Business rules, scope, access control |
| Dev | trigger, behavior, dismiss, state, api, fields.validation | Implement behavior, API integration, error handling |
| Tester | state (all branches), trigger, dismiss | State transitions become test cases |
| UI | style, placement, timing, responsive | Visual details, position, animation |

### Template: proposal.md

```markdown
# Proposal — {R0XX-Requirement Name}

> **Requirement ID**: R0XX
> **Date**: YYYY-MM-DD

## 1. Overview

### 1.1 Background
### 1.2 Objective
### 1.3 Scope
- **In scope**: [feature list]
- **Out of scope**: [exclusion list]

---

## 2. Functional Requirements

| ID | Description | Priority | Acceptance Criteria | Data Annotation | Interaction Annotation | UI Text Annotation |
|----|-------------|----------|--------------------|-----------------|----------------------|-------------------|
| F001 | [description] | P0 | [conditions] | [field/format/boundary] | [L-level + behavior] | [copy/labels] |

**Data Annotation** — Must include: API source + format rule + boundary values. Example:
```
❌ Bad: email: validate email format
✅ Good: email: string, required, email format (with @ and domain, max 50 chars), empty → "Please enter email"
❌ Bad: POST /api/auth/login
✅ Good: POST /api/auth/login, body: {email: string, password: string}, returns: {token: string}
```

**Interaction Annotation** — Must include: interaction grade + one-line behavior. Example:
```
✅ L2: input → blur individual validation → submit full validation → API → success redirect / failure Toast
✅ L1: click Tab to switch forms, reset validation state
```

**UI Text Annotation** — Must include all visible copy. Example:
```
✅ placeholder: "Enter email"; submit: "Log in"; format error → "Invalid email format"
```

---

## 3. Non-Functional Requirements

| Type | Requirement | Verification Method |
|------|-------------|-------------------|

## 4. Technical Dependencies

| Dependency | Source | Status |
|------------|--------|--------|
```

#### Filled Example (Login Page Email Field)

```
| F001 | Email-password login | P0 | Enter email+password → login success → redirect to home | email: string, required, email format (with @, max 50); password: string, required, min 6, max 32; POST /api/auth/login body: {email, password} returns {token} | L2: input→blur validation, click login→full validation→API→success store token redirect / failure Toast | placeholder: "Enter email", "Enter password"; format error: "Invalid email format","Password needs at least 6 characters"; submit: "Log in", loading: "Logging in..." |
```

### Template: design.md

```markdown
# Design Doc — {R0XX-Requirement Name}

## 1. Design Overview

## 2. System Architecture

## 3. Interface Design

| Endpoint | Method | Parameters | Returns | Error Scenarios |
|-----------|--------|------------|---------|-----------------|

## 4. Data Model

## 5. Component Design

### 5.1 {Component Name}

| Component | Responsibility | Props | State |
|-----------|---------------|-------|-------|
| {Name} | {responsibility} | {props} | {states} |

#### Annotation Block @{ComponentName} {L-level}

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

#### Example: Annotation Block @EmailPasswordForm L2

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

## 6. Error Handling

| Error Type | Scenario | Handling |
|-----------|----------|----------|

## 7. Appendix: Field Specification Table

| Module | Field | UI Label | Format Constraint | Empty Strategy | Data Source |
|--------|-------|----------|-------------------|---------------|-------------|

## 8. Component Manifest

> 组件注册表，用于 Step 9.5F 交互式注释编辑的组件定位。Full 路径生成时自动填充。

| ID | Name | Type | Location | L-level | Field Annotations |
|----|------|------|----------|---------|-----------------|
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

### Template: tasks.md

```markdown
# Task List — {R0XX-Requirement Name}

## 1. Task List

| Task ID | Description | Est. Effort | Priority |
|---------|-------------|-------------|----------|
| T001 | [description] | [hours] | P0 |

## 2. Task Steps

### T001: {Task Description}

> **Annotation references:**
> - Annotation block → design.md §{section} @{ComponentName}
> - Field copy → design.md Appendix "Field Specification Table"
> - Data source → design.md §{section}

1. {step 1}
2. {step 2}
...

## 3. Dependencies
```

---

## Full Workflow

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
