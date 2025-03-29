//https://leetcode.com/problems/container-with-most-water/
//
// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
// Find two lines that together with the x-axis form a container, such that the container contains the most water.
// Return the maximum amount of water a container can store.
// Notice that you may not slant the container.

describe("testing template", () => {
  //Basic parsing
  test("case 1", () => {
    expect(template([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49)
  })

  test("case 2", () => {
    expect(template([1,1])).toBe(1)
  })

  test("case 3", () => {
    expect(template([0,0])).toBe(0)
  })

  test("case 4", () => {
    const array = [31, 47, 40, 48, 41, 73, 45, 28, 28, 76, 86, 58, 5, 58, 94, 80, 50, 74, 45, 49, 30, 2, 53, 75, 15, 50, 49, 92, 63, 56, 80, 13, 2, 54, 95, 78, 86, 60, 64, 69, 72, 80, 1, 92, 84, 50, 33, 93, 20, 3, 55, 1, 21, 22, 2, 56]
    expect(template(array)).toBe(3182)
  })

  test("case 5", () => {
    const array = [2968,2167,1472,5481,1973,5413,4179,2980,5278,215,1047,5185,7220,8870,3828,7496,2721,6602,6976,5675,2787,675,1201,9481,6286,3959,2518,5209,5393,4263,4545,8200,2396,4334,2025,5662,5590,6402,7188,2737,1337,813,2294,2173,3107,7560,8209,855,2392,7490,8320,214,2889,2981,2099,3723,3446,9674,8724,4350,7786,2398,6715,6159,538,1971,760,3660,3825,5127,9910,7322,5534,907,3010,3168,7161,340,7993,4374,2799,4133,5044,5375,802,1795,6840,6897,2932,1872,6453,6724,8155,5622,8807,5119,1644,5699,4064,6266,5021,7151,593,2265,1545,5679,6068,5863,6428,6110,6415,8599,6118,7214,7548,8048,4967,6111,1935,2071,3831,7283,985,4020,1268,1165,2568,8987,6103,9789,5775,2605,9665]
    expect(template(array)).toBe(1055530)
  })

  test("case 6", () => {
    const array = [8,7,2,1]
    expect(template(array)).toBe(7)
  })
})

function template(heights: number[]): number {
  //Left pointer, right pointer, loop through until they meet in the middle.
  // Keep track of the highest point.

  let leftIndex = 0
  let rightIndex = heights.length-1
  let maxArea = 0

  for(let i = 0; i < heights.length; i++){
    let width = rightIndex - leftIndex
    let area = 0
    let leftHeight = heights[leftIndex]
    let rightHeight = heights[rightIndex]

    if(rightHeight > leftHeight){
      area = width * leftHeight
      leftIndex++
    }else{
      area = width * rightHeight
      rightIndex--
    }

    maxArea = area > maxArea ? area : maxArea
  }

  return maxArea
}