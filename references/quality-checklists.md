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
- [ ] **State covers key states per component type (see annotation-templates.md §4 各类型 state 字段最低覆盖要求)**
- [ ] **Permission is declared for every component with access restrictions (see annotation-templates.md Block C)**
- [ ] **Validation rules are declared for every form/input component (see annotation-templates.md T6 fields.validation)**
- [ ] **Error handling section covers: network error / validation failure / business error — all three categories**
- [ ] **Field specification table includes: format constraint column (prevents proposal-design information gap)**
- [ ] L3 components supplement with accessibility and responsive annotations
- [ ] **如果存在 HTML 原型（含本次新生成的）且组件数 ≥ 3：HTML 注释系统已按 `html-annotation-system.md` 内建并验证**
- [ ] **Full 路径：组件枚举已完成（annotation-templates.md §9），无遗漏无幽灵项**
   - [ ] **注释展示模式已确认（内联/侧边/双模式），在 Step 8F 中记录决策**
   - [ ] **内联注释渲染数据已准备（ANNOTATIONS 包含 type 字段，用于决定渲染顺序）**
   - [ ] **每个组件有对应的内联注释容器占位（在 HTML 结构中）**
   - [ ] **字段级注释已定义：统计卡片每个指标有 Definition + Permission**
   - [ ] **字段级注释已定义：表格每个列头有 Format + Source**
   - [ ] **字段级注释已定义：表单每个字段有 Validation + Options**
   - [ ] **字段级 ℹ️ 触发按钮已放置在对应的字段值/标签旁**

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
- [ ] **如果生成了 HTML 注释：ANNOTATIONS keys ↔ design.md @ComponentName**: 一一对应，无遗漏
- [ ] **如果生成了 HTML 注释：data-annot 属性值 ↔ ANNOTATIONS keys**: 完全一致
- [ ] **Full 路径：Component Manifest ↔ design.md Annotation Block**: Manifest 中的每个条目在文档中有对应的 §5.x 和 Annotation Block（一一对应，无遗漏无多余）
- [ ] **Full 路径：编辑操作 edit_history 已全部同步到文档**（如有未同步的记录 → 在 S3d 中补全）
- [ ] **Full 路径：注释内容语言为产品语言（无代码语法，无模糊词，无占位符）← 对照 annotation-templates.md §6**
- [ ] **Full 路径：HTML trigger 按钮位置验证 — 每个组件至少 1 个 trigger，在可视边界内（≤ 8px）**
- [ ] **Full 路径：Back-propagation 验证 — 如果 HTML 注释验证中有修正，检查 design.md 是否同步更新**
- [ ] **双模式数据同步验证：editAnnot() 修改后，内联和面板同时更新**
- [ ] **内联注释渲染顺序验证：ANNOTATIONS.type 字段存在，且渲染顺序与 html-annotation-system.md §2.2 一致**
- [ ] **内联注释折叠状态持久化：localStorage 在所有浏览器中正常工作**
- [ ] **弹窗替换验证：所有 .annot-panel 引用已替换为 .annot-modal**
- [ ] **弹窗功能验证：居中展示、缩放动画、遮罩层关闭、ESC 关闭**
- [ ] **编辑模式验证：editAnnot() 函数调用后内联和弹窗同步更新**
- [ ] **字段级注释验证：字段级 data-annot-field 值与 ANNOTATIONS.fields/columns key 一致**

---
## 新增：类型化模板专检（Full 路径）

在完成基础自检后，补充以下针对类型化模板的专项检查。

### 组件枚举检查

- [ ] 所有交互组件已列举，无遗漏
- [ ] 每个组件已映射到 annotation-templates.md 的类型（T1-T11）
- [ ] 类型选择合理：同交互模式使用同类型
- [ ] 嵌套关系已通过 context 声明

### 内容质量检查

- [ ] 注释使用产品语言（完整陈述句，无代码语法）← annotation-templates.md §6.1
- [ ] 无模糊词（"可能"、"应该"、"酌情"）← §6.2
- [ ] 枚举值全列举，无"等"、"..." ← §6.2
- [ ] 无占位符（{占位符}均已替换）← §6.3
- [ ] 无 "N/A" 字段（不适用字段直接省略）← §6.3
- [ ] 每条 behavior 如果对应 proposal 需求，标注了 F00X ID ← §6.4

### 跨组件一致性检查

- [ ] 同类型各实例字段填充深度一致
- [ ] 同一术语在不同组件中表述一致

### 错误场景与表现
- [ ] 网络不通 - Toast error 提示
- [ ] 操作误触/条件不满足导致操作时 - Disabled 体现、Toast 错误提示
- [ ] 填写内容不符合规则 - Blur 边框置红、提示文案【标注格式约束、长度约束、枚举值约束】，submit 阻止提交，字段级错误提示
- [ ] 空数据 - 空状态设计（占位插图 + 提示文案 + 补充操作按钮）
- [ ] 数据加载中 - Skeleton 加载骨架屏
- [ ] 业务规则拦截 - 弹窗/行内红色提示区块，禁用操作按钮
- [ ] 超时/服务不可用 - 友好的中文错误提示（Toast/页面提示）
- [ ] 并发/重复提交 - 按钮 loading 状态，防重复提交
- [ ] 接口返回 409/其他业务冲突 - 具体错误提示（如"该人员已拥有账号「某名称」"）
- [ ] 身份/权限异常 - Toast 提示"无法确认操作人身份"或操作按钮隐藏/禁用
- [ ] 编辑模式下修改注释 → 保存后内联注释同步更新
- [ ] 编辑模式下不保存直接关闭 → 内容不丢失（取消按钮恢复原始内容）
- [ ] 字段级注释弹窗 → 关闭后再打开 → 内容保持正确

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
