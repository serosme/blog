import { describe, expect, it } from 'vitest'
import { romanToInt, romanToInt2 } from './roman-to-integer.js'

const cases = [
  { s: 'III', expected: 3 },
  { s: 'IV', expected: 4 },
  { s: 'IX', expected: 9 },
  { s: 'LVIII', expected: 58 },
  { s: 'MCMXCIV', expected: 1994 },
]

const implementations = [
  ['romanToInt', romanToInt],
  ['romanToInt2', romanToInt2],
]

describe.each(implementations)('%s', (_, fn) => {
  it.each(cases)('将 $s 转换为整数', ({ s, expected }) => {
    expect(fn(s)).toBe(expected)
  })
})
