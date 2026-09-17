# Spec-Analyze Demo

交互式 PRD 注释展示工具。演示 spec-analyze 的**评审视图 / 实施视图**双显示模型：默认中文评审视图（触发、行为、用户可见状态、视觉要点、字段摘要表），按需展开实施视图（state 全分支、API、Permission、timing、accessibility、responsive 等完整细节）。

## 快速开始

```bash
# 直接用浏览器打开
open demo/index.html

# 深度链接：直接打开指定组件的指定视图
open "demo/index.html?panel=stats&view=review"          # 统计卡片 · 评审视图
open "demo/index.html?panel=stats&view=implementation"  # 统计卡片 · 实施视图
```

## 功能

| 功能 | 说明 |
|------|------|
| **双视图切换** | 面板头部「评审视图 / 实施视图」切换；默认评审视图 |
| **中文角色注释** | 评审视图以【开发】【开发·测试】【UI】【测试】角色标签输出触发/行为/视觉要点/用户可见状态 |
| **字段摘要表** | 评审视图整表扫读字段的必填、规则、空值/错误文案、来源 |
| **组件导航** | 面板顶部按钮切换不同组件（统计卡片/数据表格/创建表单） |
| **字段级注释** | 点击组件内字段的 ℹ️ 按钮，查看字段摘要与实施细节 |
| **编辑模式** | 点击「编辑注释」进入编辑模式，支持追加/删除/撤销 |
| **验证模式** | 点击「验证」检查触发覆盖、状态覆盖、空注释块 |

## 文件说明

| 文件 | 说明 |
|------|------|
| `index.html` | 单页应用，所有 CSS/JS/HTML 内联（含 ANNOTATIONS 数据） |
| `screenshot-1.png` | 评审视图打开状态截图（`?panel=stats&view=review`） |
| `screenshot-2.png` | 实施视图打开状态截图（`?panel=stats&view=implementation`） |

## 核心技术

- 纯 HTML/CSS/JS，无外部依赖，开箱即用
- 侧滑注释面板（`.annot-panel`）+ 评审/实施视图状态机（`state.view`）
- 统一状态管理（`state` 对象）
- 深度链接初始化（`?panel=<key>&view=<review|implementation>`）
- 编辑历史与撤销（`editHistory` + `undoEdit`）
- 验证引擎（`runVerification`）

## 评审模式示例页（v3.7）

第三种呈现模式的示例：右侧常驻注释面板 + SVG 连线将注释条目与左侧原型组件关联。

| 文件 | 说明 |
|------|------|
| `review-mode.html` | 单文件示例页，含 2 个场景（优惠券创建/核销）× 3 条注释，覆盖全部三种 scope-mark（已有/新增/调整） |

打开方式：

```bash
open demo/review-mode.html
```

### 人工验证清单

- [ ] 连线绘制与编号徽标：每个注释条目与锚定组件之间有一条贝塞尔连线，中点带编号圆徽（与右栏条目序号一致）
- [ ] 悬停双向高亮：悬停左侧组件或右侧条目，连线变蓝色加粗（常态淡蓝 55% 透明度 → 高亮全显）、两端同时高亮
- [ ] 滚动/缩放重绘：滚动左侧画布或缩放窗口，连线实时跟随组件位置
- [ ] 拖宽：拖动右侧面板左缘，宽度在 18%–30% 之间调整
- [ ] 宽度记忆：拖宽后刷新页面，面板宽度保持
- [ ] ≤760px 降级：DevTools 切窄到 760px 以下，连线隐藏、面板变为上下堆叠
- [ ] 场景切换：点击顶部场景标签（优惠券创建/优惠券核销），右栏与连线重绘
- [ ] 空态：切换到无条目场景时展示「本场景暂无注释条目」（本示例页未构造空场景，此条在真实交付物中验证）
- [ ] L2/L3 折叠：条目下「展开 L2/L3 研发注释」可展开/收起
- [ ] 口径建议：优惠券创建场景底部展示黄色口径建议框（核销场景无此框，验证 decision 为场景级可选）

### 技术要点

- 数据同源：`<script id="review-docs">` 中的结构化 JSON 是唯一数据源，右栏面板由它渲染
- 权威脚本：交互 JS 与 `references/annotation-output-templates.md` 的权威代码块逐字一致，生成交付物时原样嵌入、禁止手改
- 验证工具：`node scripts/validate-annotations.js demo/review-mode.html` 可校验 review-docs 结构（protoId 配对、scopeMark 枚举等）
