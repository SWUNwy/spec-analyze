# 完成开发分支（Finishing a Development Branch）

> 改编自 superpowers 插件 v6.1.1（MIT）。方法论保留；语气对齐 analyze。

## 何时加载

实施完成、测试通过、决定如何集成工作时加载。与 `using-git-worktrees.md` 配套做工作区清理。

## 流程

```
Verify tests → Detect environment → Determine base branch → Present options → Execute → Cleanup
```

## 第 1 步：验证测试

提供任何选项前：

```bash
# Project-appropriate test command
npm test / cargo test / pytest / go test ./...
```

测试失败：停下。展示失败。测试通过前不能进入 merge/PR 选项。

## 第 2 步：检测环境

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
```

| 状态 | 菜单 | 清理归属 |
|---|---|---|
| `GIT_DIR == GIT_COMMON`（普通仓库） | 标准 4 选项 | 无 worktree 可清理 |
| `GIT_DIR != GIT_COMMON`，命名分支 | 标准 4 选项 | 按来源（第 6 步） |
| `GIT_DIR != GIT_COMMON`，分离 HEAD | 缩减 3 选项（无 merge） | 无——外部管理 |

## 第 3 步：确定基分支

```bash
git merge-base HEAD main 2>/dev/null || git merge-base HEAD master 2>/dev/null
```

或与用户确认："This branch split from main — is that correct?"

## 第 4 步：展示选项

**普通仓库或命名分支 worktree——精确这 4 个：**

```
Implementation complete. What would you like to do?

1. Merge back to <base-branch> locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)
4. Discard this work

Which option?
```

**分离 HEAD——精确这 3 个：**

```
Implementation complete. You're on a detached HEAD (externally managed workspace).

1. Push as new branch and create a Pull Request
2. Keep as-is (I'll handle it later)
3. Discard this work

Which option?
```

不要加解释或开放式"接下来？"——保持选项简洁。

## 第 5 步：执行选择

### 选项 1：本地 merge

```bash
MAIN_ROOT=$(git -C "$(git rev-parse --git-common-dir)/.." rev-parse --show-toplevel)
cd "$MAIN_ROOT"
git checkout <base-branch>
git pull
git merge <feature-branch>
<test command>      # Verify on merged result
```

merge 成功后：清理 worktree（第 6 步），然后 `git branch -d <feature-branch>`。

### 选项 2：push 并创建 PR

```bash
git push -u origin <feature-branch>
```

不要清理 worktree——用户 PR 迭代需要它。

### 选项 3：保持原样

报告：`Keeping branch <name>. Worktree preserved at <path>.`

不要清理 worktree。

### 选项 4：丢弃

先确认：

```
This will permanently delete:
- Branch <name>
- All commits: <commit-list>
- Worktree at <path>

Type 'discard' to confirm.
```

等待精确的 `discard` 确认。然后 `cd` 到 MAIN_ROOT，运行清理（第 6 步），再 `git branch -D <feature-branch>`。

## 第 6 步：清理工作区

只对选项 1 和 4 运行。选项 2 和 3 始终保留 worktree。

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
WORKTREE_PATH=$(git rev-parse --show-toplevel)
```

- `GIT_DIR == GIT_COMMON`：普通仓库，无清理。完成。
- worktree 路径在 `.worktrees/` 或 `worktrees/` 下：本 skill 拥有清理权：
  ```bash
  MAIN_ROOT=$(git -C "$(git rev-parse --git-common-dir)/.." rev-parse --show-toplevel)
  cd "$MAIN_ROOT"
  git worktree remove "$WORKTREE_PATH"
  git worktree prune
  ```
- 其他情况：宿主环境拥有该工作区。不要删除。有平台工作区退出工具就用；否则留在原地。

## 快速参考

| 选项 | Merge | Push | 保留 worktree | 清理分支 |
|---|---|---|---|---|
| 1. 本地 merge | 是 | — | — | 是 |
| 2. 创建 PR | — | 是 | 是 | — |
| 3. 保持原样 | — | — | 是 | — |
| 4. 丢弃 | — | — | — | 是（force） |

## 常见错误

| 错误 | 修复 |
|---|---|
| 跳过测试验证 | 提供选项前总是验证测试 |
| 开放式问题 | 精确展示 4 个结构化选项（分离 HEAD 3 个） |
| 选项 2 清理 worktree | 只对选项 1 和 4 清理 |
| 删分支先于删 worktree | `git branch -d` 会失败——先 merge、再删 worktree、再删分支 |
| 从 worktree 内部跑 `git worktree remove` | 先 `cd` 到主仓库根 |
| 清理 harness 拥有的 worktree | 只清理 `.worktrees/` 或 `worktrees/` 下的 worktree |
| 丢弃无键入确认 | 要求精确 `discard` 字符串 |

## 红旗

绝不：
- 测试失败继续
- 不重新验证 merge 结果的测试就 merge
- 无键入 `discard` 确认就删工作
- 未经用户显式请求 force-push
- 确认 merge 成功前移除 worktree
- 清理你没创建的 worktree（来源检查）
- 从被移除的 worktree 内部运行 `git worktree remove`

总是：
- 提供选项前验证测试
- 展示菜单前检测环境
- 精确展示 4 个选项（分离 HEAD 3 个）
- 选项 4 获取键入 `discard` 确认
- 只对选项 1 和 4 清理 worktree
- worktree 移除前 `cd` 到主仓库根
- 移除后运行 `git worktree prune`

## 参考

- `references/using-git-worktrees.md` — 工作区创建、镜像清理检测
- `references/verification-before-completion.md` — 完成前的最终验证门禁
- `references/executing-plans.md` — 完成接入 execute 阶段的位置
