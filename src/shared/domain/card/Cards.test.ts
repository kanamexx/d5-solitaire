import Card from "./Card";
import Cards from "./Cards";
import Rank from "./Rank";
import Suit from "./Suit";

describe("instantiate", () => {
  describe("of", () => {
    test("successful call by ValueClass returns instance", () => {
      const highRankCard = Card.of(Suit.CLUB, Rank.EIGHT, false);
      const lowRankCard = Card.of(Suit.CLUB, Rank.ACE, false);

      const cards = Cards.of([highRankCard, lowRankCard]);
    });
  });
  describe("empty", () => {
    test("returns empty array", () => {
      expect(Cards.empty().values).toEqual([]);
    });
  });
  describe("findLastFaceDownIndex", () => {
    test("returns last face down index if exist", () => {
      const card1 = Card.of(Suit.CLUB, Rank.EIGHT, true);
      const card2 = Card.of(Suit.DIAMOND, Rank.SEVEN, true);
      const card3 = Card.of(Suit.HEART, Rank.SIX, false);
      const card4 = Card.of(Suit.SPADE, Rank.FIVE, false);
      const card5 = Card.of(Suit.SPADE, Rank.FOUR, true);

      const cards = Cards.of([card1, card2, card3, card4, card5]);
      expect(cards.findLastFaceDownIndex()).toBe(3);
    });
    test("returns -1 if not exist", () => {
      const card1 = Card.of(Suit.CLUB, Rank.EIGHT, true);
      const card2 = Card.of(Suit.DIAMOND, Rank.SEVEN, true);
      const card3 = Card.of(Suit.HEART, Rank.SIX, true);
      const card4 = Card.of(Suit.SPADE, Rank.FIVE, true);
      const card5 = Card.of(Suit.SPADE, Rank.FOUR, true);

      const cards = Cards.of([card1, card2, card3, card4, card5]);
      expect(cards.findLastFaceDownIndex()).toBe(-1);
    });
  });
});
