import Card from "../domain/card/Card";
import Cards from "../domain/card/Cards";
import Rank from "../domain/card/Rank";
import Suit from "../domain/card/Suit";
import Lane from "../domain/lane/Lane";
import LaneId from "../domain/lane/LaneId";
import PlayField from "../domain/PlayField";
import PlayerUsecase from "./PlayerUsecase";

describe("move", () => {
  describe("success call returns new playfield", () => {
    test("move single card", () => {
      let initial = PlayField.of(
        [],
        [
          Lane.of(
            LaneId.of(0),
            Cards.of([Card.of(Suit.SPADE, Rank.ACE, true)])
          ),
          Lane.of(
            LaneId.of(1),
            Cards.of([Card.of(Suit.HEART, Rank.TWO, true)])
          ),
        ],
        []
      );

      const playerUsecase = new PlayerUsecase();
      const actual = playerUsecase.move(initial, 0, 0, 1);

      const expected = {
        playField: PlayField.of(
          [],
          [
            Lane.of(LaneId.of(0), Cards.empty()),
            Lane.of(
              LaneId.of(1),
              Cards.of([
                Card.of(Suit.HEART, Rank.TWO, true),
                Card.of(Suit.SPADE, Rank.ACE, true),
              ])
            ),
          ],
          []
        ),
        message: "",
      };
      // an object contains function cant be asserted by toEqual.
      // and so assert by toBeInstanceOf and stringified equality.
      expect(actual.playField).toBeInstanceOf(PlayField);
      expect(JSON.stringify(actual.playField)).toEqual(
        JSON.stringify(expected.playField)
      );
      expect(actual.message).toBe(expected.message);
    });
    test("move plural cards at once", () => {
      let initial = PlayField.of(
        [],
        [
          Lane.of(
            LaneId.of(0),
            Cards.of([
              Card.of(Suit.HEART, Rank.TWO, true),
              Card.of(Suit.SPADE, Rank.ACE, true),
            ])
          ),
          Lane.of(
            LaneId.of(1),
            Cards.of([Card.of(Suit.CLUB, Rank.THREE, true)])
          ),
        ],
        []
      );

      const playerUsecase = new PlayerUsecase();
      const actual = playerUsecase.move(initial, 0, 0, 1);

      const expected = {
        playField: PlayField.of(
          [],
          [
            Lane.of(LaneId.of(0), Cards.empty()),
            Lane.of(
              LaneId.of(1),
              Cards.of([
                Card.of(Suit.CLUB, Rank.THREE, true),
                Card.of(Suit.HEART, Rank.TWO, true),
                Card.of(Suit.SPADE, Rank.ACE, true),
              ])
            ),
          ],
          []
        ),
        message: "",
      };
      // an object contains function cant be asserted by toEqual.
      // and so assert by toBeInstanceOf and stringified equality.
      expect(actual.playField).toBeInstanceOf(PlayField);
      expect(JSON.stringify(actual.playField)).toEqual(
        JSON.stringify(expected.playField)
      );
      expect(actual.message).toBe(expected.message);
    });
  });
  describe("failed call returns rollbacked playField and error message", () => {
    test("invalid operation: if completed, invalid order cards will be arranged", () => {
      let initial = PlayField.of(
        [],
        [
          Lane.of(
            LaneId.of(0),
            Cards.of([Card.of(Suit.SPADE, Rank.TWO, true)])
          ),
          Lane.of(
            LaneId.of(1),
            Cards.of([Card.of(Suit.HEART, Rank.TWO, true)])
          ),
        ],
        []
      );

      const playerUsecase = new PlayerUsecase();
      const actual = playerUsecase.move(initial, 0, 0, 1);

      const expected = {
        playField: PlayField.of(
          [],
          [
            Lane.of(
              LaneId.of(0),
              Cards.of([Card.of(Suit.SPADE, Rank.TWO, true)])
            ),
            Lane.of(
              LaneId.of(1),
              Cards.of([Card.of(Suit.HEART, Rank.TWO, true)])
            ),
          ],
          []
        ),
        message: "invalid order cards",
      };
      // an object contains function cant be asserted by toEqual.
      // and so assert by toBeInstanceOf and stringified equality.
      expect(actual.playField).toBeInstanceOf(PlayField);
      expect(JSON.stringify(actual.playField)).toEqual(
        JSON.stringify(expected.playField)
      );
      expect(actual.message).toBe(expected.message);
    });
    test("invalid operation: move empty card", () => {
      let initial = PlayField.of(
        [],
        [
          Lane.of(LaneId.of(0), Cards.empty()),
          Lane.of(
            LaneId.of(1),
            Cards.of([Card.of(Suit.HEART, Rank.TWO, true)])
          ),
        ],
        []
      );

      const playerUsecase = new PlayerUsecase();
      const actual = playerUsecase.move(initial, 0, 0, 1);

      const expected = {
        playField: PlayField.of(
          [],
          [
            Lane.of(LaneId.of(0), Cards.empty()),
            Lane.of(
              LaneId.of(1),
              Cards.of([Card.of(Suit.HEART, Rank.TWO, true)])
            ),
          ],
          []
        ),
        message: "select card(s)",
      };
      // an object contains function cant be asserted by toEqual.
      // and so assert by toBeInstanceOf and stringified equality.
      expect(actual.playField).toBeInstanceOf(PlayField);
      expect(JSON.stringify(actual.playField)).toEqual(
        JSON.stringify(expected.playField)
      );
      expect(actual.message).toBe(expected.message);
    });
    test("invalid operation: move facedown card(s)", () => {
      let initial = PlayField.of(
        [],
        [
          Lane.of(
            LaneId.of(0),
            Cards.of([Card.of(Suit.SPADE, Rank.ACE, false)])
          ),
          Lane.of(
            LaneId.of(1),
            Cards.of([Card.of(Suit.HEART, Rank.TWO, true)])
          ),
        ],
        []
      );

      const playerUsecase = new PlayerUsecase();
      const actual = playerUsecase.move(initial, 0, 0, 1);

      const expected = {
        playField: PlayField.of(
          [],
          [
            Lane.of(
              LaneId.of(0),
              Cards.of([Card.of(Suit.SPADE, Rank.ACE, false)])
            ),
            Lane.of(
              LaneId.of(1),
              Cards.of([Card.of(Suit.HEART, Rank.TWO, true)])
            ),
          ],
          []
        ),
        message: "you cannot move face down card(s)",
      };
      // an object contains function cant be asserted by toEqual.
      // and so assert by toBeInstanceOf and stringified equality.
      expect(actual.playField).toBeInstanceOf(PlayField);
      expect(JSON.stringify(actual.playField)).toEqual(
        JSON.stringify(expected.playField)
      );
      expect(actual.message).toBe(expected.message);
    });
  });
});
