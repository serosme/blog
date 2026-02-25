import { expect, it } from 'vitest'
import { romanToInt, romanToInt2 } from './roman-to-integer.js'

it.each([
  { s: 'III', expected: 3 },
  { s: 'IV', expected: 4 },
  { s: 'IX', expected: 9 },
  { s: 'LVIII', expected: 58 },
  { s: 'MCMXCIV', expected: 1994 },
])('将 $s 转换为整数', ({ s, expected }) => {
  const result = romanToInt(s)
  expect(result).toBe(expected)
})

it.each([
  { s: 'III', expected: 3 },
  { s: 'IV', expected: 4 },
  { s: 'IX', expected: 9 },
  { s: 'LVIII', expected: 58 },
  { s: 'MCMXCIV', expected: 1994 },
])('将 $s 转换为整数', ({ s, expected }) => {
  const result = romanToInt2(s)
  expect(result).toBe(expected)
})
