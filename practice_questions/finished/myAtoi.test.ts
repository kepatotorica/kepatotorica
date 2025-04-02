describe("testing myAtoi", () => {
  //Basic parsing
  test("checks negativity", () => {
    expect(myAtoi("-1")).toBe(-1)
  })

  test("positive is allowed", () => {
    expect(myAtoi("+1")).toBe(1)
  })

  test("checks positivity", () => {
    expect(myAtoi("1")).toBe(1)
  })

  test("ignores leading spaces", () => {
    expect(myAtoi("   1")).toBe(1)
  })

  test("works with longer numbers", () => {
    expect(myAtoi("12345")).toBe(12345)
  })

  test("Works with intermixed characters", () => {
    expect(myAtoi("123C45")).toBe(123)
  })

  //Edge cases
  test("handles negative string only", () => {
    expect(myAtoi("-")).toBe(0)
  })

  test("handles empty string", () => {
    expect(myAtoi("")).toBe(0)
  })

  test("handles empty string with spaces", () => {
    expect(myAtoi("    ")).toBe(0)
  })

  test("handles text only", () => {
    expect(myAtoi("asjkdhf aposheflkaj ndf")).toBe(0)
  })

  test("rounds to largest positive number", () => {
    expect(myAtoi("21474836471")).toBe(2147483647)
  })

  test("rounds to largest negative number", () => {
    expect(myAtoi("-21474836471")).toBe(-2147483648)
  })

  test("handles multiple plus signs", () => {
    expect(myAtoi("++123")).toBe(0)
  })

  test("handles mixed signs", () => {
    expect(myAtoi("-+123")).toBe(0)
  })

  test("handles -+", () => {
    expect(myAtoi("-+")).toBe(0)
  })

  test("handles +-", () => {
    expect(myAtoi("+-")).toBe(0)
  })
})

// https://leetcode.com/problems/string-to-integer-atoi/

// Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

// The algorithm for myAtoi(string s) is as follows:

//     Whitespace: Ignore any leading whitespace (" ").
//     Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present.
//     Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
//     Rounding: If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then round the integer to remain in the range. Specifically, integers less than -231 should be rounded to -231, and integers greater than 231 - 1 should be rounded to 231 - 1.

function myAtoi(s: string): number {
  s = s.trim()
  if (s.length == 0) return 0

  const isNegative = s[0] == "-"
  const maxNumber = isNegative ? 2147483648 : 2147483647
  let numbers: number[] = []

  let startingIndex = isNegative ? 1 : 0

  if (!isNegative && s[0] == "+") {
    startingIndex++
  }
  //todo test for start indez of =, if ifs therr move the index oje more
  if (startingIndex >= s.length) return 0

  for (let charIndex = startingIndex; charIndex < s.length; charIndex++) {
    const currentNumber = parseInt(s[charIndex])
    if (isNaN(currentNumber)) break
    numbers.push(currentNumber)
  }

  let sum = 0
  for (let indexOfNumber = 0; indexOfNumber < numbers.length; indexOfNumber++) {
    let multiplier = Math.pow(10, numbers.length - 1 - indexOfNumber)
    // Len 3
    // 0 => 100
    // 1 => 10
    // 2 => 1
    sum += numbers[indexOfNumber] * multiplier
    if (sum >= maxNumber) {
      sum = maxNumber
      break
    }
  }

  return sum == 0 ? 0 : isNegative ? -sum : sum
}
