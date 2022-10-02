import Card from "../card/Card";
import Cards from "../card/Cards";
import Rank from "../card/Rank";
import Suit from "../card/Suit";
import Goal from "./Goal";

describe("instantiation", () => {
  describe("of", () => {
    it("returns goal with args id and cards", () => {
      const expectations = Cards.of([
        Card.of(Suit.CLUB, Rank.ACE, true),
        Card.of(Suit.CLUB, Rank.TWO, true),
      ]);
      const goal = Goal.of(Suit.CLUB, expectations);
      expect(goal.suit).toEqual(Suit.CLUB);
      expect(goal.cards).toEqual(expectations);
    });
    it("throws error, if face down card is contained", () => {
      const cards = Cards.of([
        Card.of(Suit.CLUB, Rank.ACE, false),
        Card.of(Suit.CLUB, Rank.TWO, true),
      ]);
      expect(() => Goal.of(Suit.CLUB, cards)).toThrow(
        /cards must have only faceups. cards: .+/i
      );
    });
    it("throws error, if invalid suit", () => {
      const cards = Cards.of([
        Card.of(Suit.CLUB, Rank.ACE, true),
        Card.of(Suit.CLUB, Rank.TWO, true),
      ]);
      expect(() => Goal.of(Suit.DIAMOND, cards)).toThrow(
        /cards contain invalid suit. lane suit: .+/i
      );
    });
    it("throws error, if invalid rank", () => {
      const cards = Cards.of([
        Card.of(Suit.CLUB, Rank.ACE, true),
        Card.of(Suit.CLUB, Rank.THREE, true),
      ]);
      expect(() => Goal.of(Suit.CLUB, cards)).toThrow(
        /cards contain invalid rank. cards: .+/i
      );
    });
  });
  describe("empty", () => {
    it("returns emtpy object", () => {
      expect(Goal.empty(Suit.CLUB).cards.isEmpty()).toBeTruthy();
    });
  });
});

describe("canAppend", () => {
  it("returns true, if goal is empty and card is ace", () => {
    expect(
      Goal.empty(Suit.CLUB).canAppend(Card.of(Suit.CLUB, Rank.ACE, true))
    ).toBeTruthy();
  });
  it("returns true, if card have last + 1 rank", () => {
    const cards = Cards.of([
      Card.of(Suit.CLUB, Rank.ACE, true),
      Card.of(Suit.CLUB, Rank.TWO, true),
    ]);
    expect(
      Goal.of(Suit.CLUB, cards).canAppend(Card.of(Suit.CLUB, Rank.THREE, true))
    ).toBeTruthy();
  });
  it("returns false, if card is facedown", () => {
    expect(
      Goal.empty(Suit.CLUB).canAppend(Card.of(Suit.CLUB, Rank.ACE, false))
    ).toBeFalsy();
  });
  it("returns false, if card have not the same suit", () => {
    expect(
      Goal.empty(Suit.CLUB).canAppend(Card.of(Suit.DIAMOND, Rank.ACE, true))
    ).toBeFalsy();
  });
  it("returns false, if card rank is not ace and goal is empty", () => {
    expect(
      Goal.empty(Suit.CLUB).canAppend(Card.of(Suit.CLUB, Rank.KING, true))
    ).toBeFalsy();
  });
  it("returns false, if card dont have last + 1 rank", () => {
    const cards = Cards.of([
      Card.of(Suit.CLUB, Rank.ACE, true),
      Card.of(Suit.CLUB, Rank.TWO, true),
    ]);
    expect(
      Goal.of(Suit.CLUB, cards).canAppend(Card.of(Suit.CLUB, Rank.FOUR, true))
    ).toBeFalsy();
  });
});
