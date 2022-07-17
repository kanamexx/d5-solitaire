import GameMaster from "./GameMaster";

describe("GameMaster", () => {
  describe("init", () => {
    test("initial lanes must have face up cards", () => {
      const playField = GameMaster.init();
      expect(
        playField.lines.flatMap((l) => l).map((a) => a.isFaceUp)
      ).toContain(true);
    });
  });
});
