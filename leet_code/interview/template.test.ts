describe("testing template", () => {
  //Basic parsing
  test("case 1", () => {
    expect(template("-1")).toBe("-1")
  })
})

function template(s: string): string {
  return s
}
