import Card from "./card/Card";
import Rank from "./card/Rank";
import Suit from "./card/Suit";
import Cards from "./Cards";
import Lane from "./Lane";
import LaneId from "./LaneId";

describe("instansiation", () => {
  describe("of", () => {
    describe("successful call returns instance", () => {
      test("returns instance with lowest pair", () => {
        const laneId = LaneId.of(1);
        const highRankCard = Card.of(Suit.CLUB, Rank.TWO, true);
        const lowRankCard = Card.of(Suit.HEART, Rank.ACE, true);
        const cards = Cards.of([highRankCard, lowRankCard]);

        const lane = Lane.of(laneId, cards);
        expect(lane.laneId).toBe(laneId);
        expect(lane.cards).toEqual(cards);
      });
      test("returns instance with highest pair", () => {
        const laneId = LaneId.of(1);
        const highRankCard = Card.of(Suit.DIAMOND, Rank.KING, true);
        const lowRankCard = Card.of(Suit.SPADE, Rank.QUEEN, true);
        const cards = Cards.of([highRankCard, lowRankCard]);

        const lane = Lane.of(laneId, cards);
        expect(lane.laneId).toBe(laneId);
        expect(lane.cards).toEqual(cards);
      });
      test("returns instance with lowest one", () => {
        const laneId = LaneId.of(1);
        const lowRankCard = Card.of(Suit.HEART, Rank.ACE, true);
        const cards = Cards.of([lowRankCard]);

        const lane = Lane.of(laneId, cards);
        expect(lane.laneId).toBe(laneId);
        expect(lane.cards).toEqual(cards);
      });
      test("returns instance with highest one", () => {
        const laneId = LaneId.of(1);
        const highRankCard = Card.of(Suit.DIAMOND, Rank.KING, true);
        const cards = Cards.of([highRankCard]);

        const lane = Lane.of(laneId, cards);
        expect(lane.laneId).toBe(laneId);
        expect(lane.cards).toEqual(cards);
      });
      test("returns instance with null", () => {
        const laneId = LaneId.of(1);

        const lane = Lane.of(laneId, null);
        expect(lane.laneId).toBe(laneId);
        expect(lane.cards.values).toEqual(Cards.empty().values);
      });
      test("returns instance with empty cards", () => {
        const laneId = LaneId.of(1);
        // const cards = ;

        const lane = Lane.of(laneId, Cards.empty());
        expect(lane.laneId).toBe(laneId);
        // TODO: not work...
        // expect(lane.cards).toEqual(Cards.empty());
        expect(lane.cards.values).toEqual(Cards.empty().values);
      });
      test("returns instance with tail card that must have less index in array", () => {
        const laneId = LaneId.of(1);
        const tailCard = Card.of(Suit.HEART, Rank.ACE, false);
        const highRankCard = Card.of(Suit.CLUB, Rank.TWO, true);
        const lowRankCard = Card.of(Suit.DIAMOND, Rank.ACE, true);
        const cards = Cards.of([tailCard, highRankCard, lowRankCard]);

        const lane = Lane.of(laneId, cards);
        expect(lane.laneId).toBe(laneId);
        expect(lane.cards).toEqual(cards);
      });
    });
    describe("failed call throws error", () => {
      test("by null laneId", () => {
        const highRankCard = Card.of(Suit.CLUB, Rank.TWO, true);
        const lowRankCard = Card.of(Suit.HEART, Rank.ACE, true);

        expect(() =>
          Lane.of(null, Cards.of([highRankCard, lowRankCard]))
        ).toThrow("laneId must be non-empty");
      });
      test("by invalid order rank cards", () => {
        const highRankCard = Card.of(Suit.CLUB, Rank.TWO, true);
        const lowRankCard = Card.of(Suit.HEART, Rank.ACE, true);
        const laneId = LaneId.of(1);

        expect(() =>
          Lane.of(laneId, Cards.of([lowRankCard, highRankCard]))
        ).toThrow("invalid order");
      });
      test("by invalid order suit cards", () => {
        const highRankCard = Card.of(Suit.DIAMOND, Rank.TWO, true);
        const lowRankCard = Card.of(Suit.HEART, Rank.ACE, true);
        const laneId = LaneId.of(1);

        expect(() =>
          Lane.of(laneId, Cards.of([highRankCard, lowRankCard]))
        ).toThrow("invalid order");
      });
      test("by tail card that have larger index than head", () => {
        const highRankCard = Card.of(Suit.DIAMOND, Rank.TWO, true);
        const lowRankCard = Card.of(Suit.HEART, Rank.ACE, false);
        const laneId = LaneId.of(1);

        expect(() =>
          Lane.of(laneId, Cards.of([highRankCard, lowRankCard]))
        ).toThrow("invalid order");
      });
    });
  });
});

