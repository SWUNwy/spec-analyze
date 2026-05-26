---
name: spec-analyze
description: "需求分析与带注释方案输出。将模糊的产品需求转化为结构化、研发友好的方案文档。当需要进行需求分析、产品方案设计、功能拆解、竞品调研并输出可直接交付研发评审的 proposal/design/tasks 文档时使用。区别于通用分析工具：spec-analyze 的分析结果直接输出为带研发注释的规范文档格式。"
---

# Spec Analyze — 需求分析与带注释方案输出

将模糊需求通过多视角分析、压力测试、方案收敛，输出为**带研发注释**的 proposal/design/tasks 文档。

<HARD-GATE>
在获得用户设计确认之前，不得调用任何实现 skill、编写代码或搭建项目。
</HARD-GATE>

---
## Step 0: 智能路由

先做三维评估：**讨论性质**（纯业务/需求分析/技术设计）· **复杂度**（Lightweight/Standard/Full）· **预期产出**（Insight Brief/Analysis Report/带注释方案文档）

> "这属于 [讨论性质] 类型，[复杂度] 复杂度。我会使用 [路径] 路径——[路径说明]。可以吗？"

| 路径 | 流程 | 产出 |
|------|------|------|
| **Lightweight** | 快速提问→讨论→轻量输出 | Insight Brief |
| **Standard** | 2-3角色视角→针对性问题→方案比对→报告 | Analysis Report |
| **Full** | 5角色全视角+压力测试+方案收敛+设计呈现 | proposal+design+tasks → 交接到 `writing-plans` |

Lightweight 输出前评估升级门：①涉及设计决策/编码？②用户表达实施意图？③涉及技术选型或架构变更？任一为"是"→提议升级 Standard。

---
## Checklist

1. **快速评估** — 讨论性质、复杂度、预期产出
2. **路由确认** — 推荐路径，等待用户确认
3. **视觉伴侣邀请** — 涉及视觉内容则独立邀请
4. **上下文探索** — 查阅项目文件；按需 web research **→ G1**
5. **多角色提问** — 一次一个问题 [skip Lightweight]
6. **发散** — 压力测试 + what-if [skip Lightweight]
7. **收敛** — 2-3方案 trade-off 对比 + 决策记录 **→ G2**
8. **设计呈现** — 分节呈现，逐节批准 **→ G3**
9. **输出生成** — Full 用带注释模板；Lightweight 先评估升级门
10. **质量自检** — 运行 DoD 清单
11. **用户审阅** — 输出确认
12. **交接** — Full → `writing-plans`；其他→结束

---
## 质量门禁与 DoD

| 门禁 | 位置 | L | S | F |
|------|------|:-:|:-:|:-:|
| G1: 上下文完备 | 步骤4→5 | - | 需 | 需 |
| G2: 收敛完成 | 步骤7→8 | - | 需 | 需 |
| G3: 输出准备 | 步骤8→9 | - | 需 | 需 |
| G4: 自检完成 | 步骤10→11 | 需 | 需 | 需 |

**G1**: scope 内外明确·项目文件已查阅·web research 完成·理解充分可深入
**G2**: ≥2方案对比列 trade-off·Architecture Cleanliness 四维评估·每决策记录 rationale+被拒方案·范围锁定
**G3** (Full): proposal 注释列可填充·design 组件已识别·模板各章有数据支撑·文件输出路径已定
**G4**: 无`{占位符}`·声明区分 Fact/Inference/Hypothesis·无 scope creep·(Full) 注释符合自检标准·三文档引用链一致

**失败处理**: DoD 不满足→回溯补齐；用户否决→回到设计呈现；同一门禁阻塞2次→评估路径选择。

---
## 二、分析过程

### 2.1 上下文探索
- 先查阅项目状态（文件/文档/最近提交）；多子系统→标记拆分
- 每次只问一个问题，选择题优先；需展开则拆子问题

### 2.2 设计隔离与清晰度
- 每模块单一职责、清晰接口、可独立测试；回答：做什么/怎么用/依赖什么
- 文件过大=职责过多→标记

### 2.3 工作于现有代码库
- 先探索现结构再提议变更；含针对性改进，不提议无关重构

### 2.4 多角色驱动提问
**每角色至少问1-2个问题**。切换视角时说明来源。

