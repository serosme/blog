---
name: sync-sidebar
description: 根据 docs/ 目录下的 .md 文件结构，同步更新 VitePress 的 sidebar 配置（config.mts）和首页 actions（index.md）。当用户新增、删除、移动文档文件后需要同步配置时使用。
---

# sync-sidebar

## 触发条件

- 用户在 `docs/` 下新增、删除、重命名了 `.md` 文件或文件夹
- 用户说"更新 sidebar"、"同步配置"、"根据目录更新"

## 操作流程

### - [ ] 扫描 docs/ 目录结构并提取标题

使用文件搜索工具列出 `docs/` 下所有 `.md` 文件，按以下规则过滤：

- **排除** `docs/index.md`（首页）
- **排除** `.vitepress/` 目录下的所有文件
- **排除** `docs/` 根目录下的 `.md` 文件（不在任何顶层子文件夹内）

将路径转换为相对于 `docs/` 的格式，去掉 `.md` 扩展名。例如：

- `docs/algorithm/merge-sorted-array.md` → `algorithm/merge-sorted-array`
- `docs/algorithm/two-sum.md` → `algorithm/two-sum`
- `docs/guide/docker/setup.md` → `guide/docker/setup`

然后按顶层文件夹名分组，得到类似：

```text
algorithm/merge-sorted-array
algorithm/two-sum
guide/docker/reference
guide/docker/setup
guide/scoop/index
```

**提取显示标题**：对于每个扫描到的 `.md` 文件，读取其内容，提取**第一个一级标题**（`# 标题`）作为 `text`。若文件中没有一级标题，则用文件名作为 `text`。

> 注意：本项目 `.md` 文件不使用 YAML frontmatter，标题来自 Markdown 一级标题。

### - [ ] 读取现有配置

读取两个文件：

- `docs/.vitepress/config.mts` — sidebar 配置
- `docs/index.md` — 首页 hero actions

### - [ ] 根据目录结构更新 sidebar

#### 分组规则

- `docs/` 下每个**顶层文件夹** = 一个 sidebar 分组
- 分组 `text`：优先保留 `config.mts` 中已有的中文名称；新增分组取文件夹名

#### 嵌套规则

| 子文件夹内 .md 文件数 | 处理方式                                               |
| --------------------- | ------------------------------------------------------ |
| **1 个**              | 展平为直接条目（不产生嵌套子菜单）                     |
| **2 个及以上**        | 嵌套为 `collapsible` 子菜单，子文件夹名作为父级 `text` |

示例：

- `length-of-last-word/` 下只有 1 个文件 → 展平为 `{ text: '最后一个单词的长度', link: '/algorithm/length-of-last-word/length-of-last-word' }`
- `docker/` 下有 2 个文件 → 嵌套子菜单

> **index.md 特殊情况**：若子文件夹内唯一的文件是 `index.md`，展平时的 `link` 为文件夹路径（如 `/guide/scoop`），而非 `/guide/scoop/index`。

#### collapsed 规则

- **已有分组**：保留 `config.mts` 中现有的 `collapsed` 设置，不被覆盖
- **新增分组**：默认 `collapsed: true`

#### 排序规则

同层级内按以下优先级排序：

1. **子文件夹分组排在直接文件条目之前**
2. **同为子文件夹分组**时，按文件夹名字典序升序排列
3. **同为直接文件条目**时，按文件名字典序升序排列

中文字符按 Unicode 码点自然排序。

#### 输出格式说明

输出结构要点：

- 平铺条目：`{ text: '页面标题', link: '/path/to/page' }`
- 嵌套分组（≥2 文件）：`{ text: '子文件夹名', collapsed: true, items: [...] }`
- 顶层分组保留已有的 `collapsed` 设置

> **路径格式**：`link` 不以 `/` 结尾（VitePress `cleanUrls: true` 约定），除非目标文件是 `index.md`。
> **保留其他配置**：不要修改 sidebar 之外的其他配置项（`nav`、`socialLinks`、`search`、`title` 等）。

### - [ ] 更新首页 actions

读取 `docs/index.md`，更新 `hero.actions`：

- `docs/` 下有几个顶层文件夹，就有几个 action
- 每个 action 的 `text` = 分组名（与 sidebar 分组 `text` 一致），`link` = 该分组下按 sidebar 排序后的第一个有效页面的链接
- 第一个 action 用 `theme: brand`，其余用 `theme: alt`
- 分组顺序与 sidebar 保持一致
- **边界情况**：若 `docs/` 下没有顶层文件夹，则清空 `hero.actions` 或移除整个 `actions` 块

示例：

```yaml
actions:
  - theme: brand
    text: 指南
    link: /guide/docker/reference
  - theme: alt
    text: 算法
    link: /algorithm/merge-sorted-array
```

### - [ ] 验证

- 每个 sidebar 中的 `link` 对应实际存在的 `.md` 文件
- 首页 action 的 `link` 同样有效
- 没有指向不存在文件的"目录"条目

## 注意事项

- 完成后提示用户运行 `npm run build` 检查构建是否正常
