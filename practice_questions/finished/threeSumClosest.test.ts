//https://leetcode.com/problems/3sum-closest/
// Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.
// Return the sum of the three integers.
// You may assume that each input would have exactly one solution.

// Example 1:

// Input: nums = [-1,2,1,-4], target = 1
// Output: 2
// Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

// Example 2:

// Input: nums = [0,0,0], target = 1
// Output: 0
// Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
describe("testing getIndexOfItem", () => {
  test("Binary search works", () => {
    expect(getIndexOfItem([1, 2, 3, 4, 5, 6, 7], 0, 6, 3)).toBe(2)
  })

  test("Binary search works", () => {
    expect(getIndexOfItem([0], 0, 0, 0)).toBe(0)
  })

  test("Binary search works", () => {
    expect(getIndexOfItem([1, 2, 3, 4, 5, 6, 7], 0, 6, 20)).toBe(-1)
  })
})


describe("testing getClosest", () => {
  test("Binary search works", () => {
    expect(getClosest([1, 2, 3, 4, 5, 6, 7], 0, 6, 3)).toBe(3)
  })

  test("Binary search works", () => {
    expect(getClosest([0], 0, 0, 0)).toBe(0)
  })

  test("Binary search works", () => {
    expect(getClosest([1, 2, 3, 4, 5, 6, 7], 0, 6, 20)).toBe(7)
  })

  test("Binary search works", () => {
    expect(getClosest([1, 2, 3, 4, 5, 6, 7], 0, 6, -20)).toBe(1)
  })
})

describe("testing threeSumClosest", () => {
  var testCount = 1

  test(`case ${testCount++}`, () => {
    expect(threeSumClosest([0, 0, 0], 1)).toBe(0)
  })

  test(`case ${testCount++}`, () => {
    expect(threeSumClosest([-1, 2, 1, -4], 1)).toBe(2)
  })

  test(`case ${testCount++}`, () => {
    expect(threeSumClosest([-10000, 2, 1, -4], 6)).toBe(-1)
  })

  test(`case ${testCount++}`, () => {
    expect(threeSumClosest([10000, -2, -1, 4], 6)).toBe(1)
  })

  test(`case ${testCount++}`, () => {
    expect(threeSumClosest([10000, -2, -1, 4], 1)).toBe(1)
  })

  test(`case ${testCount++}`, () => {
    expect(threeSumClosest([-84, 92, 26, 19, -7, 9, 42, -51, 8, 30, -100, -13, -38], 78)).toBe(77)
  })
})

function threeSumClosest(nums: number[], target: number): number {
  let sortedList = nums.sort((a, b) => a - b)
  let listLength = sortedList.length
  let closestSumFound = Number.MAX_VALUE

  //Move left to right until you are 2 away from the end of the list
  for (let li = 0; li < listLength - 2; li++) {
    let lv = sortedList[li]
    //Move right to left until you are 2 away from the current left pointer
    for (let ri = listLength - 1; ri > li + 1; ri--) {
      let rv = sortedList[ri]
      if (lv == 9 && rv == 42) {
      }
      let idealNumber = target - lv - rv
      let closestMV = getClosest(nums, li + 1, ri - 1, idealNumber)
      let currentSum = lv + rv + closestMV
      if (closestMV == idealNumber) {
        return currentSum
      } else if (Math.abs(target - currentSum) < Math.abs(target - closestSumFound)) {//Need abs because -1000000 is smaller than 10, but much further away
        closestSumFound = currentSum
      }
    }
  }

  return closestSumFound
}


function getClosest(nums: number[], li: number, ri: number, target: number): number {
  let closest = Number.MAX_VALUE//Could do undefined if we think we will get close to this

  while (li <= ri) {
    let mi = Math.ceil((li + ri) / 2)
    let mv = nums[mi]

    if (mv == target) return mv
    if (mv > target) {
      if (Math.abs(target - mv) < Math.abs(target - closest)) {
        closest = mv
      }
      ri = mi - 1
    }
    if (mv < target) {
      if (Math.abs(target - mv) < Math.abs(target - closest)) {
        closest = mv
      }
      li = mi + 1
    }
  }

  return closest
}




///NOT NEEDED AT ALL
function getIndexOfItem(nums: number[], li: number, ri: number, target: number): number {
  while (li <= ri) {
    let mi = Math.ceil((li + ri) / 2)
    let mv = nums[mi]

    if (mv == target) return mi
    if (mv > target) ri = mi - 1
    if (mv < target) li = mi + 1
  }

  return -1
}
