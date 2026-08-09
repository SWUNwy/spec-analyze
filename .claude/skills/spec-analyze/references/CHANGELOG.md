# Changelog

## 3.2.0 (2026-08-09)

### Added
- **注释显示模型：评审视图 / 实施视图** — 注释默认**评审视图**（中文角色标签【开发】/【开发·测试】/【UI】/【测试】；展示触发、行为、关闭、用户可见状态、视觉要点、UI 文案、字段摘要表；隐藏 state 全枚举、timing、API、Permission、i18n、accessibility），按需展开为实施视图
- **字段级注释双形态** — 评审视图用字段摘要表（字段/必填/规则/空值文案/来源），实施视图保留 ℹ️ 逐字段弹窗
- **注释约束示例** — 新增 `references/annotation-example.md`，8F 输出时引用
- SKILL.md Session State 新增 `annotation_view` 字段；S4 质量自检新增评审视图检查项

### Changed
- SKILL.md 版本 3.1.0 → 3.2.0
- `annotation-output-templates.md` 增加显示模型定义与评审视图示例
- `html-annotation-system.md` 增加 2.7 评审/实施视图切换

## 3.1.0 (2026-08-09)

### Added
- **中文技术写作规范** — 新增 `references/chinese-writing-style.md`（术语/排版/状态词/界面文案/数字逻辑）与 `references/controlled-operations-writing.md`（操作文档与故障排查受控写作），接入 SKILL.md（参考地图、文件索引、8F 输出生成、S4 质量自检、「闭环」首现定义）
- **零痕迹原创重写** — 15 个参考文档改写为原创表达（功能完整保留），移除全部第三方署名痕迹，实现全仓库零第三方痕迹

### Changed
- SKILL.md 版本 3.0.0 → 3.1.0
- 全仓库第三方署名与作者痕迹审计：0

### Security
- 重写采用「表达原创、功能保留」的合规路径，无逐字复制第三方内容

## 3.0.1 (2026-08-09)

### Added
- **LICENSE** — MIT License（Copyright (c) 2026 SWUNwy）
- **README 中文化** — 全仓库说明文档改为中文（代码块/命令/图表保留英文）

### Fixed（v3.0 审计）
- README 门禁命名与 SKILL.md 统一（G1–G4 → S1–S4），消除与新闭环 G1/G2/G3 的撞名
- `references/personas.md`、`references/annotation-output-templates.md` 从英文全文中文化
- SKILL.md 新增「与标注流程的衔接」（闭环 ↔ 标注流程接线：init 时机、S1–S4 记录、产出交接、恢复规则）
- README 坏链接修复（scenario-stress-test → divergence-frameworks）
- `run-state.cjs` usage 标题品牌统一（spec-analyze run-state v3.0）
- 删除陈旧嵌套文件 `.claude/skills/spec-analyze/references/scenario-stress-test.md`，嵌套副本重建为完整镜像

## 3.0.0 (2026-08-09)

### Added
- **闭环引擎（由 analyze 能力迁移）** — `run-state.cjs` 状态机、证据台账（HMAC 签名链 + `--auto-detect` 矛盾检测）、checkpoint 随流转自动同步、G1/G2/G3 闭环门禁、中断恢复协议、实施交接包（handoff-packet + workflow 控制器）
- **参考文档体系** — 新增 `references/`：router、closed-loop、gates、verification-rubric、failure-handling、output-templates（闭环轨道）、spec-templates、handoff-format、writing-plans、executing-plans、verification-before-completion、systematic-debugging、test-driven-development、requesting/receiving-code-review、role-matrix、frameworks-index、advanced-capabilities、glossary、evaluation-guide 等
- **回归测试** — 88 项自动化测试（`test-automated.cjs` / `test-run-state.cjs` / `test-workflow.cjs` / `test-handoff.cjs` / `evaluate-tests.cjs`）
- **输出语言契约** — 默认中文输出（机器契约保留英文）
- `references/annotation-output-templates.md` — 原 output-templates.md（标注三文档模板）更名，避免与闭环输出模板混淆

### Changed
- SKILL.md 版本 2.3.0 → 3.0.0，新增「闭环协议」章节（操作契约 / 输出语言 / 路由 / 状态机 / 门禁 / 证据 / 检查点 / 交接 / 参考地图 / 最终响应契约）
- `references/decision-log-format.md`、`references/web-research-guide.md` 合并闭环版本与标注场景内容
- README 架构说明与文件索引同步 v3.0

