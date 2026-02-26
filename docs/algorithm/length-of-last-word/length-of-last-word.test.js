import { expect, it } from 'vitest'
import { lengthOfLastWord } from './length-of-last-word.js'

const cases = [
  { s: 'Hello World', expected: 5 },
  { s: '   fly me   to   the moon  ', expected: 4 },
  { s: 'luffy is still joyboy', expected: 6 },
  { s: 'a', expected: 1 },
  { s: 'a ', expected: 1 },
]

it.each(cases)('计算字符串 $s 中最后一个单词的长度', ({ s, expected }) => {
  expect(lengthOfLastWord(s)).toBe(expected)
})
