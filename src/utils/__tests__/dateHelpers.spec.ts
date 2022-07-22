import { converTimeToInt } from "../dateHelpers";

describe("converTimeToInt", () => {
  it("12:00 PM should be larger than 11: 59 AM but less than 01: 00 PM", async () => {
    const beforeTime = converTimeToInt("11:59 AM");
    const afterTime = converTimeToInt("01:00 PM");
    const baseTime = converTimeToInt("12:00 PM");
    expect(baseTime).toBeGreaterThan(beforeTime);
    expect(baseTime).toBeLessThan(afterTime);
  });
});
