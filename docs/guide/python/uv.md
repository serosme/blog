# uv

## 文档

[uv](https://docs.astral.sh/uv/)

## 镜像配置

### pyproject.toml

```toml
[[tool.uv.index]]
url = "https://mirrors.ustc.edu.cn/pypi/simple"
default = true
```

### uv.toml

```toml
[[index]]
url = "https://mirrors.ustc.edu.cn/pypi/simple"
default = true
```

## 快速入门

安装 Python：

```shell
uv python install
```

初始化项目：

```shell
uv init example
```

添加依赖：

```shell
uv add ruff
```

更新项目环境：

```shell
uv sync
```
