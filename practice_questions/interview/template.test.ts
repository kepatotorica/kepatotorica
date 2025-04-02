
describe("testing TODOASDF", () => {
  var testCount = 1

  test(`case ${testCount++}`, () => {
    expect(TODOASDF("-1")).toBe("-1")
  })
})

function TODOASDF(s: string): string {
  return s
}
