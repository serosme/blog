import fs from 'node:fs'
import path from 'node:path'

const dir = path.resolve('docs/daily')

const latest = fs.readdirSync(dir)
  .filter(f => /^\d{8}\.md$/.test(f))
  .sort()
  .pop()

export default {
  paths: () => [{
    params: { slug: 'latest' },
    content: latest
      ? fs.readFileSync(path.join(dir, latest), 'utf-8')
      : '',
  }],
}