### Security
- 迁移内容不含个人信息：无用户路径、凭据或本地配置（`.claude/settings.local.json` 保持 gitignore）

## 2.3.0 (2026-07-16)

### Added
- **Block F 依赖链增强** — §3.6.2 多级依赖链声明格式（依赖链路 + 依赖类型 + 联动规则），支持 selector→filter→derived→render→autoGenerate 链式依赖
- **Block G（BusinessRules）** — §3.7 业务规则共享块，包含 ruleId/scope/condition/rule/validation 字段
- **Block H（DataFlow）** — §3.8 跨组件数据流声明共享块，包含数据流/转换规则/回写规则字段
- **衍生状态（Derived State）** — §6.8.4 状态声明支持 `_derived: true` + `dependsOn` 标记，自动跳过测试用例生成
- **列级条件行为（Column-Level Conditional Behavior）** — §4.2.1.1 T2 DataList 列级条件声明（列/条件/行为/条件else）
- **T6 FormFill 字段级属性扩展** — 字段子表新增 `autoGenerate`/`readonly`/`uniqueness`/`condition` 四个属性
- **注释等级标签可配置（Level Label Configurability）** — §7.1 L1/L2/L3 可配置为自定义标签（如"基础/本次需求明细/完整"），SKILL.md session state 新增 `level_labels`
- **validate-annotations.js v2.3** — 新增衍生状态验证、Block G/H 验证、autoGenerate 字段校验（R021）、derived state 校验（R022）、state/states 双格式兼容、`--level-labels` 参数
- 内容规则 R021-R022 — autoGenerate 公式规则、derived state dependsOn 规则

### Changed
- SKILL.md 版本从 2.2.0 升级至 2.3.0
- 附录 A 类型定义总表：T6 新增字段级属性，T2 新增列级条件引用
- annotation-templates.md §3 共享块扩展：新增 Block F 依赖链（§3.6.2）、Block G（§3.7）、Block H（§3.8）；原 §3.7 重编号为 §3.9
- JSON Schema 附录 B：level 枚举扩展为可配置标签映射

## 2.2.0 (2026-07-16)

### Added
- Block D（Background）— 业务背景与决策原因共享块，包含 rationale、decisionRef、flowchartRef、proposalRef 字段
- Block E（Refs）— 跨引用元数据共享块，包含 flowcharts、designDoc、decisionLog、proposalRefs 字段
- 所有类型模板（T1-T11）新增 `background` 可选字段
- 附录 B：JSON Schema 定义 — 11 种类型模板 + 5 个共享块的完整 JSON Schema 验证体系
- 共享块 Schema 定义（Block A-E）— 支持程序化验证 ANNOTATIONS 数据结构
- **Phase 4 — 注释与设计文档集成**：跨类型共享字段定义表（§6.8）、注释与设计文档双向同步机制（§6.9）、组件依赖声明格式（§6.10）、依赖图验证规则
- **Phase 5 — 逐组件交互式注释编辑器**：自然语言 → 类型映射规则（§2.3 关键词匹配表 + 决策树 + 复合组件映射）、Step 11F 完整工作流（P1-P6 + Add 子流程）、空组件触发流程与注释创建向导
- **Phase 6 — 已有方案注释路径**：新输入分流入口（已有方案注释）、Step A1-A5 完整流程（方案发现/组件识别/注释提取/注释补充/输出）、output-templates.md 新增路径
- **Phase 7 — 注释审核与质量闭环**：PM Perspective Review 审核清单、Review → Approve → Lock 四阶段审核流程（R1-R4）、审核状态流转定义、`_review` 锁定标记格式
- **Phase 8 — 测试用例自动生成**：状态 → 测试用例映射规则（§8）、11 种类型 50+ 标准化测试用例模板、`references/test-cases.md` 参考文件、`scripts/validate-annotations.js --testcases` 标志
- 内容规则 ID 映射表（§6.7）— 20 条规则（R001-R020）按类别/字段映射
- 跨引用格式（§3.6）— `→` 前缀语法与渲染规则
- `scripts/validate-annotations.js` 验证脚本 — 支持类型模板验证、内容规则检查、依赖图验证、测试用例生成、JSON 输出、迁移模式

