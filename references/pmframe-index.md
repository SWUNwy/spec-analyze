# PMFrame 思维模型库路由索引

> v3.7 入库。100 个思维模型按 10 领域组织于 `references/pmframe/`，本索引提供领域全量映射与场景路由。

## 入库版本与来源

| 项 | 值 |
|---|---|
| 来源 | `PMFrame`（本地思维模型库） |
| 入库日期 | 2026-09-15 |
| 模型总数 | 100（10 领域） |
| 排除项 | `pmframe-mcp-server/`、`docs/`、`scripts/`、`PM-Agent-可行性分析.md`（MCP 集成已否决） |
| 头部规范化 | 每个模型 SKILL.md 统一 frontmatter：name / description / source / imported |

每个模型为单文件 `SKILL.md`：frontmatter（name/description/source/imported）+ 方法步骤（Steps/Output Format）+ 深度参考（它解决什么问题/框架结构/适用场景/真实案例/来源与历史等章节）。一次读取即获全量内容，无需二次跳转；v3.7.4 起原 README.md 深度内容已清洗合并入 SKILL.md（剥离网站残留），README.md 不复存在。

## 领域全量映射（10 领域 × 100 模型）

### 战略与市场（13）

| 模型 | 路径 |
|---|---|
| SWOT 分析 | `references/pmframe/战略与市场/SWOT_分析/` |
| PESTLE 分析 | `references/pmframe/战略与市场/PESTLE分析/` |
| 波特五力模型 | `references/pmframe/战略与市场/波特五力模型/` |
| STP 市场定位 | `references/pmframe/战略与市场/STP_市场定位/` |
| Three Horizons | `references/pmframe/战略与市场/Three_Horizons/` |
| GTM 上市策略 | `references/pmframe/战略与市场/GTM_上市策略/` |
| 竞争定位地图 | `references/pmframe/战略与市场/竞争定位地图/` |
| 竞品分析框架 | `references/pmframe/战略与市场/竞品分析框架/` |
| 价值链分析 | `references/pmframe/战略与市场/价值链分析/` |
| 蓝海策略 ERRC | `references/pmframe/战略与市场/蓝海策略ERRC/` |
| 四行动框架 ERRC Grid | `references/pmframe/战略与市场/四行动框架ERRC_Grid/` |
| OGSM 战略规划 | `references/pmframe/战略与市场/OGSM_战略规划/` |
| Wardley Mapping | `references/pmframe/战略与市场/Wardley_Mapping/` |

### 商业模式（6）

| 模型 | 路径 |
|---|---|
| 商业模式画布 | `references/pmframe/商业模式/商业模式画布/` |
| Lean Canvas | `references/pmframe/商业模式/Lean_Canvas/` |
| 价值主张画布 | `references/pmframe/商业模式/价值主张画布/` |
| StoryBrand 故事品牌 | `references/pmframe/商业模式/StoryBrand故事品牌/` |
| 平台生态系统画布 | `references/pmframe/商业模式/平台生态系统画布/` |
| Network Effects 网络效应 | `references/pmframe/商业模式/Network_Effects网络效应/` |

### 增长与指标（6）

| 模型 | 路径 |
|---|---|
| AARRR 海盗指标 | `references/pmframe/增长与指标/AARRR海盗指标/` |
| HEART 框架 | `references/pmframe/增长与指标/HEART_框架/` |
| 北极星指标框架 | `references/pmframe/增长与指标/北极星指标框架/` |
| 增长飞轮 | `references/pmframe/增长与指标/增长飞轮/` |
| LTV-CAC 框架 | `references/pmframe/增长与指标/LTV-CAC框架/` |
| Ansoff 增长矩阵 | `references/pmframe/增长与指标/Ansoff_增长矩阵/` |

### 用户研究（10）

| 模型 | 路径 |
|---|---|
| 用户画像 Persona | `references/pmframe/用户研究/用户画像_Persona/` |
| 用户旅程地图 | `references/pmframe/用户研究/用户旅程地图/` |
| 同理心地图 | `references/pmframe/用户研究/同理心地图/` |
| 情境调研 | `references/pmframe/用户研究/情境调研/` |
| 访谈五问法 | `references/pmframe/用户研究/访谈五问法/` |
| 日记研究 | `references/pmframe/用户研究/日记研究/` |
| 任务完成率测试 | `references/pmframe/用户研究/任务完成率测试/` |
| 用户测试五法则 | `references/pmframe/用户研究/用户测试五法则/` |
| 用户反馈闭环 | `references/pmframe/用户研究/用户反馈闭环/` |
| 同理心驱动路线图 | `references/pmframe/用户研究/同理心驱动路线图/` |

