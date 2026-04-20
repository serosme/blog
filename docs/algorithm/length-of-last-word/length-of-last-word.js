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
