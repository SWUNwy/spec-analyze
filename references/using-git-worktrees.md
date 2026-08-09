# 使用 Git Worktrees

> 改编自 superpowers 插件 v6.1.1（MIT）。方法论保留；语气对齐 analyze。

## 何时加载

执行受益于工作区隔离的实施计划前加载。进入 `execute` 阶段且有破坏当前分支风险时必需。清理逻辑与 `finishing-a-development-branch.md` 配套。

## 核心原则

先检测既有隔离。然后优先原生工具。然后才回退到 git。永远不要对抗 harness。

## 决策流

| 步骤 | 问题 | 是 | 否 |
|---|---|---|---|
| 0 | 已在链接 worktree？ | 跳到 Project Setup | 继续步骤 1 |
| 1a | 有原生 worktree 工具？ | 用它，跳到 Project Setup | 继续步骤 1b |
| 1b | 用户同意或已声明偏好？ | 创建 git worktree | 请求同意 |

## 步骤 0：检测既有隔离

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

**子模块护栏：** `GIT_DIR != GIT_COMMON` 在 git 子模块内也为真。下结论"已在 worktree"前先验证：

```bash
# If this returns a path, you are in a submodule, not a worktree — treat as normal repo
git rev-parse --show-superproject-working-tree 2>/dev/null
```

若 `GIT_DIR != GIT_COMMON`（且不是子模块）：已在链接 worktree。跳到 Project Setup。不要另建。

报告既有隔离：
- 在分支上："Already in isolated workspace at `<path>` on branch `<name>`."
- 分离 HEAD："Already in isolated workspace at `<path>` (detached HEAD, externally managed)."

## 步骤 1a：原生 worktree 工具（首选）

寻找名为 `EnterWorktree`、`WorktreeCreate`、`/worktree` 命令或 `--worktree` 标志的工具。存在就用它并跳到 Project Setup。

原生工具自动处理目录放置、分支创建与清理。存在原生工具还用 `git worktree add`，会创造 harness 无法管理的幻影状态。

## 步骤 1b：Git worktree 回退

仅当步骤 1a 不适用时。

用户未表明 worktree 偏好时，创建前先问：

> "Would you like me to set up an isolated worktree? It protects your current branch from changes."

尊重已声明偏好，不问。用户拒绝就在原地工作；跳到 Project Setup。

### 目录优先级

1. 指令中的显式用户偏好——不问直接用
2. 既有项目本地目录：
   ```bash
   ls -d .worktrees 2>/dev/null     # Preferred (hidden)
   ls -d worktrees 2>/dev/null      # Alternative
   ```
   都存在时 `.worktrees/` 胜出。
3. 默认：项目根 `.worktrees/`

### 安全检查（仅项目本地）

```bash
git check-ignore -q .worktrees 2>/dev/null || git check-ignore -q worktrees 2>/dev/null
```

未被忽略：加入 `.gitignore`，提交改动，然后继续。防止误提交 worktree 内容。

### 创建

```bash
path="$LOCATION/$BRANCH_NAME"
git worktree add "$path" -b "$BRANCH_NAME"
cd "$path"
```

**沙箱回退：** `git worktree add` 因权限错误失败（沙箱拒绝）时，告诉用户沙箱阻止了 worktree 创建。在当前目录工作。就地运行 setup 与基线测试。

## 步骤 2：项目设置

自动检测并运行合适 setup：

```bash
[ -f package.json ] && npm install
[ -f Cargo.toml ] && cargo build
[ -f requirements.txt ] && pip install -r requirements.txt
[ -f pyproject.toml ] && poetry install
[ -f go.mod ] && go mod download
```

## 步骤 3：验证干净基线

运行项目测试命令。报告：

```
Worktree ready at <full-path>
Tests passing (<N> tests, 0 failures)
Ready to implement <feature-name>
```

测试失败：报告失败，问继续还是调查。不要假设失败是既有的。

## 红旗

绝不：
- 步骤 0 检测到既有隔离还创建 worktree
- 有原生 worktree 工具还用 `git worktree add`——这是 #1 错误
- 跳过步骤 1a 直接跳 git 命令
- 未验证 gitignore 就创建项目本地 worktree
- 跳过基线测试验证
- 测试失败不询问就继续

总是：
- 先跑步骤 0 检测
- 原生工具优先于 git 回退
- 遵循目录优先级：显式指令 > 既有项目本地 > 默认
- 自动检测并运行项目 setup
- 验证干净测试基线

## 参考

- `references/finishing-a-development-branch.md` — 对应的清理逻辑
- `references/executing-plans.md` — worktree 创建接入 execute 阶段的位置
- `references/verification-before-completion.md` — 最终测试验证门禁
