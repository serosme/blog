# 最后一个单词的长度

## 链接

[LeetCode](https://leetcode.cn/problems/length-of-last-word/description/)

## 题目

给你一个字符串 `s`，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 `最后一个` 单词的长度。

单词是指仅由字母组成、不包含任何空格字符的最大子字符串。

**提示：**

1 <= `s.length` <= 10^4

`s` 仅有英文字母和空格字符 `' '` 组成

`s` 中至少存在一个单词

::: info 示例 1
**输入**：s = "Hello World"

**输出**：5

**解释**：最后一个单词是 `World`，长度为 5
:::

::: info 示例 2
**输入**：s = " fly me to the moon "

**输出**：4

**解释**：最后一个单词是 `moon`，长度为 4
:::

::: info 示例 3
**输入**：s = "luffy is still joyboy"

**输出**：6

**解释**：最后一个单词是长度为 6 的 `joyboy`
:::

## 思路

从字符串末尾开始向前遍历：

1. 先跳过末尾可能存在的空格。
2. 遇到第一个非空格字符后开始计数。
3. 继续向前遍历，直到再次遇到空格，说明最后一个单词结束，直接返回计数结果。

这样只需要一次线性扫描，不需要额外拆分字符串。

## 题解

```js
export function lengthOfLastWord(s) {
  let length = 0
  for (let index = s.length - 1; index >= 0; index--) {
    const element = s[index]
    if (element !== ' ') {
      length++
    }
    else {
      if (length !== 0) {
        break
      }
    }
  }
  return length
}
```
