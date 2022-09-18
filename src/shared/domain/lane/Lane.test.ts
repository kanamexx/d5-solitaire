import Card from "../card/Card";
import Cards from "../card/Cards";
import Rank from "../card/Rank";
import Suit from "../card/Suit";
import Lane from "./Lane";
import LaneId from "./LaneId";

describe("instantiation", () => {
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
      test("returns instance with back card that must have less index in array", () => {
        const laneId = LaneId.of(1);
        const backCard = Card.of(Suit.HEART, Rank.ACE, false);
        const highRankCard = Card.of(Suit.CLUB, Rank.TWO, true);
        const lowRankCard = Card.of(Suit.DIAMOND, Rank.ACE, true);
        const cards = Cards.of([backCard, highRankCard, lowRankCard]);

        const lane = Lane.of(laneId, cards);
        expect(lane.laneId).toBe(laneId);
        expect(lane.cards).toEqual(cards);
      });
      test("returns instance with only face down cards", () => {
        const laneId = LaneId.of(0);
        const facedown1 = Card.of(Suit.HEART, Rank.ACE, false);
        const facedown2 = Card.of(Suit.CLUB, Rank.TWO, false);
        const facedown3 = Card.of(Suit.DIAMOND, Rank.THREE, false);
        const cards = Cards.of([facedown1, facedown2, facedown3]);

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
      test("by back card that have larger index than face", () => {
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
    test("non-empty lane appends cards start from 1 less than max index one in lane that is face", () => {
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
    test("non-empty lane appends card 1 less than max index one in lane that is face", () => {
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
    test("reject to append any cards contain back card", () => {
      const laneId = LaneId.of(1);
      const empty = Lane.of(laneId, null);
      const appendings = Cards.of([Card.of(Suit.HEART, Rank.QUEEN, false)]);
      expect(() => empty.append(appendings)).toThrow(
        new Error("back card cannot be appended")
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
describe("removeRear", () => {
  describe("successful call returns removed cards", () => {
    test("remove non zero cards: last is face up", () => {
      const card1 = Card.of(Suit.HEART, Rank.TWO, true);
      const card2 = Card.of(Suit.CLUB, Rank.ACE, true);
      const lane = Lane.of(LaneId.of(1), Cards.of([card1, card2]));

      const actual = lane.removeRear(1);

      expect(actual.cards).toBeInstanceOf(Cards);
      expect(JSON.stringify(actual.cards)).toEqual(
        JSON.stringify(Cards.of([card2]))
      );
      expect(actual.lane).toBeInstanceOf(Lane);
      expect(JSON.stringify(actual.lane)).toEqual(
        JSON.stringify(Lane.of(LaneId.of(1), Cards.of([card1])))
      );
    });
    test("remove non zero cards: then the last is face down", () => {
      const card1 = Card.of(Suit.HEART, Rank.TWO, false);
      const card2 = Card.of(Suit.CLUB, Rank.ACE, true);
      const lane = Lane.of(LaneId.of(1), Cards.of([card1, card2]));

      const actual = lane.removeRear(1);

      expect(actual.cards).toBeInstanceOf(Cards);
      expect(JSON.stringify(actual.cards)).toEqual(
        JSON.stringify(Cards.of([card2]))
      );
      expect(actual.lane).toBeInstanceOf(Lane);
      expect(JSON.stringify(actual.lane)).toEqual(
        JSON.stringify(
          Lane.of(LaneId.of(1), Cards.of([Card.of(Suit.HEART, Rank.TWO, true)]))
        )
      );
    });
  });
  describe("failed call throws error", () => {
    test("no rear", () => {
      const card1 = Card.of(Suit.HEART, Rank.TWO, true);
      const card2 = Card.of(Suit.CLUB, Rank.ACE, true);

      expect(() =>
        Lane.of(LaneId.of(1), Cards.of([card1, card2])).removeRear(99)
      ).toThrow("invalid index was specified");
    });
    test("rear contains face down cards", () => {
      const card1 = Card.of(Suit.HEART, Rank.TWO, false);
      const card2 = Card.of(Suit.CLUB, Rank.ACE, true);

      expect(() =>
        Lane.of(LaneId.of(1), Cards.of([card1, card2])).removeRear(0)
      ).toThrow("face down card(s) cannot be moved");
    });
  });
});
