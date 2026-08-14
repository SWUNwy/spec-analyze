# 研发评审就绪清单（Review-Readiness Checklist）

> 用途：评审最佳实践的统一标准。生成侧（Full 路径 Step 8F 评审就绪 PRD）用它保证产出"评审一次过"；评审侧（`references/spec-document-reviewer-prompt.md` 的 Completeness 检查面）用它逐项检查已有 PRD。
> 每条含唯一 ID、严重级别、验收方式。阻断项缺失 = 评审不通过（Blocking）；建议项缺失 = 需评审会确认（Advisory）；提示项 = 按场景适用（Optional）。
> 自动校验：`scripts/validate-prd.js <path>`（支持 Markdown / HTML）。

---

## A. 文档治理（Governance）

| ID | 检查项 | 级别 | 验收方式 |
|----|--------|------|---------|
| RC-01 | 文档信息完整：名称 / 版本号 / 负责人 / 关联需求 / 日期 | Blocking | 头部信息表，5 字段全有 |
| RC-02 | 修订记录：版本号 / 修订人 / 修订类型（A/M/D）/ 日期 / 描述 | Advisory | 有修订记录表，本次迭代有对应条目 |
| RC-03 | 文档编号 / 密级 / 归属部门（如适用） | Optional | 公司模板要求时填写 |

## B. 需求背景与价值（Why）

| ID | 检查项 | 级别 | 验收方式 |
|----|--------|------|---------|
| RC-10 | 需求背景：现状痛点，回答"为什么做" | Blocking | 一段背景，含具体现状描述 |
| RC-11 | 需求目的：本次要解决的核心问题 | Blocking | 一句话目标，可衡量 |
| RC-12 | 预期收益：量化收益（指标 + 数值 + 时间） | Advisory | 含至少一个可量化指标 |
| RC-13 | 竞品情况或现状对比 | Advisory | 有对比或明确说明不适用 |
| RC-14 | 成本测算（研发/运营成本） | Optional | 有估算或说明不适用 |

## C. 功能与流程（What & How）

| ID | 检查项 | 级别 | 验收方式 |
|----|--------|------|---------|
| RC-20 | 功能简述 + 功能分布（结构图） | Blocking | 有功能清单或树状结构 |
| RC-21 | 页面结构：树形图，含全部交互组件与选项枚举 | Blocking | 树形图覆盖所有页面区域 |
| RC-22 | 状态流转：状态机（状态 + 迁移条件 + 终态/不可逆说明） | Blocking | 状态图或表格，每个状态有迁移条件 |
| RC-23 | 业务流程：Mermaid 流程图 + 分支详述 | Blocking | 流程图覆盖主流程全分支 |
| RC-24 | 逐功能交互详述：触发 / 行为 / 状态 / 样式 | Blocking | 每个功能有交互详述 |
| RC-25 | 权限规则：可见范围 / 操作权限 / 数据归属 | Blocking | 明确写出，无权限时写"全量可见" |
| RC-26 | 复用声明：复用组件/流程标注来源与改动范围 | Advisory | 复用项标注 REUSE-xx 与改动范围 |

## D. 数据与接口（Data & API）

| ID | 检查项 | 级别 | 验收方式 |
|----|--------|------|---------|
| RC-30 | 数据字段表：字段 / 类型 / 必填 / 说明（含业务对象语义） | Blocking | 字段表存在且非空 |
| RC-31 | 接口需求：endpoint / 方法 / 参数 / 返回 / 错误场景 | Blocking | 每个接口四要素齐全 |
| RC-32 | 埋点需求（如适用） | Optional | 有埋点清单或说明不适用 |
| RC-33 | 数据报表需求（如适用） | Optional | 有报表清单或说明不适用 |

## E. 交付与验收（Ship & AC）

| ID | 检查项 | 级别 | 验收方式 |
|----|--------|------|---------|
| RC-40 | 验收标准：可执行 AC，一条一测（含边界与异常） | Blocking | AC-xx 列表，每条含操作 + 预期结果 |
| RC-41 | 上线需求（发布步骤 / 开关 / 灰度） | Optional | 有上线清单或说明不适用 |
| RC-42 | 下线需求（如适用） | Optional | 有下线策略或说明不适用 |
| RC-43 | 开发注意事项：性能 / 幂等 / mock 替换点 / 边界 | Advisory | 有注意事项清单 |

## F. 运营与风险（Ops & Risk）

| ID | 检查项 | 级别 | 验收方式 |
|----|--------|------|---------|
| RC-50 | 运营计划（如适用） | Optional | 有运营安排或说明不适用 |
| RC-51 | 风险分析：风险 + 影响 + 应对 | Advisory | 至少列出主要风险与应对 |
| RC-52 | 相关文档索引（关联 PRD / 设计 / 接口文档） | Optional | 有引用列表 |

---

## 评审判定规则

| 结果 | 条件 |
|------|------|
| 通过（Ready for Review） | 无 Blocking 缺失；Advisory 缺失 ≤ 2 且均已显式标注"本次不适用/后续补齐" |
| 有条件通过（Conditional） | 无 Blocking 缺失；Advisory 缺失 > 2，需评审会确认 |
| 不通过（Not Ready） | 存在任一 Blocking 缺失 |

## 与现有 skill 模块的映射

| 检查项组 | 生成侧落点 | 评审侧落点 | 验证器 |
|----------|-----------|-----------|--------|
| A 文档治理 | Step 8F 评审就绪 PRD §0/§2 | spec-document-reviewer-prompt Completeness | rc-01/02 |
| B 背景价值 | Step 8F 评审就绪 PRD §1 | spec-document-reviewer-prompt Completeness | rc-10~14 |
| C 功能流程 | Step 8F 评审就绪 PRD §3-5 | spec-document-reviewer-prompt Completeness/Consistency | rc-20~26 |
| D 数据接口 | Step 8F 评审就绪 PRD §6-7 | spec-document-reviewer-prompt Testability | rc-30/31 |
| E 交付验收 | Step 8F 评审就绪 PRD §8-9 | spec-document-reviewer-prompt Testability | rc-40/43 |
| F 运营风险 | Step 8F 评审就绪 PRD §12-14 | spec-document-reviewer-prompt Scope | rc-50/51 |
