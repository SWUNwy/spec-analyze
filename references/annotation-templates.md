# Annotation Type Templates

> Extends the L1/L2/L3 annotation tier system with **interaction pattern types**. While L1/L2/L3 controls annotation breadth (how many fields a component gets), the type system controls annotation **depth and structure** — what fields a component *must* have based on its interaction pattern.

---

## 1. Motivation

The flat L1/L2/L3 framework has a blind spot: it treats all components uniformly, but different interaction patterns need different annotation structures:

| Problem | Example | Consequence |
|---------|---------|-------------|
| Same tier, different needs | Dropdown (T4) vs Form (T6) both at L2 | Form missing API error state, Dropdown over-specified |
| State coverage varies by type | A DataList needs empty+loading+error; a Button only needs normal+disabled | Under-specified or inconsistent state coverage |
| Shared logic repeated | Every modal repeats "ESC closes, overlay click closes" | Inconsistent, easy to miss |

The type system solves this by classifying each component into an **interaction pattern type** (T1-T11), each with:
- **Mandatory fields** — what annotation fields this type requires
- **State machine** — minimum states this type must cover
- **Shared blocks** — reusable annotation chunks (dialog context, API calls, permissions)

---

## 2. Type Classification: 11 Interaction Patterns

| Type | Pattern | Examples | Mandatory Fields | States (min) |
|------|---------|---------|-----------------|--------------|
| **T1** | Static Display | Label, Badge, Avatar, Icon | trigger, dismiss | normal |
| **T2** | Data List | Table, CardList, LogList | trigger, behavior, state | normal / loading / empty / error |
| **T3** | Action Trigger | Button, IconButton, Link | trigger, behavior, state, dismiss | normal / disabled / loading |
| **T4** | Dropdown / Select | Dropdown, Select, Menu | trigger, behavior, state, dismiss, placement | normal / open / closed |
| **T5** | Dialog / Modal | ConfirmModal, FormModal | trigger, behavior, state, dismiss, timing | normal / open / submitting / apiError |
| **T6** | Form Fill | Form, InputGroup, Editor | trigger, behavior, state, style, timing | normal / fieldError / submitting / success / apiError |
| **T7** | Search / Filter | SearchInput, FilterBar, SearchableSelect | trigger, behavior, state, dismiss, timing | idle / focus / searching / selected / empty / error |
| **T8** | Toggle / Switch | Toggle, Checkbox, RadioGroup | trigger, behavior, state | normal / disabled / checked |
| **T9** | Notification | Toast, Alert, Banner | trigger, behavior, state, placement, timing | hidden / show |
| **T10** | Navigation | Tab, Breadcrumb, Pagination | trigger, behavior, state | normal / active / disabled |
| **T11** | Inline Edit | EditableCell, InlineInput | trigger, behavior, state, dismiss, timing | normal / editing / submitting / apiError |

### 2.1 Selection Rules

- **One component = one type** (select the closest match)
- If ambiguous, choose the type with **more mandatory fields** (conservative)
- Complex components may contain sub-components of different types (see §4 Nesting)

---

## 3. Shared Blocks

Shared blocks are reusable annotation chunks that appear across multiple component types. They reduce repetition and ensure consistency.

### Block A: Dialog Context

Applied to: T4 (when inside a dialog), T5 (always), T6 (when inside a dialog)

```markdown
[Dismiss]  ESC key → close
           Click overlay mask → close
           Click [Cancel] button → close
[Timing]   200ms slideUp / fadeIn
```

### Block B: API Call Declaration

Applied to: Any component that makes API calls. Declared as a separate section after Behavior.

```markdown
[API]      GET /api/resource?param={value}
           → 200: {list: [...], total: N}
           → 4xx: Toast error(message)
           → 503: Toast "服务暂不可用"
```

### Block C: Permission / Access Control

Applied to: Components with restricted access.

```markdown
[Permission]  currentUser.role === 'admin' → show
              currentUser.role === 'viewer' → hide / disable
```

---

## 4. Nesting Rules

### 4.1 Parent-Child Relationship

When a component contains sub-components, the parent defines the **context**, and children define **local behavior**:

```
@ParentComponent L2            ← context: dialog open/close
  ├── @ChildInput L2           ← local: field validation
  ├── @ChildDropdown L2        ← local: selection
  └── @ChildButton L2          ← local: submit action
```

### 4.2 Context Inheritance

Children inherit from parent context:

| Inherited | Not Inherited |
|-----------|---------------|
| Dialog open/close behavior | Field validation rules |
| API endpoint | Individual field format constraints |
| Dismiss conditions (ESC/overlay) | Specific trigger conditions |

### 4.3 Annotation Strategy for Nested Components