### 需求与优先级（16）

| 模型 | 路径 |
|---|---|
| Kano 模型 | `references/pmframe/需求与优先级/Kano模型/` |
| MoSCoW 方法 | `references/pmframe/需求与优先级/MoSCoW_方法/` |
| ICE 评分模型 | `references/pmframe/需求与优先级/ICE_评分模型/` |
| RICE 优先级模型 | `references/pmframe/需求与优先级/RICE_优先级模型/` |
| Impact-Effort 矩阵 | `references/pmframe/需求与优先级/Impact_Effort_矩阵/` |
| How Now Wow | `references/pmframe/需求与优先级/How_Now_Wow/` |
| 需求优先级四象限 | `references/pmframe/需求与优先级/需求优先级四象限/` |
| 特性优先级金字塔 | `references/pmframe/需求与优先级/特性优先级金字塔/` |
| Jobs Scoping | `references/pmframe/需求与优先级/Jobs_Scoping/` |
| JTBD 增长矩阵 | `references/pmframe/需求与优先级/JTBD_增长矩阵/` |
| Jobs Portfolio 平衡 | `references/pmframe/需求与优先级/Jobs_Portfolio平衡/` |
| 痛苦解决方案矩阵 | `references/pmframe/需求与优先级/痛苦解决方案矩阵/` |
| 问题树 Issue Tree | `references/pmframe/需求与优先级/问题树Issue_Tree/` |
| CIRCLES 方法 | `references/pmframe/需求与优先级/CIRCLES_方法/` |
| 任务驱动 | `references/pmframe/需求与优先级/任务驱动/` |
| Opportunity Solution Tree | `references/pmframe/需求与优先级/OpportunitySolution_Tree/` |

### 创意与发散（10）

| 模型 | 路径 |
|---|---|
| SCAMPER | `references/pmframe/创意与发散/SCAMPER/` |
| Crazy 8s | `references/pmframe/创意与发散/Crazy_8s/` |
| 逆向头脑风暴 | `references/pmframe/创意与发散/逆向头脑风暴/` |
| 六顶思考帽 | `references/pmframe/创意与发散/六顶思考帽/` |
| HMW 问题框架 | `references/pmframe/创意与发散/HMW_问题框架/` |
| 类比思维 | `references/pmframe/创意与发散/类比思维/` |
| TRIZ 创新矩阵 | `references/pmframe/创意与发散/TRIZ_创新矩阵/` |
| 形态分析图 | `references/pmframe/创意与发散/形态分析图/` |
| 亲和图 KJ 法 | `references/pmframe/创意与发散/亲和图KJ_法/` |
| 设计思维 | `references/pmframe/创意与发散/设计思维/` |

### 决策与评估（6）

| 模型 | 路径 |
|---|---|
| DACI 决策框架 | `references/pmframe/决策与评估/DACI_决策框架/` |
| SNAP 决策框架 | `references/pmframe/决策与评估/SNAP决策框架/` |
| A/B 测试框架 | `references/pmframe/决策与评估/A_B_测试框架/` |
| 创意可行性门槛 | `references/pmframe/决策与评估/创意可行性门槛/` |
| PURE 可用性评估 | `references/pmframe/决策与评估/PURE_可用性评估/` |
| Cynefin 框架 | `references/pmframe/决策与评估/Cynefin_框架/` |

### 流程与交付（9）

| 模型 | 路径 |
|---|---|
| Google Design Sprint | `references/pmframe/流程与交付/Google_Design_Sprint/` |
| Sprint 冲刺框架 | `references/pmframe/流程与交付/Sprint_冲刺框架/` |
| Shape Up | `references/pmframe/流程与交付/Shape_Up/` |
| 双钻模型 | `references/pmframe/流程与交付/双钻模型/` |
| NOW-NEXT-LATER 路线图 | `references/pmframe/流程与交付/NOW-NEXT-LATER_路线图/` |
| 用户故事地图 | `references/pmframe/流程与交付/用户故事地图/` |
| Event Storming | `references/pmframe/流程与交付/Event_Storming/` |
| 服务蓝图 | `references/pmframe/流程与交付/服务蓝图/` |
| Wizard of Oz 测试 | `references/pmframe/流程与交付/Wizard_of_Oz_测试/` |

### 系统与问题思维（13）

