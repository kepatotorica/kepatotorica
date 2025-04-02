//https://leetcode.com/problems/3sum/

// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.

describe("testing template", () => {
  //Binary search recursive tests
  test("binaray exists 1", () => {
    expect(existsBinary([1, 2, 3, 4, 5, 6], 0, 5, 3)).toBe(true)
  })

  test("binaray exists 2", () => {
    expect(existsBinary([1, 2, 3, 4, 5, 6], 0, 5, 10)).toBe(false)
  })

  test("binaray exists works 3", () => {
    expect(existsBinary([1, 2, 3, 4, 5, 6], 0, 5, 0)).toBe(false)
  })

  test("binaray exists works 4", () => {
    expect(existsBinary([0], 0, 0, 0)).toBe(true)
  })

  test("binaray exists works 5", () => {
    expect(existsBinary([1], 0, 0, 0)).toBe(false)
  })

  //General test cases
  test("case 1", () => {
    expect(threeSum([-4,-1,-1,0,1,2])).toStrictEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ])
  })
})

function threeSum(nums: number[]): number[][] {
  //Sort the original array
  nums = nums.sort((a, b) => a - b)

  let validEntriesMap: Map<string,number[]> = new Map<string, number[]>()

  for (let lIndex = 0; lIndex < nums.length; lIndex++) {
    let rIndex = nums.length - 1
    while (lIndex + 1 < rIndex) { //+2 because we only look at three items, if we will go below that stop
      let lValue = nums[lIndex]
      let rValue = nums[rIndex]

      let mid = -1 * (rValue + lValue)
      if (existsBinary(nums, lIndex+1, rIndex-1, mid)) {
        if(mid == -0){
          mid = 0
        }
        validEntriesMap.set(`${lValue}, ${mid}, ${rValue}`, [lValue, mid, rValue])
      }

      --rIndex
    }
  }

  return Array.from(validEntriesMap.values())
}


function existsBinary(nums: number[], startIndex: number, endIndex: number, valueToFind: number): boolean {
  let midIndex = Math.ceil((startIndex + endIndex) / 2)
  let midValue = nums[midIndex]

  if (startIndex == endIndex) {
    return valueToFind == midValue
  }

  if (midValue > valueToFind) {
    return existsBinary(nums, startIndex, midIndex - 1, valueToFind)
  }

  if (midValue <= valueToFind) {
    return existsBinary(nums, midIndex, endIndex, valueToFind)
  }

  return false
}