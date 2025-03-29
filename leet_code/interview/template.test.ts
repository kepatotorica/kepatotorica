describe("testing template", () => {
  //Basic parsing
  test("checks negativity", () => {
    expect(reverse("-1")).toBe("-1")
  })
})

function reverse(s: string): string {
  return s
}