| 模型 | 路径 |
|---|---|
| 五次为什么 | `references/pmframe/系统与问题思维/五次为什么/` |
| 根本原因分析 | `references/pmframe/系统与问题思维/根本原因分析/` |
| 冰山模型 | `references/pmframe/系统与问题思维/冰山模型/` |
| 系统思维 | `references/pmframe/系统与问题思维/系统思维/` |
| 系统基模 | `references/pmframe/系统与问题思维/系统基模/` |
| 约束理论 TOC | `references/pmframe/系统与问题思维/约束理论_TOC/` |
| 第一性原理 | `references/pmframe/系统与问题思维/第一性原理/` |
| 马斯克五步法 | `references/pmframe/系统与问题思维/马斯克五步法/` |
| 反脆弱设计 | `references/pmframe/系统与问题思维/反脆弱设计/` |
| 心智模型 | `references/pmframe/系统与问题思维/心智模型/` |
| Fogg 行为模型 | `references/pmframe/系统与问题思维/Fogg_行为模型/` |
| Hook 上钩模型 | `references/pmframe/系统与问题思维/Hook上钩模型/` |
| 反向工作法 | `references/pmframe/系统与问题思维/反向工作法/` |

### 验证与叙事（11）

| 模型 | 路径 |
|---|---|
| 精益创业 MVP | `references/pmframe/验证与叙事/精益创业_MVP/` |
| 假设验证板 | `references/pmframe/验证与叙事/假设验证板/` |
| 验证学习循环 | `references/pmframe/验证与叙事/验证学习循环/` |
| Problem-Solution Fit | `references/pmframe/验证与叙事/Problem-Solution_Fit/` |
| PMF 框架 | `references/pmframe/验证与叙事/PMF_框架/` |
| Lean UX 画布 | `references/pmframe/验证与叙事/Lean_UX_画布/` |
| 电梯演讲模板 | `references/pmframe/验证与叙事/电梯演讲模板/` |
| Story Spine | `references/pmframe/验证与叙事/Story_Spine/` |
| POV 陈述 | `references/pmframe/验证与叙事/POV_陈述/` |
| 创新扩散曲线 | `references/pmframe/验证与叙事/创新扩散曲线/` |
| 产品生命周期管理 | `references/pmframe/验证与叙事/产品生命周期管理/` |

## 场景 → 框架路由表

分析工作中按当前场景查推荐框架，读对应 SKILL.md 后应用：

| 场景 | 推荐组合 |
|------|---------|
| **需求摄入与分析** | 问题树 Issue_Tree（拆解）→ CIRCLES_方法（结构化澄清）→ JTBD_增长矩阵 / Jobs_Scoping（任务视角） |
| **需求完整性审计补充** | 五次为什么 / 根本原因分析（背景与问题维度）→ 同理心地图（用户与场景维度）→ 问题树 Issue_Tree（功能边界维度） |
| **需求优先级决策** | RICE_优先级模型 或 ICE_评分模型（量化）→ Kano模型（满意度分层）→ Impact_Effort_矩阵（快速二分） |
| **方案设计与发散** | HMW_问题框架（重新定义）→ SCAMPER / 逆向头脑风暴 / 六顶思考帽（多视角发散）→ 双钻模型（收敛流程） |
| **方案对比与决策** | 创意可行性门槛（初筛）→ Cynefin_框架（问题域判定）→ DACI_决策框架（决策分工） |
| **对抗性审查（S-AR 辅助）** | 五次为什么（根因挑战）→ 反脆弱设计（失效模式）→ 约束理论_TOC（瓶颈识别）→ Cynefin_框架（复杂度误判） |
| **产品评审准备** | 电梯演讲模板 / POV_陈述（叙事）→ Lean_UX_画布（假设显性化）→ 假设验证板（未决项标注） |
| **用户研究规划** | 用户画像_Persona + 用户旅程地图（基础）→ 访谈五问法（访谈）→ 日记研究 / 情境调研（纵向观察） |
| **竞品调研** | 竞品分析框架 → SWOT_分析 → 竞争定位地图 → 波特五力模型 |
| **增长与指标设计** | 北极星指标框架（指标树）→ AARRR海盗指标（漏斗）→ 增长飞轮（机制）→ LTV-CAC框架（单位经济） |
| **战略与路线图** | OGSM_战略规划 / Three_Horizons（时间维度）→ NOW-NEXT-LATER_路线图（排期） |
| **验证与学习** | 精益创业_MVP → 假设验证板 → 验证学习循环 → Problem-Solution_Fit / PMF_框架 |

## 警告区

- **-dup 冲突**：无（入库时 100 个模型目录名全局唯一）。
- **MCP 剥离记录**：无需剥离——入库扫描确认 100 个模型均不含 MCP 相关内容；`pmframe-mcp-server/` 目录已按约定排除，未入库。
- **更新约定**：PMFrame 源库更新后需重新入库并更新本索引的入库日期与映射（模型内容以 `imported` 日期为准，不做单向同步）。
