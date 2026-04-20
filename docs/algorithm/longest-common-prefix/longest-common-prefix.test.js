import { expect, it } from 'vitest'
import { longestCommonPrefix } from './longest-common-prefix.js'

const cases = [
  { strs: ['flower', 'flow', 'flight'], expected: 'fl' },
  { strs: ['dog', 'racecar', 'car'], expected: '' },
]

it.each(cases)('计算字符串数组 $strs 的最长公共前缀', ({ strs, expected }) => {
  expect(longestCommonPrefix(strs)).toBe(expected)
})
