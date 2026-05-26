# Quality Self-Check & Review Checklists

Spec-analyze's unique quality assurance system. Each output type has its own self-check checklist, plus cross-doc consistency checks and role-specific review checklists.

---

## Proposal Self-Check

- [ ] Each F00X's three annotation columns are filled
- [ ] **Data annotation** marks field source + format constraint + boundary value
  - Field source: API path? Body parameter? Return field?
  - Format constraint: Data type? Length limit? Regex? Enum values?
  - Boundary value: Empty strategy? Default value? Overflow handling?
- [ ] **Interaction annotation** marks grade (L1/L2/L3) + one-line behavior description
- [ ] **UI text annotation** includes all visible copy: placeholder / label / error / tooltip / button text
- [ ] Interaction grade selection is reasonable (no over-annotation: simple interactions don't get L2+)

## Design Self-Check

- [ ] Every interactive component has an annotation block
- [ ] Annotation block fields are complete per grade (L1 at minimum trigger/behavior/dismiss)
- [ ] **State covers key states: normal + error + at least one of empty/loading**
- [ ] **Error handling section covers: network error / validation failure / business error — all three categories**
- [ ] **Field specification table includes: format constraint column (prevents proposal-design information gap)**
- [ ] L3 components supplement with accessibility and responsive annotations

## Tasks Self-Check

- [ ] Each implementation task contains an annotation reference section
- [ ] Reference section points to the correct design.md section (section number + component name)
- [ ] Reference section includes component name
- [ ] All referenced design.md sections actually exist (cross-doc consistency)

## Cross-Doc Consistency Check

- [ ] **Proposal data annotation ↔ design interface/field design**: field names consistent
- [ ] **Proposal UI text annotation ↔ design field table**: copy consistent
- [ ] **Proposal F00X IDs ↔ tasks referenced features**: full coverage
- [ ] **Tasks annotation references ↘ design.md sections**: one-to-one existence verified

---

## Review Checklists

Used during requirements review. Each role checks items line by line.

### Dev Perspective Review

- [ ] Every field's format constraint is clear (type/length/regex/enum)                          ← from annotation @{Component} behavior
- [ ] Every field's empty/boundary strategy is clear                                              ← from annotation @{Component} state
- [ ] Annotation state covers loading / error / empty                                             ← from annotation @{Component} state
- [ ] API request/response structure is complete                                                  ← from annotation @{Component} behavior
- [ ] Error handling trigger conditions and presentation are clear                                ← from annotation @{Component} trigger + state

### Tester Perspective Review

- [ ] Annotation state is convertible to test cases (normal / loading / error / empty)            ← from annotation @{Component} state
- [ ] Error handling section covers: network exception + data exception + business exception      ← from annotation @{Component} state + behavior
- [ ] Every input field's boundary values are defined (empty/overflow/special chars)              ← from annotation @{Component} state
- [ ] User action triggers are testable (blur / click / Enter)                                    ← from annotation @{Component} trigger
- [ ] Flow has clear "success" and "failure" determination conditions                              ← from annotation @{Component} dismiss + state

### UI Perspective Review

- [ ] All visible copy is defined (placeholder / label / error / tooltip / button text)          ← from annotation @{Component} state
- [ ] Color/spacing/border-radius are annotated                                                   ← from annotation @{Component} style
- [ ] Loading/empty/error visual states are described                                             ← from annotation @{Component} state
- [ ] Responsive/mobile behavior is defined (if applicable)                                       ← from annotation @{Component} responsive
- [ ] Animation timing is annotated (if applicable)                                               ← from annotation @{Component} timing