| 角色 | 关注 | 典型问题 |
|------|------|----------|
| **产品策略师** | 价值定位、画像、差异化 | "解决什么用户的什么问题？""不做会怎样？" |
| **增长与市场分析师** | 竞争格局、趋势、商业模式 | "行业有类似功能？""怎么衡量成功？" |
| **用户代言人** | 用户旅程、痛点、可用性 | "第一次用卡在哪？""操作失败怎么办？" |
| **系统架构师** | 可扩展性、可行性、数据模型 | "字段数据从哪来？""API超时/报错怎么处理？" |
| **风险挑战者** | 极端边界、失败模式、盲点 | "恶意数据输入？""假设不成立？" |

### 2.5 发散: 压力测试
选2-3个相关场景 what-if 探测：数据异常·用户行为·边界条件·并发冲突·依赖失效·数据一致性

### 2.6 收敛: 方案比对
①提出2-3方案含 trade-off（推荐首位）②每方案 Architecture Cleanliness 四维评估 ③记录 rationale+被拒方案 ④锁定范围（声明不包含内容）

### 2.7 Agent 角色动态
早期=引导者(Socratic)·发散=挑战者·收敛=顾问·设计呈现=协作者

---
## 三、注释框架

Full 路径文档使用以下注释体系。

### 3.1 三层等级
| 等级 | 适用场景 | 字段 |
|------|----------|------|
| **L1 核心** | 简单交互（hover tooltip、静态展示） | trigger / behavior / dismiss |
| **L2 标准** | 复杂交互（弹窗、下拉、表单联动） | L1 + placement / style / state / timing |
| **L3 完整** | 高精度/全局组件（Modal、Table） | L2 + accessibility / responsive / i18n |

### 3.2 字段定义
```
L1: trigger(触发 hover/click/focus) behavior(行为描述) dismiss(消失 mouseleave/clickoutside/Esc)
L2: placement(位置 top/bottom) style(视觉 color/spacing/font) state(各状态 normal/empty/loading/error) timing(动画 200ms)
L3: accessibility(无障碍 Tab/Enter/Esc) responsive(响应式 touch/small) i18n(国际化)
```

#### State 编写规范
| 视角 | 要求 | 示例 |
|------|------|------|
| **研发** | 描述组件在该状态下的行为表现 | `submitting: 按钮loading+disabled, 文字"登录中..."` |
| **测试** | 触发→状态呈现的完整路径 | `error: 无效邮箱后blur→红色边框+"邮箱格式不正确"` |
**必须覆盖**: normal + ≥2 非正常（loading/error/empty/countdown）

### 3.3 使用原则
L1 默认→按需升级→L3 仅全局组件；不重复已知行为（如 Ant Design 默认）

### 3.4 角色↔字段映射
| 角色 | 关注字段 | 关注原因 |
|------|----------|----------|
| 研发 | trigger, behavior, dismiss, state(边界) | 触发条件、实现逻辑、边界处理 |
| 测试 | state(全分支), trigger, dismiss | 状态→测试用例 |
| UI | style, placement, timing | 视觉细节、位置、动画 |
behavior 与 state 同时服务研发+测试（研·测）；trigger/dismiss 主研发兼顾测试。

---
## 四、输出模板

### 4.1 proposal.md 模板
```markdown
# 方案文档 — {R0XX-需求名称}
> **需求编号**: R0XX | **创建日期**: YYYY-MM-DD

## 一、需求概述
### 1.1 背景 | 1.2 目标 | 1.3 范围
- **包含**: [功能点] | **不包含**: [排除]

## 二、功能需求
| ID | 需求描述 | 优先级 | 验收标准 | 数据说明 | 交互说明 | UI文本说明 |
|----|----------|--------|----------|----------|----------|-----------|
| F001 | [描述] | P0 | [条件] | [字段/格式/边界] | [L等级+简述] | [文案/标签] |

**数据说明**: API来源+格式规则+边界值  ✅ email: string,必填,邮箱格式(含@,最长50),空→"请输入邮箱"
**交互说明**: 等级+一句话 ✅ L2: blur单项校验→submit全量→API→成功跳转/失败Toast
**UI文本**: 所有可见文案 ✅ placeholder:"请输入邮箱"; 格式错误→"邮箱格式不正确"

## 三、非功能需求 | 四、技术依赖
```
填写示例：`| F001 | 邮箱密码登录 | P0 | 登录成功跳转首页 | email:string,必填,邮箱格式; password:string,必填,6-32位; POST /api/auth/login→{token} | L2: input→blur校验, click→全量校验→API→成功存token跳转/失败Toast | placeholder:"请输入邮箱","请输入密码"; 格式错误:"邮箱格式不正确"; 提交:"登录"/loading:"登录中..." |`

