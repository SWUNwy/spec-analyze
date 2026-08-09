# 注释约束示例（Annotation Example）

本文件定义 spec-analyze 注释块的**标准形态**，是 8F 输出生成与 S4 质量自检的对照基准。所有注释默认以**评审视图**输出（中文），实施细节按需展开。

## 默认输出：评审视图

评审视图展示：触发、行为、关闭、用户可见状态（用户语言）、视觉要点、UI 文案、字段摘要表。

### 示例：@登录表单（T6 表单填写，L2）

```
#### 注释块 @登录表单（T6 表单填写，L2）

【开发】触发
· 邮箱输入框失焦 → 校验该字段
· 点击「登录」→ 校验全部字段并提交

【开发·测试】行为
· 邮箱格式错误 → 输入框红框 +「请输入有效邮箱」
· 密码长度不足 → 输入框红框 +「密码至少 6 位」
· 校验通过 → 提交登录请求
· 登录成功 → 进入首页；登录失败 → 顶部提示错误原因，表单保留已填内容

【UI】视觉要点
· 输入框：圆角 4px、高 40px；聚焦时边框高亮
· 登录按钮：主色；提交中置灰并显示「登录中…」

【测试】用户可见状态
· 空表单 ｜ 校验错误 ｜ 提交中 ｜ 成功（跳转）｜ 失败（错误提示，可重试）

字段摘要
| 字段 | 必填 | 规则 | 空值 / 错误文案 | 来源 |
|---|---|---|---|---|
| email | 是 | string，邮箱格式，≤50 字符 | 「请输入邮箱」/「请输入有效邮箱」 | 登录接口 |
| password | 是 | string，6–32 位 | 「请输入密码」/「密码至少 6 位」 | 登录接口 |
```

## 按需展开：实施视图

实施视图在评审视图基础上追加（state 全枚举、timing、API、Permission、i18n、accessibility）：

```
【开发·测试】state（全分支）
· normal：空表单
· fieldError：红色边框 + 错误文案
· submitting：按钮 loading + disabled「登录中…」
· success：跳转首页
· apiError：Toast 提示，表单保留已输入内容

【开发】timing
· 校验反馈：200ms；错误提示淡入：100ms

【API】
POST /api/auth/login
request:  { email: string, password: string }
response: { token: string }
→ 200 成功 | 401 认证未通过 | 400 请求参数有误

【Permission】公开接口，无需登录

【开发】accessibility
· Tab 顺序：邮箱 → 密码 → 登录；Enter 可触发登录；错误以 aria-live 播报

【UI】responsive
· 窄屏：输入框与按钮占满宽度；错误文案不换行截断

【开发】i18n
· 需要翻译：按钮、错误文案、占位符全部走 i18n key
```

## 字段级注释的两种形态

- **评审视图：字段摘要表**（如上方示例），评审者可整表扫读。
- **实施视图：ℹ️ 逐字段弹窗**——key 使用 dot notation（`componentKey.fieldKey`），写入 `ANNOTATIONS[componentKey].fields` 或 `.columns`。

## 必含清单（约束）

1. **默认中文**：注释正文与角色标签（【开发】【开发·测试】【UI】【测试】）默认中文；仅用户要求英文时切换。
2. **L1 字段必有**：trigger、behavior、dismiss。
3. **L2 追加**：placement、style、state（用户可见状态按评审视图简化，全分支进实施视图）、timing。
4. **L3 追加**：accessibility、responsive、i18n（仅全局组件）。
5. **类型强制状态覆盖**：按 `annotation-templates.md` §4（如 T6 必须覆盖 normal/fieldError/submitting/success/apiError 五态）。
6. **共享块按需**：APICall（调用 API 组件）、DialogContext（弹窗）、Permission（受限组件）——默认进实施视图。
7. **字段级注释**：表单字段/表格列逐字段注释（评审视图表格、实施视图弹窗）。
8. **中文写作规范**：直角引号「」、API 状态词按语义翻译、术语一致、事实保真（见 `chinese-writing-style.md`）。
9. **机器内容不动**：代码字面量、JSON 键名、URL/API 路径、字段名、枚举值、状态码保持原样。

## 边界

- 评审视图隐藏不代表不生成：底层数据始终完整，实施视图按需展开。
- 默认评审视图适用于方案评审；实施交接前询问是否展开实施视图。
