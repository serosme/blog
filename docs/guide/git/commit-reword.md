# Git 历史 Commit 操作

## 修改 Commit Message

### 操作流程

#### 启动交互式 rebase

```bash
git rebase -i --committer-date-is-author-date HEAD~n
```

#### 标记要修改的 commit

在打开的编辑器中，将目标 commit 前的 `pick` 改为 `reword`（或 `r`）

```text
原：pick abc123 旧消息
改：reword abc123 旧消息
```

保存并退出

#### 修改 commit message

在弹出的新编辑器中，输入新消息，保存退出

#### 验证结果

查看修改后的历史（包含时间戳）

```bash
git log --format="%h %s%n  Author date: %ad%n  Committer date: %cd%n" --date=iso
```

## 合并多个 Commit

### 操作流程

#### 启动交互式 rebase

```bash
git rebase -i --committer-date-is-author-date HEAD~n
```

其中 `n` 为要处理的 commit 数量（包含要保留的和要合并的）。

#### 标记要合并的 commit

在打开的编辑器中，保留一个 `pick`，其余要合并的改为 `squash`（或 `s`）或 `fixup`（或 `f`）：

```text
pick abc123 功能核心实现
squash def456 WIP: 补充逻辑
squash ghi789 修复拼写错误
```

`squash` 与 `fixup` 的区别：

| 指令     | 合并 commit | 保留 message |
| -------- | ----------- | ------------ |
| `squash` | ✅          | ✅（可编辑） |
| `fixup`  | ✅          | ❌（丢弃）   |

保存并退出。

#### 编辑合并后的 commit message

如果使用了 `squash`，会弹出编辑器让你编辑最终的 commit message。保留需要的行，删除或注释掉不需要的行，保存退出。

如果全部使用 `fixup`，则直接使用 `pick` 的 message，不会弹出编辑器。

#### 验证结果

```bash
git log --oneline -n 5
git log --format="%h %s%n  Author date: %ad%n  Committer date: %cd%n" --date=iso
```

### 补充：使用 `git merge --squash`

如果是要将整个 feature 分支合并为一个 commit 合入主分支：

```bash
git checkout main
git merge --squash feature-branch
git commit -m "feat: 新功能描述"
```

此方式不会保留 feature 分支的提交记录，所有更改压缩为一个新 commit。