| Nesting Depth | Strategy | Example |
|---------------|----------|---------|
| Parent only | Annotate parent, skip children | Simple list with standard items |
| Parent + key children | Parent context + annotate complex children | Modal with search field |
| Full flattening | All children annotated independently | Form with multiple field types |

**Default**: Parent + key children. Only flatten fully when children have complex independent behavior.

---

## 5. Type-Specific Field Requirements

### 5.1 Trigger Field Rules

| Type | Trigger Must Cover |
|------|-------------------|
| T1 Static | Page load / data bound |
| T2 DataList | Page load / refresh / filter change |
| T3 Action | Click / Enter (keyboard) |
| T4 Dropdown | Click toggle / hover open |
| T5 Dialog | Open action / close triggers |
| T6 Form | Field blur / form submit / field change |
| T7 Search | Input (keystroke) / focus / select |
| T8 Toggle | Click / keyboard Space |
| T9 Notification | Trigger event / auto-dismiss timer |
| T10 Nav | Click / programmatic set |
| T11 Inline | Click to edit / blur to save / Enter to save |

### 5.2 Behavior Field Rules

| Type | Content Requirements |
|------|---------------------|
| T1 | No behavior field needed (or minimal: "displays data") |
| T2 | Filter logic + sort logic + pagination logic |
| T3 | Action description + API mapping (if applicable) |
| T4 | Open logic + item structure + selection behavior + close logic |
| T5 | Open flow + confirm action + cancel flow + result handling |
| T6 | Validation rules (per field) + submit flow + success/failure handling |
| T7 | Search debounce + matching logic + selection behavior + empty handling |
| T8 | Toggle logic + state change callback |
| T9 | Show trigger + duration + hide logic |
| T10 | Tab switch logic + active state tracking |
| T11 | Edit mode toggle + save/cancel logic + validation |

### 5.3 State Field Rules

Each type has a **state machine** — a minimum set of states that must be covered:

| Type | Required States | Optional States |
|------|----------------|-----------------|
| T1 | normal | — |
| T2 | normal, loading, empty, error | filtering, paginating |
| T3 | normal, disabled, loading | focused, pressed |
| T4 | normal (closed), open | disabled, searching |
| T5 | normal (closed), open, submitting | apiError, success |
| T6 | normal, fieldError, submitting, success, apiError | dirty, pristine |
| T7 | idle, focus, searching, selected, empty, error | — |
| T8 | normal, disabled, checked | focused |
| T9 | hidden, show | — |
| T10 | normal, active | disabled |
| T11 | normal, editing, submitting | apiError |

---

## 6. Content Language Quality Rules

### 6.1 Product Language (No Code)

Behavior and state descriptions must use **product language**, not code:

```
❌ Bad:  count(type=internal AND status=active)
✅ Good: 类型为"内部"且状态为"开启"的流量主数量

❌ Bad:  publishers.filter(p => p.type === 'internal').length
✅ Good: 从全部流量主中筛选出 type 为"内部"的条目计数

❌ Bad:  selectedIds Set 更新
✅ Good: 选中状态切换，已选集合同步更新
```

### 6.2 Precision (No Vague Words)

| Vague | Precise |
|-------|---------|
| "相关数据" | "内部流量主数量 / 总流量主数量 / 活跃内部流量主数量" |
| "合适提示" | "「该人员已拥有内部流量主账号」" |
| "校验" | "名称不可为空；邮箱格式 + 唯一性校验；密码 12 位含大小写 + 数字 + 特殊字符" |
| "刷新" | "重新调用 GET /api/resource 接口更新列表" |

### 6.3 Completeness

- No placeholders (`{...}`) — every field must have content
- No "N/A" — if a field doesn't apply, state why
- Vague quantification like "N个" or "M条" is only allowed in templates (SKILL.md / output-templates.md), never in delivered annotations

### 6.4 Traceability

Every annotation block should reference its source requirement:

```
@StatsCardRow L2    ← proposal.md F001
Trigger: 页面加载 → 计算 3 张卡片数据
Behavior: 卡片一 = 内部流量主数量（type=internal）
          卡片二 = 总流量主数量（all）
          卡片三 = 活跃内部流量主数量（type=internal AND status=active）
Dismiss: 新增/删除/标记状态后 → 重新计算
```

---

## 7. Complete Annotation Block Structure

### 7.1 Standard Order

```markdown
@ComponentName L{level}    ← proposal.md F00X

[Trigger]
[Behavior] (include API declaration or separate [API] block)
[Placement] (if applicable)
[Style] (if L2+)
[State]
[Timing] (if applicable)
[Dismiss]
[Responsive] (if L3)
[Accessibility] (if L3)
```

