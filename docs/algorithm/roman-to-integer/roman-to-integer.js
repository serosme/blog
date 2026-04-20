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
