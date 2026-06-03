# Output Templates

Three output formats matching the three routing paths. Full path uses spec-analyze's exclusive annotation framework and triple-document output.

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

## Full Path → Triple-Document Output

The core differentiator of spec-analyze. Produces three interconnected documents with spec-analyze's exclusive **annotation framework**.

### Two-Layer Annotation Framework

The annotation system uses two complementary layers:

| Layer | Controls | Mechanism |
|-------|----------|-----------|
| **L1/L2/L3** | Annotation breadth | Flat tier system — how many fields a component gets |
| **T1-T11 Types** | Annotation depth | Type system — what fields a component *must* have based on its interaction pattern |

#### Layer 1: Three Annotation Tiers (Breadth)

| Tier | When to Use | Fields |
|------|-------------|--------|
| **L1 Core** | Simple interactions (hover tooltip, static display) | trigger / behavior / dismiss |
| **L2 Standard** | Complex interactions (modal, dropdown, form validation) | L1 + placement / style / state / timing |
| **L3 Complete** | High-precision / global components (DatePicker, Table, Modal) | L2 + accessibility / responsive / i18n |

**Usage rules:**
- **L1 default**: all interaction annotations start at L1
- **Upgrade on demand**: only upgrade to L2 when L1 is insufficient for implementation
- **L3 reserved for global components**: only for components reused across multiple pages
- **Don't restate the obvious**: Ant Design / MUI default behavior doesn't need annotation

#### Field Definitions

```
L1 Common
──────────────────────────────────────
trigger   Trigger condition     hover / click / focus / scroll / blur
behavior  Behavior description  Show Tooltip / Expand dropdown / Submit / Navigate
dismiss   Dismiss condition     mouse leave / click outside / Esc / auto-dismiss

L2 Adds
──────────────────────────────────────
placement Display position      top / bottom / topRight / center / left
style     Visual details        color / spacing / font / z-index / content type
state     State behaviors       normal / empty / loading / error / overflow / countdown
timing    Animation & delay     200ms fade in / 100ms fade out / 300ms debounce

L3 Adds
──────────────────────────────────────
accessibility  Accessibility    Tab focus / Enter triggers / Esc closes / aria-label
responsive    Responsive        Touch fallback / small screen adaptation / print
i18n          Internationalization   Whether translation is needed
```

#### Layer 2: Type Annotation System (Depth)

Each component is classified into one of 11 interaction pattern types. The type determines mandatory fields and state coverage. See `annotation-templates.md` for full definitions.

| Type | Pattern | Examples | Mandatory Fields | States (min) |
|------|---------|---------|-----------------|--------------|
| **T1** | Static Display | Label, Badge, Avatar | trigger, dismiss | normal |
| **T2** | Data List | Table, CardList, LogList | trigger, behavior, state | normal / loading / empty / error |
| **T3** | Action Trigger | Button, IconButton | trigger, behavior, state, dismiss | normal / disabled / loading |
| **T4** | Dropdown / Select | Dropdown, Select | trigger, behavior, state, dismiss, placement | normal / open / closed |
| **T5** | Dialog / Modal | ConfirmModal, FormModal | trigger, behavior, state, dismiss, timing | normal / open / submitting / apiError |
| **T6** | Form Fill | Form, InputGroup, Editor | trigger, behavior, state, style, timing | normal / fieldError / submitting / success / apiError |
| **T7** | Search / Filter | SearchInput, SearchableSelect | trigger, behavior, state, dismiss, timing | idle / focus / searching / selected / empty / error |
| **T8** | Toggle / Switch | Toggle, Checkbox, Radio | trigger, behavior, state | normal / disabled / checked |
| **T9** | Notification | Toast, Alert, Banner | trigger, behavior, state, placement, timing | hidden / show |
| **T10** | Navigation | Tab, Breadcrumb, Pagination | trigger, behavior, state | normal / active / disabled |
| **T11** | Inline Edit | EditableCell, InlineInput | trigger, behavior, state, dismiss, timing | normal / editing / submitting / apiError |

#### State Specification Rules

State must cover two perspectives:

| Perspective | Requirement | Example |
|-------------|-------------|---------|
| **Dev perspective** | Describe component behavior in that state | `submitting: button loading + disabled, text "Logging in..."` |
| **Tester perspective** | Describe full trigger-to-presentation path | `error: blur on invalid email → red border + "Invalid email format"` |

**State minimum coverage**: Each type has its own minimum states (see table above). Type requirements override the generic "normal + 2 non-normal" rule.

#### Role ↔ Annotation Field Mapping

| Role | Fields of Interest | Reason |
|------|-------------------|--------|
| Dev | trigger, behavior, dismiss, state (boundaries) | Know trigger conditions, implement behaviors, handle edges |
| Tester | state (all branches), trigger, dismiss | State transitions become test cases |
| UI | style, placement, timing | Visual details, position, animation |

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

## 2. Component Design

### 2.0 Component Overview

| # | Component | Type | Parent | Level | Responsibility | States |
|---|-----------|------|--------|-------|---------------|--------|
| C01 | @ComponentName | T2 DataList | — | L2 | description | normal / loading / empty / error |

### 2.1 {Component Name}

#### Annotation Block @{ComponentName} {L-level}  ← proposal.md F00X

\```
[Trigger]   ...
[Behavior]  ... (include API or use [API] block)
[Placement] (if applicable)
[Style]     (if L2+)
[State]     ...
[Timing]    (if applicable)
[Dismiss]   ...
\```

#### Filled Example: @EmailPasswordForm L2 (T6 FormFill)

\```
[Trigger]   input → blur triggers field validation
            click "Log in" → triggers full validation + API call
[Behavior]  blur: validate single field, error→red border + red error text
            submit: full validation→pass→POST /api/auth/login
            → success: localStorage.setItem('token') → redirect to home
            → failure: Toast with backend error message
[API]       POST /api/auth/login
            Body: {email: string(required, email), password: string(required, min 6, max 32)}
            → 200: {token: string, user: {id, name}}
            → 401: Toast "邮箱或密码错误"
            → 503: Toast "服务暂不可用，请稍后重试"
[Style]     border-radius 4px, height 40px; focus border highlight
[State]     normal: empty form; focused: focus highlight
            error: red border + error text
            submitting: button loading + disabled "Logging in..."
            apiError: Toast with error message, form stays
[Dismiss]   success→redirect; failure→restore normal
\```

## 3. Error Handling

| Error Type | Scenario | Handling |
|-----------|----------|----------|

## 4. Appendix: Field Specification Table

| Module | Field | UI Label | Format Constraint | Empty Strategy | Data Source |
|--------|-------|----------|-------------------|---------------|-------------|
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
   │       └── Solution convergence + design presentation
   │
   ├── 2. Component enumeration + annotation generation
   │       ├── 2a. Enumerate all interactive components
   │       │      └── Map each to T1-T11 type (annotation-templates.md §2)
   │       ├── 2b. Generate annotation blocks per type
   │       │      └── Fill mandatory fields + state machine per type
   │       │      └── Apply content quality rules (product language §6)
   │       └── Output: design.md with complete annotation blocks + component table
   │
   ├── 3. Output generation (Full path)
   │       ├── proposal.md (functional requirements + 3-column annotations)
   │       ├── design.md (component design + annotation blocks + field table)
   │       └── tasks.md (task steps with annotation references)
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
