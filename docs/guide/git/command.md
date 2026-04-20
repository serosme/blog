# Git Command

## git clean

清理工作目录中所有未跟踪的文件和目录

```shell
git clean -fdx
```

## git reset

回到最新提交的干净状态

```shell
git reset --hard HEAD
```

基于当前代码创建一个没有父提交的新提交

```shell
git reset $(git commit-tree HEAD^{tree} -m "feat: init")
```

## git rev-parse

获取当前 `HEAD` 所指向提交的短哈希值

```shell
git rev-parse --short HEAD
```
