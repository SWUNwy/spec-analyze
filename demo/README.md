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
| `screenshot-full.png` | 完整页面截图（默认态） |
| `screenshot-review.png` | 评审视图打开状态截图（`?panel=stats&view=review`） |
| `screenshot-implementation.png` | 实施视图打开状态截图（`?panel=stats&view=implementation`） |

## 核心技术

- 纯 HTML/CSS/JS，无外部依赖，开箱即用
- 侧滑注释面板（`.annot-panel`）+ 评审/实施视图状态机（`state.view`）
- 统一状态管理（`state` 对象）
- 深度链接初始化（`?panel=<key>&view=<review|implementation>`）
- 编辑历史与撤销（`editHistory` + `undoEdit`）
- 验证引擎（`runVerification`）
