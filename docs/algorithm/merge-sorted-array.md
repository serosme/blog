# 合并两个有序数组

## 链接

[LeetCode](https://leetcode.cn/problems/merge-sorted-array/description/)

## 题目

给你两个按 `非递减顺序` 排列的整数数组 `nums1` 和 `nums2`，另有两个整数 `m` 和 `n`，分别表示 `nums1` 和 `nums2` 中的元素数目。

请你合并 `nums2` 到 `nums1` 中，使合并后的数组同样按 `非递减顺序` 排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 `nums1` 中。为了应对这种情况，`nums1` 的初始长度为 `m + n`，其中前 `m` 个元素表示应合并的元素，后 `n` 个元素为 `0`，应忽略。`nums2` 的长度为 `n`。

::: info 示例 1
**输入**：nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3

**输出**：[***1***, ***2***, 2, ***3***, 5, 6]

**备注**：其中斜体加粗标注的为`nums1`中的元素
:::

::: info 示例 2
**输入**：nums1 = [1], m = 1, nums2 = [], n = 0

**输出**：[1]

**备注**：[1] 与 [] 合并后仍然是 [1]
:::

::: info 示例 3
**输入**：nums1 = [0], m = 0, nums2 = [1], n = 1

**输出**：[1]

**备注**：`nums1` 中的 `0` 仅仅是占位符，[0] 与 [1] 合并后是 [1]。
:::

## 思路

暴力解法：将 `nums2` 中的元素逐个插入到 `nums1` 中，并对 `nums1` 进行排序。

双指针解法：使用三个指针，分别指向 `nums1` 的末尾、`nums2` 的末尾和合并后数组的末尾。逆向遍历 `nums1` 和 `nums2`，将较大的元素放到合并后数组的末尾，直到其中一个数组被完全遍历。最后，如果 `nums2` 中还有剩余元素，则将它们复制到 `nums1` 的前面。

## 题解

::: code-group

```js
export function merge(nums1, m, nums2, n) {
  let i = m - 1
  let j = n - 1
  let k = m + n - 1

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--]
    }
    else {
      nums1[k--] = nums2[j--]
    }
  }

  while (j >= 0) {
    nums1[k--] = nums2[j--]
  }
}
```

```java
public void merge(int[] nums1, int m, int[] nums2, int n) {
    int i = m - 1;
    int j = n - 1;
    int k = m + n - 1;

    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }

    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}
```

:::