### Changed
- SKILL.md 版本从 2.1.0 升级至 2.2.0
- 附录 A 类型定义总表：所有类型新增 Block D（可选）引用
- 引导文档更新：新增 JSON Schema 使用方式说明（pre-commit 钩子、CI 门禁、编辑器插件）
- SKILL.md 输入分流：新增"已有方案注释"路径和路由规则
- SKILL.md Full 路径表：新增 Step 11F
- SKILL.md 文件索引：新增 `references/test-cases.md` 引用
- quality-checklists.md：新增 PM Perspective Review 和完整审核流程
- output-templates.md：新增"已有方案注释"输出路径
- html-annotation-system.md：新增空组件触发流程（§4.0.1）

### Fixed
- 嵌套引用规则编号修正（§3.4 → §3.6）

## 2.1.0 (2026-07-15)

### Added
- 输入分流 — 5 路径输入分类（需求分析/原型注释/方案评审/竞品调研/快速问答）
- 元反馈回路 — 归档复盘、模式识别、规范演进、指标基线
- 回滚/中止流程 — 中止/回退/路径切换三大流程与决策记录
- CI/CD 集成 — GitHub Actions 示例、门禁规则、pre-commit 钩子
- 跨项目可移植性 — 引导脚本 `scripts/init.sh`、3 种复用方式
- 角色定义 — 8 角色矩阵、单 AI Agent 模式、多人协作模式
- 质量指标 — 3 维度（注释质量/文档质量/流程效率）指标与未达标处理
- 脚本工具 — `scripts/init.sh` 项目初始化、`scripts/check-annotations.sh` 注释质量检查
- demo README — 功能说明与快速开始

### Changed
- SKILL.md 版本从 2.0.0 升级至 2.1.0
- 扩展 Agent 角色动态为完整角色定义章节
- 删除重复的 demo 截图

## 2.0.0 (2026-07-15)

### Added
- 浮动面板交互模式 — 替换旧版 overlay/modal 为 panel/fab 模式
- 字段级注释描述 — demo 支持字段级别的结构化注释
- 统一状态管理 — `state` 对象替代 5+ 分散变量

### Changed
- `references/html-annotation-system.md` §6 模板全部更新为 panel/fab 模式
- 交互注释编辑适配面板模式

## 1.2.0 (2026-07-14)

### Added
- 交互式注释编辑（Step 9.5F）— 文档发现、组件定位、操作解析、批处理、Undo
- 双模式注释（独立模式 + 内联模式）
- 智能分析 — 多视角分析、压力测试、方案收敛
- 增强编辑模式 — 追加、删除、撤销、变更摘要
- 数据驱动导航 — `label` 字段驱动 `renderNav()`
- 验证模式 — 触发器覆盖、状态覆盖、内容规则检查

### Changed
- demo 从 3 状态扩展为 5 状态模型
- 编辑模式支持撤销/重做

## 1.1.0 (2026-07-10)

### Added
- 热插拔知识系统 — 渐进式知识加载，按路径需求加载对应知识
- Session State 机制 — 6 字段状态跟踪（mode/focus/output/status/contextBranch/phase）
- 多框架分歧系统 — 18 个分析框架，3 类分歧检测
- 组件注册表（Component Manifest）— 组件枚举与验证
- 质量门禁 — S1-S4 四阶段质量检查
- Agent 角色动态 — 3 种角色模式（独立/协作/监督）

### Changed
- 步骤编号对齐 — 所有参考文件使用统一步骤编号
- SKILL.md 与 references/ 分离为独立职责

## 1.0.0 (2026-07-01)

### Added
- 核心三路径分析引擎 — Lightweight / Standard / Full
- 智能路由（Step 0）— 3 条路径自动路由
- 智能节点分析（Step 0.5）— 意图识别、内容成熟度、异常检测
- 三层注释框架 — L1 (trigger-behavior-dismiss) / L2 (+placement-style-state-timing) / L3 (+accessibility-responsive-i18n)
- 11 种组件类型（T1-T11）— 结构化类型系统
- 8 个参考文件 — annotations/personas/quality/divergence/output/decision-log/web-research/html-system
- 交互式 HTML demo — 浮动面板注释展示
- 完整 README — 架构说明与使用指南