describe("append", () => {
  describe("successful call returns Lane that cards added", () => {
    test("empty lane appends cards start from K card", () => {
      const laneId = LaneId.of(1);
      const empty = Lane.of(laneId, null);
      const appendings = Cards.of([
        Card.of(Suit.CLUB, Rank.KING, true),
        Card.of(Suit.HEART, Rank.QUEEN, true),
      ]);
      const appended: Lane = empty.append(appendings);

      expect(appended.laneId).toEqual(laneId);
      expect(appended.cards.values).toEqual(appendings.values);
    });
    test("empty lane appends K card", () => {
      const laneId = LaneId.of(1);
      const empty = Lane.of(laneId, null);
      const appendings = Cards.of([Card.of(Suit.CLUB, Rank.KING, true)]);
      const appended: Lane = empty.append(appendings);

      expect(appended.laneId).toEqual(laneId);
      expect(appended.cards.values).toEqual(appendings.values);
    });
    test("non-empty lane appends cards start from 1 less than max index one in lane that is head", () => {
      const laneId = LaneId.of(1);
      const initial = Lane.of(
        laneId,
        Cards.of([
          Card.of(Suit.HEART, Rank.TWO, false),
          Card.of(Suit.CLUB, Rank.FIVE, true),
        ])
      );
      const appendings = Cards.of([
        Card.of(Suit.DIAMOND, Rank.FOUR, true),
        Card.of(Suit.SPADE, Rank.THREE, true),
      ]);
      const appended: Lane = initial.append(appendings);

      expect(appended.laneId).toEqual(laneId);
      expect(appended.cards.values).toEqual(
        initial.cards.values.concat(appendings.values)
      );
    });
    test("non-empty lane appends card 1 less than max index one in lane that is head", () => {
      const laneId = LaneId.of(1);
      const initial = Lane.of(
        laneId,
        Cards.of([
          Card.of(Suit.HEART, Rank.TWO, false),
          Card.of(Suit.CLUB, Rank.FIVE, true),
        ])
      );
      const appendings = Cards.of([Card.of(Suit.DIAMOND, Rank.FOUR, true)]);
      const appended: Lane = initial.append(appendings);

      expect(appended.laneId).toEqual(laneId);
      expect(appended.cards.values).toEqual(
        initial.cards.values.concat(appendings.values)
      );
    });
  });
  describe("failed call throws error", () => {
    test("empty lane reject to append any cards except for K card", () => {
      const laneId = LaneId.of(1);
      const empty = Lane.of(laneId, null);
      const appendings = Cards.of([Card.of(Suit.HEART, Rank.QUEEN, true)]);
      expect(() => empty.append(appendings)).toThrow(
        new Error("only K can be placed to empty lane")
      );
    });
    test("reject to append any cards contain tail card", () => {
      const laneId = LaneId.of(1);
      const empty = Lane.of(laneId, null);
      const appendings = Cards.of([Card.of(Suit.HEART, Rank.QUEEN, false)]);
      expect(() => empty.append(appendings)).toThrow(
        new Error("tail card cannot be appended")
      );
    });
    test("reject to append any invalid order cards", () => {
      const laneId = LaneId.of(1);
      const initial = Lane.of(
        laneId,
        Cards.of([
          Card.of(Suit.HEART, Rank.TWO, false),
          Card.of(Suit.CLUB, Rank.FIVE, true),
        ])
      );
      const appendings = Cards.of([Card.of(Suit.DIAMOND, Rank.THREE, true)]);
      expect(() => initial.append(appendings)).toThrow(
        new Error("invalid order cards")
      );
    });
  });
});
