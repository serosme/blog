---
name: sync-sidebar
description: 根据 docs/ 目录下的 .md 文件结构，同步更新 VitePress 的 sidebar 配置（config.mts）和首页 actions（index.md）。当用户新增、删除、移动文档文件后需要同步配置时使用。
---

# sync-sidebar

## 触发条件

- 用户在 `docs/` 下新增、删除、重命名了 `.md` 文件或文件夹
- 用户说"更新 sidebar"、"同步配置"、"根据目录更新"

## 操作流程

### 第一步：扫描 docs/ 目录结构

列出 `docs/` 下所有 `.md` 文件，排除 `docs/index.md`（首页）和 `.vitepress/` 下的文件：

```powershell
Get-ChildItem -Path docs -Recurse -Filter *.md |
  Where-Object { $_.FullName -notmatch '\\\.vitepress\\' -and $_.FullName -notmatch '\\docs\\index\.md$' } |
  ForEach-Object { $_.FullName -replace '.*\\docs\\', '' -replace '\\', '/' -replace '\.md$', '' }
```

按顶层文件夹分组，得到类似：

```
algorithm/merge-sorted-array
algorithm/roman-to-integer/roman-to-integer
guide/docker/reference
guide/docker/setup
guide/scoop/index
```

### 第二步：读取现有配置

读取两个文件：

- `docs/.vitepress/config.mts` — sidebar 配置
- `docs/index.md` — 首页 hero actions

### 第三步：提取每个文件的显示标题

对于每个扫描到的 `.md` 文件，读取其内容，提取**第一个一级标题**（`# 标题`）作为 `text`。若文件中没有一级标题，则用文件名作为 `text`。

> 注意：本项目 `.md` 文件不使用 YAML frontmatter，标题来自 Markdown 一级标题。

### 第四步：根据目录结构更新 sidebar

#### 分组规则

- `docs/` 下每个**顶层文件夹** = 一个 sidebar 分组
- 分组 `text`：优先保留 `config.mts` 中已有的中文名称；新增分组取文件夹名

#### 嵌套规则

| 子文件夹内 .md 文件数 | 处理方式 |
|---|---|
| **1 个** | 展平为直接条目（不产生嵌套子菜单） |
| **2 个及以上** | 嵌套为 `collapsible` 子菜单，子文件夹名作为父级 `text` |

示例：

- `length-of-last-word/` 下只有 1 个文件 → 展平为 `{ text: '最后一个单词的长度', link: '/algorithm/length-of-last-word/length-of-last-word' }`
- `docker/` 下有 2 个文件 → 嵌套子菜单

#### collapsed 规则

- **已有分组**：保留 `config.mts` 中现有的 `collapsed` 设置，不被覆盖
- **新增分组**：默认 `collapsed: true`

#### 排序规则

- 同层级条目按**显示文本（text）拼音首字母**升序排列
- 子文件夹分组排在直接文件条目之前

#### 示例输出结构

```typescript
sidebar: [
  {
    text: '算法',
    items: [
      { text: '合并两个有序数组', link: '/algorithm/merge-sorted-array' },
      { text: '罗马数字转整数', link: '/algorithm/roman-to-integer/roman-to-integer' },
      { text: '最后一个单词的长度', link: '/algorithm/length-of-last-word/length-of-last-word' },
      { text: '最长公共前缀', link: '/algorithm/longest-common-prefix/longest-common-prefix' },
    ],
  },
  {
    text: '指南',
    collapsed: true,
    items: [
      { text: 'Docker', items: [
        { text: '参考', link: '/guide/docker/reference' },
        { text: '安装', link: '/guide/docker/setup' },
      ]},
      { text: 'Git', items: [
        { text: '命令', link: '/guide/git/command' },
        { text: '安装', link: '/guide/git/setup' },
      ]},
      { text: 'Linux', items: [
        { text: 'Chrony', link: '/guide/linux/chrony' },
      ]},
    ],
  },
]
```

### 第五步：更新首页 actions

读取 `docs/index.md`，更新 `hero.actions`：

- `docs/` 下有几个顶层文件夹，就有几个 action
- 每个 action 的 `text` = 分组名（与 sidebar 分组 `text` 一致），`link` = 该分组下第一个页面的链接
- 第一个 action 用 `theme: brand`，其余用 `theme: alt`
- 分组顺序与 sidebar 保持一致

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

### 第六步：验证

- 每个 sidebar 中的 `link` 对应实际存在的 `.md` 文件
- 首页 action 的 `link` 同样有效
- 没有指向不存在文件的"目录"条目

## 注意事项

- `link` 路径不以 `/` 结尾（VitePress `cleanUrls: true` 约定），除非目标文件是 `index.md`
- **不要修改** sidebar 之外的其他配置项（`nav`、`socialLinks`、`search`、`title` 等）
- 对于已有分组，**保留**现有的 `text` 和 `collapsed` 值，不被覆盖
- 完成后提示用户运行 `npm run build` 检查构建是否正常
