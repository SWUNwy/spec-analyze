# Changelog

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