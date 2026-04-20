import fs from 'node:fs'
import path from 'node:path'

const dir = path.resolve('docs/daily')
const DAILY_FILE_REGEX = /^\d{8}\.md$/

const latest = fs.readdirSync(dir)
  .filter(f => DAILY_FILE_REGEX.test(f))
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
