# Quality Self-Check & Review Checklists

Spec-analyze's unique quality assurance system. Each output type has its own self-check checklist, plus cross-doc consistency checks, type-specific checks, HTML annotation checks, and role-specific review checklists.

---

## Quality Gates

### G3a: Component Enumeration Completeness (Step 8a → 8b)

Only checked for Full path. Verifies that all components have been identified before annotation generation.

- [ ] All interactive components on the page are listed
- [ ] Each component is mapped to a type (T1-T11)
- [ ] Each component has a unique ID (C01, C02, ...)
- [ ] Nesting relationships declared (parent-child)
- [ ] Component count: no omissions, no phantom items
- [ ] Each component references its source requirement (F00X)

### G3b: HTML Annotation Readiness (Step 9 → 10)

Only checked for Full path when HTML prototype exists and component count ≥ 3.

- [ ] Project has HTML prototype and component count ≥ 3 (embedding condition met)
- [ ] design.md Annotation Blocks complete, mappable to JS ANNOTATIONS object
- [ ] Each component has unique key (English short identifier)
- [ ] Trigger button placement strategy determined (inline / header / nav)
- [ ] Nav tab icons and short names determined
- [ ] ANNOTATIONS keys ↔ @ComponentName ↔ data-annot attribute: one-to-one match

---

## Proposal Self-Check

- [ ] Each F00X's three annotation columns are filled
- [ ] **Data annotation** marks field source + format constraint + boundary value
  - Field source: API path? Body parameter? Return field?
  - Format constraint: Data type? Length limit? Regex? Enum values?
  - Boundary value: Empty strategy? Default value? Overflow handling?
- [ ] **Interaction annotation** marks grade (L1/L2/L3) + type (T1-T11) + one-line behavior description
- [ ] **UI text annotation** includes all visible copy: placeholder / label / error / tooltip / button text
- [ ] Interaction grade selection is reasonable (no over-annotation: simple interactions don't get L2+)

## Design Self-Check

- [ ] Every interactive component has an annotation block
- [ ] Annotation block fields are complete per type requirement (see annotation-templates.md §5)
- [ ] State coverage meets type-specific minimums (see below)
- [ ] Block B (API Call) declared for all API-calling components
- [ ] **Error handling section covers: network error / validation failure / business error — all three categories**
- [ ] **Field specification table includes: format constraint column (prevents proposal-design information gap)**
- [ ] L3 components supplement with accessibility and responsive annotations

### Type-Specific State Coverage Minimums

| Type | Required States | Check Items |
|------|----------------|-------------|
| T1 Static | normal | N/A — minimal component |
| T2 DataList | normal, loading, empty, error | empty: "暂无X" copy defined; error: retry action defined |
| T3 Action | normal, disabled, loading | disabled condition clear; loading text defined |
| T4 Dropdown | normal(closed), open | open: placement defined; closed: dismiss triggers defined |
| T5 Dialog | normal(closed), open, submitting, apiError | apiError: Toast/keep-open behavior defined |
| T6 Form | normal, fieldError, submitting, success, apiError | fieldError: per-field error msg; submitting: button loading; apiError: Toast |
| T7 Search | idle, focus, searching, selected, empty, error | searching: debounce ms; empty: "未找到" copy; error: "服务异常" copy |
| T8 Toggle | normal, disabled, checked | checked state visual defined |
| T9 Notification | hidden, show | show duration; hide animation; multiple stack behavior |
| T10 Nav | normal, active, disabled | active indicator defined |
| T11 Inline | normal, editing, submitting, apiError | editing: field style; submitting: loading; apiError: keep-edit-state |

### Error Scenario Coverage Table

| Error Category | Must Cover | Example |
|---------------|------------|---------|
| 表单验证 | blur 校验 + submit 校验 | 空值 / 格式错误 / 长度超限 |
| 数据格式 | 邮箱 / 密码 / URL / 数字 | 邮箱不含@、密码不够长、URL 非法 |
| 业务拦截 | 去重 / 权限 / 状态冲突 | 重复分配、自交、已认证 |
| 空结果 | 表格空态 / 搜索无结果 / 详情空态 | "暂无数据" + 操作入口 |
| 网络异常 | timeout / offline / server error | Toast "网络异常" / "服务暂不可用" |
| 服务端错误 | 4xx / 5xx | 409: 冲突提示; 503: "请稍后重试" |

## Tasks Self-Check

- [ ] Each implementation task contains an annotation reference section
- [ ] Reference section points to the correct design.md section (section number + component name)
- [ ] Reference section includes component name
- [ ] All referenced design.md sections actually exist (cross-doc consistency)

## Cross-Doc Consistency Check

- [ ] **Proposal data annotation ↔ design interface/field design**: field names consistent
- [ ] **Proposal UI text annotation ↔ design field table**: copy consistent
- [ ] **Proposal F00X IDs ↔ tasks referenced features**: full coverage
- [ ] **Tasks annotation references ↙ design.md sections**: one-to-one existence verified
- [ ] **ANNOTATIONS keys (HTML prototype) ↔ design.md @ComponentName**: all components present
- [ ] **data-annot attributes ↔ ANNOTATIONS keys**: one-to-one match

---

## Review Checklists

Used during requirements review. Each role checks items line by line.

### Dev Perspective Review

- [ ] Every field's format constraint is clear (type/length/regex/enum)
- [ ] Every field's empty/boundary strategy is clear
- [ ] Annotation state covers type-specific minimums
- [ ] API request/response structure is complete (Block B present)
- [ ] Error handling trigger conditions and presentation are clear

### Tester Perspective Review

- [ ] Annotation state is convertible to test cases (per type minimums)
- [ ] Error handling section covers: network exception + data exception + business exception
- [ ] Every input field's boundary values are defined (empty/overflow/special chars)
- [ ] User action triggers are testable (blur / click / Enter)
- [ ] Flow has clear "success" and "failure" determination conditions

### UI Perspective Review

- [ ] All visible copy is defined (placeholder / label / error / tooltip / button text)
- [ ] Color/spacing/border-radius are annotated
- [ ] Loading/empty/error visual states are described
- [ ] Responsive/mobile behavior is defined (if applicable)
- [ ] Animation timing is annotated (if applicable)
