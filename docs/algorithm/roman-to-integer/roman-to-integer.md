# 罗马数字转整数

## 链接

[LeetCode](https://leetcode.cn/problems/roman-to-integer/description/)

## 题目

罗马数字包含以下七种字符：`I`、`V`、`X`、`L`、`C`、`D` 和 `M`。

| 字符 | 数值 |
| ---- | ---- |
| I    | 1    |
| V    | 5    |
| X    | 10   |
| L    | 50   |
| C    | 100  |
| D    | 500  |
| M    | 1000 |

例如，罗马数字 `II` 表示 `2`，`XII` 表示 `12`，`XXVII` 表示 `27`。

通常情况下，罗马数字中小的数字在大的数字右边。但也存在特例：

- `I` 可以放在 `V`(`5`) 和 `X`(`10`) 的左边，来表示 `4` 和 `9`。
- `X` 可以放在 `L`(`50`) 和 `C`(`100`) 的左边，来表示 `40` 和 `90`。
- `C` 可以放在 `D`(`500`) 和 `M`(`1000`) 的左边，来表示 `400` 和 `900`。

给定一个罗马数字字符串 `s`，将其转换成整数。

::: info 示例 1
**输入**：s = "III"

**输出**：3
:::

::: info 示例 2
**输入**：s = "LVIII"

**输出**：58

**解释**：L = 50, V = 5, III = 3
:::

::: info 示例 3
**输入**：s = "MCMXCIV"

**输出**：1994

**解释**：M = 1000, CM = 900, XC = 90, IV = 4
:::

## 思路

哈希表 + 双字符匹配：从左往右遍历字符串，优先尝试匹配长度为 2 的特殊组合（`IV`、`IX`、`XL`、`XC`、`CD`、`CM`）。如果匹配成功就累加组合值并跳过下一个字符，否则按单字符值累加。

反向遍历 + 加减规则：从右往左遍历字符串，记录右侧最近字符值 `last`。当前值小于 `last` 时做减法，否则做加法。这样可以统一处理普通情况和减法情况，无需显式枚举双字符组合。

## 题解

::: code-group

```js [双字符匹配]
export function romanToInt(s) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,
  }

  let sum = 0

  for (let index = 0; index < s.length; index++) {
    const currentIndex = index
    const nextIndex = index + 1

    if (nextIndex < s.length) {
      const element = s[currentIndex] + s[nextIndex]
      if (element in map) {
        sum += map[element]
        index = index + 1
      }
      else {
        sum += map[s[currentIndex]]
      }
    }
    else {
      sum += map[s[currentIndex]]
    }
  }
  return sum
}
```

```js [反向遍历]
export function romanToInt2(s) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }

  let sum = 0
  let last = 0

  for (let index = s.length - 1; index >= 0; index--) {
    const value = map[s[index]]
    if (value < last) {
      sum = sum - value
    }
    else {
      sum = sum + value
    }
    last = value
  }
  return sum
}
```

:::
