import LaneId from "./LaneId";

describe("instantiation", () => {
  test("successful call returns instance", () => {
    const laneId = LaneId.of(2);
    expect(laneId.value).toBe(2);
  });
});