### 7.2 Filled Example (T6 FormFill)

```markdown
@DetailEditForm L2    ← proposal.md F015

[Trigger]   点击「编辑」→ 基础信息区切换为编辑表单
            blur → 触发单个字段校验
            点击「保存」→ 触发全部校验 + API 调用

[Behavior]  编辑态切换：点击编辑 → 展示区变为可编辑表单；点击取消 → 恢复展示态，丢弃修改
            字段校验：
            ├── 名称：blur → 不可为空 → 空则显示红色边框 + "请输入流量主名称"
            ├── 邮箱：blur → 邮箱格式校验（含 @ 和域名）→ "请输入合法邮箱地址"
            └── 邮箱：blur → 唯一性校验（调用接口）→ "该邮箱已被其他流量主使用"

[API]       PUT /api/publishers/{id}
            Body: {name: string(required), email: string(required, email format, unique),
                   country: string(optional), timezone: string(optional)}
            → 200: 更新成功 → Toast "保存成功" → 恢复展示态
            → 409: 邮箱冲突 → 邮箱字段红色边框 + "该邮箱已被其他流量主使用"
            → 503: "保存失败，请重试" → 保持编辑态，不关闭

[Style]     编辑态：输入框白色背景、1px #d1d5db 边框、focus #2563eb 蓝色边框
            展示态字段灰色底色 (#f9fafb)
            按钮：「保存」蓝色 #2563eb、「取消」白色 #fff 灰色边框

[State]     normal: 展示态，纯文字展示
            fieldError: 字段红色边框 + 红色错误文案
            submitting: 保存按钮 loading + disabled
            success: 保存成功 → Toast → 恢复 normal 展示态
            apiError: 接口异常 → Toast 错误提示，保持编辑态

[Dismiss]  点击取消 → 恢复展示态，丢弃修改
            保存成功 → 自动恢复展示态
```

### 7.3 Filled Example (T2 DataList)

```markdown
@PublisherTable L2    ← proposal.md F002

[Trigger]   页面加载 → getFilteredData() 过滤 → 渲染当前页

[Behavior]  搜索筛选：输入文字 → 实时匹配 name/publisherId（case-insensitive contains）
            分类筛选：「全部 / 内部流量主 / 外部流量主」→ 过滤 type 字段
            点击行 → 选中/取消 checkbox
            全选 → 选中当前页全部 / 取消全选
            分页 → 切换页码 → 重新渲染当前页数据

[API]       GET /api/publishers?page={n}&pageSize=8&search={q}&type={filter}
            → 200: {list: [...], total: N}
            → 4xx: Toast "数据加载失败"

[Style]     表格 1px #e5e7eb 边框, 表头背景 #f9fafb
            悬停行背景 #f9fafb
            选中行背景 #eff6ff

[State]     normal: 数据正常展示，分页导航可见
            loading: 骨架屏占位（8 行）
            empty: 「暂无内部流量主」+ [添加已有流量主] [分配内部流量主]
            error: 「数据加载失败」+ 重试按钮

[Dismiss]  无数据 → 空态；搜索无结果 → 保留搜索框内容 + 空态
```

---

## 8. Complete Annotation Generation Process

### Step 8a: Component Enumeration (Before Writing Any Annotations)

1. List all interactive components on the page
2. Map each component to a type (T1-T11)
3. Determine nesting relationships (parent-child)
4. Verify: no omissions, no phantom items

**Output**: A component enumeration table:

| # | Component | Type | Parent | Level | F00X Ref |
|---|-----------|------|--------|-------|----------|
| C01 | @StatsCardRow | T1 Static | — | L1 | F001 |
| C02 | @PublisherTable | T2 DataList | — | L2 | F002 |
| C03 | @BatchDropdown | T4 Dropdown | — | L2 | F007 |
| ... | ... | ... | ... | ... | ... |

### Step 8b: Annotation Generation (Per Component)

For each component in the enumeration table:

1. Start from the type template (mandatory fields + state machine)
2. Fill fields with product language (§6.1-6.2)
3. Add shared blocks as applicable (A: Dialog, B: API, C: Permission)
4. Verify completeness against type requirements (§5)

### Back-Propagation Rule

When annotations are later embedded into an HTML prototype (see `html-annotation-system.md`), any corrections made during embedding must be **synced back** to the source documents:

```
prototype corrections → design.md → tasks.md → proposal.md
```

Mark back-propagated changes with `[BP]` tag in commit messages.

---

## 9. File Index

| File | Purpose |
|------|---------|
| `annotation-templates.md` | This file — type system, content rules, generation process |
| `html-annotation-system.md` | HTML annotation embedding — when/how to embed annotations into prototypes |
