//https://leetcode.com/problems/reverse-integer/
// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

describe("testing template", () => {
  test("negative", () => {
    expect(reverse(-12)).toBe(-21)
  })

  test("positive", () => {
    expect(reverse(31)).toBe(13)
  })

  test("too small", () => {
    expect(reverse(-(2**32))).toBe(0)
  })

  test("too big", () => {
    expect(reverse((2**31))).toBe(0)
  })
})

function reverse(x: number): number {
  let smallestNumber = -(2**31)
  let largestNumber = 2**31 - 1

  let sign = x < 0 ? -1 : 1
  let stringNumber = x.toString().replace("-","")
  let sum = 0

  for(var i = 0; i < stringNumber.length; i++){
    let num = parseInt(stringNumber[i])
    sum += num * 10 ** i
  }

  sum = sign * sum

  if(sum < smallestNumber || sum > largestNumber){
    sum = 0
  }

  return sum
};