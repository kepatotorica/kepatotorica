//https://leetcode.com/problems/3sum/

// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j != k, and nums[i] + nums[j] + nums[k] == 0.
// Notice that the solution set must not contain duplicate triplets.

describe("testing template", () => {
  //Binary search recursive tests
  test("binaray exists 1", () => {
    expect(exists([1,2,3,4,5,6], 0, 5, 3)).toBe(true)
  })

  test("binaray exists 2", () => {
    expect(exists([1,2,3,4,5,6], 0, 5, 10)).toBe(false)
  })

  test("binaray exists works 3", () => {
    expect(exists([1,2,3,4,5,6], 0, 5, 0)).toBe(false)
  })

  test("binaray exists works 4", () => {
    expect(exists([0], 0, 0, 0)).toBe(true)
  })

  test("binaray exists works 5", () => {
    expect(exists([1], 0, 0, 0)).toBe(false)
  })


  //General test cases
  test("case 1", () => {
    expect(threeSum([-1,0,1,2,-1,-4])).toBe([[-1,-1,2],[-1,0,1]])
  })
})

function threeSum(nums: number[]): number[][] {
  //Sort the original array
  nums = nums.sort()

  //have a pointer on the left, and one on the right
  let leftIndex = 0
  let rightIndex = nums.length

  // let validEntries = []
  // for(let i = 0; i < nums.length / 2; i++){
  //   // if the right minus the left is zero, break, unless the left item is negative, as 0 is a valid value
  //   let leftValue = nums[leftIndex]
  //   let rightValue = nums[rightIndex]
  //   let requiredMidValue = leftValue - rightValue

  //   if(exists(nums, leftIndex, rightIndex, requiredMidValue)){
  //     validEntries.push([leftValue, requiredMidValue, rightValue])
  //   }

  //   // leftValue = nums[leftIndex+1]
  //   // rightValue = nums[rightIndex]
  //   // requiredMidValue = leftValue - rightValue
  //   // if(exists(nums, leftIndex+1, rightIndex, requiredMidValue)){
  //   //   validEntries.push([leftValue, requiredMidValue, rightValue])
  //   // }

  //   // leftValue = nums[leftIndex]
  //   // rightValue = nums[rightIndex-1]
  //   // requiredMidValue = leftValue - rightValue
  //   // if(exists(nums, leftIndex, rightIndex-1, requiredMidValue)){
  //   //   validEntries.push([leftValue, requiredMidValue, rightValue])
  //   // }

  //   // We can't just move the pointer, after checking the current values, we need to do, L+1 -> R and L -> R-1 then we need to move both pointers to L+1 -> R-1


  //   // We need to skip x number when changing the index, until we don't find the same number
  //   // let diff = 0
  //   // if(leftMovedLast){
  //   //   --rightIndex
  //   //   // diff = nums[rightIndex] - rightValue
  //   //   // while(diff == 0 && leftIndex !== rightIndex){
  //   //   //   --rightIndex
  //   //   //   diff = nums[rightIndex] - rightValue
  //   //   //   ++i
  //   //   // }
  //   //   leftMovedLast = false
  //   // }else{
  //   //   ++leftIndex
  //   //   // diff = nums[leftIndex] - rightValue
  //   //   // while(diff == 0 && leftIndex !== rightIndex){
  //   //   //   ++leftIndex
  //   //   //   diff = nums[leftIndex] - rightValue
  //   //   //   ++i
  //   //   // }
  //   //   leftMovedLast = true
  //   // }
  // }


  const arrays = getAllMatches(nums, leftIndex, rightIndex)
  return arrays
};

function getAllMatches(nums: number[], leftIndex: number, rightIndex: number){
  let validEntries = []

  if(leftIndex == rightIndex) return []

  let leftValue = nums[leftIndex]
  let rightValue = nums[rightIndex]
  let requiredMidValue = leftValue - rightValue

  if(exists(nums, leftIndex, rightIndex, requiredMidValue)){
    validEntries.push([leftValue, requiredMidValue, rightValue])
  }

  leftValue = nums[leftIndex+1]
  rightValue = nums[rightIndex]
  requiredMidValue = leftValue - rightValue
  if(exists(nums, leftIndex+1, rightIndex, requiredMidValue)){
    validEntries.push(getAllMatches(nums, leftIndex+1, rightIndex))
  }

  leftValue = nums[leftIndex]
  rightValue = nums[rightIndex-1]
  requiredMidValue = leftValue - rightValue
  if(exists(nums, leftIndex, rightIndex-1, requiredMidValue)){
    validEntries.push(getAllMatches(nums, leftIndex, rightIndex-1))
  }
  //if l == r return
  //l+1,r append
  //l,r-1 append
  //l,r append

  return validEntries
}

function exists(nums: number[], startIndex: number, endIndex:number, valueToFind: number): boolean {
  let midIndex = Math.ceil((startIndex + endIndex) / 2)
  let midValue = nums[midIndex]

  if(startIndex == endIndex){
    return valueToFind == midValue
  }

  if(midValue > valueToFind){
    return exists(nums, startIndex, midIndex - 1, valueToFind)
  }

  if(midValue <= valueToFind){
    return exists(nums, midIndex, endIndex , valueToFind)
  }

  return false
}