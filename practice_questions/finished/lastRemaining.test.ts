//TODOASDF didn't do this one
// //https://leetcode.com/problems/elimination-game/
// //You have a list arr of all integers in the range [1, n] sorted in a strictly increasing order. Apply the following algorithm on arr:
// // Starting from left to right, remove the first number and every other number afterward until you reach the end of the list.
// // Repeat the previous step again, but this time from right to left, remove the rightmost number and every other number from the remaining numbers.
// // Keep repeating the steps again, alternating left to right and right to left, until a single number remains.
// // Given the integer n, return the last number that remains in arr.
// // Input: n = 9
// // Output: 6
// // Explanation:
// // arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// // arr = [2, 4, 6, 8]
// // arr = [2, 6]
// // arr = [6]

// //This gave me the hints for the solution https://www.youtube.com/watch?v=e0Og3BhJAe0&t=138s

// describe("lastRemaningTests", () => {
//   test("case 1", () => {
//     expect(lastRemaining("1")).toBe(1)
//   })

//   test("case 2", () => {
//     // expect(1).toBe(1)
//     expect(lastRemaining("11")).toBe(8)
//   })

//   test("case 3", () => {
//     // expect(1).toBe(1)
//     expect(lastRemaining("12")).toBe(6)
//   })

//   test("case 4", () => {
//     // expect(1).toBe(1)
//     expect(lastRemaining("14")).toBe(8)
//   })

//   test("case 5", () => {
//     // expect(1).toBe(1)
//     expect(lastRemaining("16")).toBe(6)
//   })

//   test("case 6", () => {
//     // expect(1).toBe(1)
//     expect(lastRemaining("20")).toBe(6)
//   })

//   test("case 7", () => {
//     // expect(1).toBe(1)
//     expect(lastRemaining("25")).toBe(14)
//   })
// })

// function lastRemaining(s: string) {
//   let itemsInArray = parseInt(s)

//   let num = Math.log2(itemsInArray)

//   return num

//   // for(let i = parseInt(s); i > 0 ; i--){
//   //   prevList.push(i)
//   // }

//   // while(prevList.length != 1){ //Might have edge cases here if there are no values passed in.
//   //   let newList: number[] = []
//   //   let skip = true
//   //   while(prevList.length > 0) {
//   //     let number = prevList.pop() || -1
//   //     if(!skip){
//   //       newList.push(number)
//   //       skip = true
//   //     }else{
//   //       skip = false
//   //     }
//   //   }
//   //   prevList = newList
//   // }

//   // return prevList[0]

// //1 2 3 4 5 6 7 8 9 10 11
// //  2   4   6   8   10
// //      4       8
// //              8

// // 2*    (1  2  3  4  5)
// // 2*2   (   1     2   )
// // 2*2*2 (         1   )

// // 2^depth


// //1 2 3 4 5 6 7 8 9 10 11 12
// //  2   4   6   8   10    12
// //  2       6       10
// //          6

// // 2     (1 2 3 4 5 6)
// // 2*2   (1   2   3  ) - 2
// // 2*2*2 (    1      ) - 2


// //1 2 3 4 5 6 7 8 9 10 11 12 13 14
// //  2   4   6   8   10    12    14
// //      4       8         12
// //              8

// //1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
// //  2   4   6   8   10    12    14    16    18    20    22    24
// //  2       6       10          14          18          22
// //          6                   14                      22
// //                              14
// }
