# Git 修改历史 Commit Message 的标准流程

## 适用场景

修改**非最新**的 commit 的 message，并保持所有时间戳不变（author date + committer date）

## 核心操作流程

### 启动交互式 rebase

```bash
git rebase -i --committer-date-is-author-date HEAD~n
```

### 标记要修改的 commit

在打开的编辑器中，将目标 commit 前的 `pick` 改为 `reword`（或 `r`）

```text
原：pick abc123 旧消息
改：reword abc123 旧消息
```

保存并退出

### 修改 commit message

在弹出的新编辑器中，输入新消息，保存退出

### 验证结果

查看修改后的历史（包含时间戳）

```bash
git log --format="%h %s%n  Author date: %ad%n  Committer date: %cd%n" --date=iso
```
