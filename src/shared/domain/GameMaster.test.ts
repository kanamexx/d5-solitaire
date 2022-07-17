import GameMaster from "./GameMaster";

describe("GameMaster", () => {
  describe("init", () => {
    test("initial lanes must have a face up card", () => {
      const playField = GameMaster.init();
      expect(
        playField.lanes.flatMap((l) => l.cards.values).map((c) => c.isFaceUp)
      ).toContain(true);
    });
  });
});
