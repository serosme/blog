import fs from 'node:fs'
import path from 'node:path'

interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

const DOCS_DIR = path.resolve(__dirname, '..')
const byText = (a: SidebarItem, b: SidebarItem) => a.text.localeCompare(b.text, 'zh-CN')

function scan(dir: string, base: string): SidebarItem[] {
  const dirs: SidebarItem[] = []
  const files: SidebarItem[] = []

  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name.startsWith('_'))
      continue
    const full = path.join(dir, e.name)

    if (e.isDirectory()) {
      const items = scan(full, base)
      if (items.length)
        dirs.push({ text: e.name, collapsed: true, items })
    }
    else if (e.name.endsWith('.md')) {
      const link = path.relative(base, full).replace(/\\/g, '/').replace(/(?:\/index)?\.md$/, '')
      files.push({ text: e.name.replace(/\.md$/, ''), link: `/${link}` })
    }
  }

  return [...dirs.sort(byText), ...files.sort(byText)]
}

export function generateSidebar(): SidebarItem[] {
  return fs.readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('.') && !e.name.startsWith('_'))
    .map(e => ({ text: e.name, items: scan(path.join(DOCS_DIR, e.name), DOCS_DIR) }))
    .filter(g => g.items!.length)
}