### 4.2 design.md 模板
```markdown
# 设计文档 — {R0XX-需求名称}
## 一、设计概述 | 二、系统架构 | 三、接口设计
| 接口 | 方法 | 参数 | 返回 | 错误场景 |
## 四、数据模型 | 五、组件设计
### 5.1 {组件名}
| 组件 | 职责 | Props | State |
|------|------|-------|-------|
| {Name} | {职责} | {Props} | {State} |
#### 交互注释 @{组件} {L等级}
```
字段名:   字段值
```
#### @EmailPasswordForm L2
```
[研]   trigger:   input→blur单项校验; click"登录"→全量校验+API
[研·测] behavior:  blur→校验单字段,错误→红框+红字; submit→全量→POST→成功存token跳转/失败Toast
[UI]   style:     圆角4px,高度40px; 焦点边框高亮
[测]   state:     normal→focused→error→submitting(按钮loading+disabled)
[研]   dismiss:   成功跳转/失败恢复normal
```
#### @SmsCodeBtn L2
```
[研]   trigger:   click"获取验证码"
[研·测] behavior:  校验手机号→POST→成功60s倒计时Toast/失败Toast
[UI]   style:     倒计时置灰disabled,按钮每秒更新
[测]   state:     normal/"获取"/countdown/"58s后重新获取"/disabled
[UI]   timing:    每秒更新,60s恢复
[研]   dismiss:   倒计时归零恢复normal
```
## 六、错误处理 | 七、附录：字段说明表 (所属模块/字段/UI标签/格式约束/空值策略/数据来源)
```

### 4.3 tasks.md 模板
```markdown
# 任务清单 — {R0XX-需求名称}
## 一、任务列表
| 任务ID | 描述 | 工时 | 优先级 |
|--------|------|------|--------|
| T001 | [描述] | [工时] | P0 |
## 二、任务步骤
### T001: {任务描述}
> **注释参考**: 交互→design.md §{章节} @{组件} | 字段→design附录「字段说明表」 | 数据→design.md §{章节}
1. {步骤} ...
## 三、依赖关系
```

---
## 五、全链路工作流
```
产品需求 → 1.spec-analyze(路由→探索→多角色提问→压力测试→收敛→设计呈现)
         → 2.输出(proposal+design+tasks)
         → 3.评审(产品:F00X描述+验收 / 研发:数据说明+注释+字段表 / 测试:state+错误+边界 / UI:style+responsive+文案)
         → 4.Agent开发(读tasks注释→跳读design注释→按注释实现)
         → 5.产出(文案→格式→交互→边界)
```

---
## 六、质量自检清单

**proposal**: □ 每F00X三列已填 □ 数据说明含来源+格式+边界 □ 交互说明含等级+行为 □ UI文本含全部文案 □ 等级选择合理
**design**: □ 每组件有注释块 □ 字段按等级完整 □ state覆盖normal+error+empty/loading □ 错误处理三类覆盖 □ 字段表含格式约束 □ L3含accessibility+responsive
**tasks**: □ 每任务含注释引用 □ 引用指向正确design章节 □ 含组件名 □ 引用的章节确实存在
**cross-doc**: □ proposal数据列↔design字段接口一致 □ UI文本列↔字段表文案一致 □ F00X↔tasks覆盖完整 □ tasks引用↔design章节一一对应

---
## 七、评审角色检查清单

**研发**: □ 格式约束明确 ← behavior · □ 空值/边界明确 ← state · □ state覆盖loading/error/empty ← state · □ API结构完整 ← behavior · □ 错误触发条件+表现 ← trigger+state
**测试**: □ state可转测试用例 ← state · □ 错误覆盖网络+数据+业务 ← state+behavior · □ 边界值已定义 ← state · □ 触发条件可测 ← trigger · □ 成功/失败判定 ← dismiss+state
**UI**: □ 文案已定义 ← state · □ 颜色/间距/圆角 ← style · □ 三态视觉描述 ← state · □ 响应式 ← responsive · □ 动效时长 ← timing

---
## 八、Web Research

涉及以下主题时提议搜索：竞争基准/最佳实践·市场趋势/用户行为·技术评估(性能/社区/风险)·合规需求(GDPR等)

> "这涉及 [主题]，我建议查一下 [内容]。需要我做个快速搜索吗？"

---
## 九、Visual Companion

Full 路径设计呈现阶段，或文字不足以表达布局/流程时：

> "有些内容用浏览器展示会更直观——我可以画架构图、流程图或页面布局。要试试吗？"

---
## 十、决策记录

每决策记录：决策了什么·考虑了哪些替代·为什么选·为什么拒绝

---
## 十一、关键原则

一次一个问题·选择题优先·YAGNI·先发散再收敛·增量验证·记录决策
