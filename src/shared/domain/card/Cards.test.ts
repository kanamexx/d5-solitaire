import Card from "./Card";
import Cards from "./Cards";
import Rank from "./Rank";
import Suit from "./Suit";

describe("instantiate", () => {
  describe("of", () => {
    describe("successful call returns instance", () => {
      test("successful call by ValueClass returns instance", () => {
        const highRankCard = Card.of(Suit.CLUB, Rank.EIGHT, false);
        const lowRankCard = Card.of(Suit.CLUB, Rank.ACE, false);

        const actual = Cards.of([highRankCard, lowRankCard]);
        expect(actual.values[0]).toEqual(highRankCard);
        expect(actual.values[1]).toEqual(lowRankCard);
      });
    });
  });
  describe("empty", () => {
    test("returns empty array", () => {
      expect(Cards.empty().values).toEqual([]);
    });
  });
  describe("getFaceUps", () => {
    describe("returns empty, if no face up cards", () => {
      test("empty", () => {
        const empty = Cards.empty();
        const actual = empty.getFaceUps();
        expect(actual).toBeInstanceOf(Cards);
        expect(actual.values).toEqual(Cards.empty().values);
      });
      test("only face down", () => {
        const onlyFaceDown = Cards.of([Card.of(Suit.CLUB, Rank.ACE, false)]);
        const actual = onlyFaceDown.getFaceUps();
        expect(actual).toBeInstanceOf(Cards);
        expect(actual.values).toEqual(Cards.empty().values);
      });
    });
    describe("returns only face up cards", () => {
      test("it", () => {
        const cards = Cards.of([
          Card.of(Suit.CLUB, Rank.ACE, true),
          Card.of(Suit.HEART, Rank.TWO, false),
        ]);
        const actual = cards.getFaceUps();
        expect(actual).toBeInstanceOf(Cards);
        expect(JSON.stringify(actual)).toEqual(
          JSON.stringify(Cards.of([Card.of(Suit.CLUB, Rank.ACE, true)]))
        );
      });
    });
  });
  describe("getFaceDowns", () => {
    describe("returns empty, if no face down cards", () => {
      test("empty", () => {
        const empty = Cards.empty();
        const actual = empty.getFaceDowns();
        expect(actual).toBeInstanceOf(Cards);
        expect(actual.values).toEqual(Cards.empty().values);
      });
      test("only face up", () => {
        const onlyFaceUp = Cards.of([Card.of(Suit.CLUB, Rank.ACE, true)]);
        const actual = onlyFaceUp.getFaceDowns();
        expect(actual).toBeInstanceOf(Cards);
        expect(actual.values).toEqual(Cards.empty().values);
      });
    });
    describe("returns only face down cards", () => {
      test("it", () => {
        const cards = Cards.of([
          Card.of(Suit.CLUB, Rank.ACE, true),
          Card.of(Suit.HEART, Rank.TWO, false),
        ]);
        const actual = cards.getFaceDowns();
        expect(actual).toBeInstanceOf(Cards);
        expect(JSON.stringify(actual)).toEqual(
          JSON.stringify(Cards.of([Card.of(Suit.HEART, Rank.TWO, false)]))
        );
      });
    });
  });
  describe("haveFaceUps", () => {
    describe("returns false", () => {
      test("empty", () => {
        const empty = Cards.empty();
        expect(empty.haveFaceUps()).toBeFalsy();
      });
      test("no face up", () => {
        const onlyFaceDown = Cards.of([Card.of(Suit.CLUB, Rank.ACE, false)]);
        expect(onlyFaceDown.haveFaceUps()).toBeFalsy();
      });
    });
    describe("returns true", () => {
      test("it", () => {
        const cards = Cards.of([
          Card.of(Suit.CLUB, Rank.ACE, true),
          Card.of(Suit.HEART, Rank.TWO, false),
        ]);
        expect(cards.haveFaceUps()).toBeTruthy();
      });
    });
  });
  describe("haveFaceDowns", () => {
    describe("returns false", () => {
      test("empty", () => {
        const empty = Cards.empty();
        expect(empty.haveFaceUps()).toBeFalsy();
      });
      test("no face down", () => {
        const onlyFaceUp = Cards.of([Card.of(Suit.CLUB, Rank.ACE, true)]);
        expect(onlyFaceUp.haveFaceDowns()).toBeFalsy();
      });
    });
    describe("returns true", () => {
      test("it", () => {
        const cards = Cards.of([
          Card.of(Suit.CLUB, Rank.ACE, true),
          Card.of(Suit.HEART, Rank.TWO, false),
        ]);
        expect(cards.haveFaceDowns()).toBeTruthy();
      });
    });
  });
  describe("find", () => {
    test("returns the card if exists", () => {
      const card1 = Card.of(Suit.CLUB, Rank.EIGHT, true);
      const card2 = Card.of(Suit.DIAMOND, Rank.SEVEN, true);

      const cards = Cards.of([card1, card2]);
      expect(cards.find(card1)).toEqual(card1);
    });
    test("returns null if not exists", () => {
      const card1 = Card.of(Suit.CLUB, Rank.EIGHT, true);
      const card2 = Card.of(Suit.DIAMOND, Rank.SEVEN, true);

      const cards = Cards.of([card1]);
      expect(cards.find(card2)).toBeNull();
    });
    test("returns null if cards is empty", () => {
      const cards = Cards.empty();
      expect(cards.find(Card.of(Suit.DIAMOND, Rank.SEVEN, true))).toBeNull();
    });
  });
  describe("findFirstFaceUpIndex", () => {
    test("returns first face up index if exist", () => {
      const card1 = Card.of(Suit.CLUB, Rank.EIGHT, true);
      const card2 = Card.of(Suit.DIAMOND, Rank.SEVEN, true);
      const card3 = Card.of(Suit.HEART, Rank.SIX, false);
      const card4 = Card.of(Suit.SPADE, Rank.FIVE, false);
      const card5 = Card.of(Suit.SPADE, Rank.FOUR, true);

      const cards = Cards.of([card1, card2, card3, card4, card5]);
      expect(cards.findFirstFaceUpIndex()).toBe(0);
    });
    test("returns -1 if not exist", () => {
      const card1 = Card.of(Suit.CLUB, Rank.EIGHT, false);
      const card2 = Card.of(Suit.DIAMOND, Rank.SEVEN, false);
      const card3 = Card.of(Suit.HEART, Rank.SIX, false);
      const card4 = Card.of(Suit.SPADE, Rank.FIVE, false);
      const card5 = Card.of(Suit.SPADE, Rank.FOUR, false);

      const cards = Cards.of([card1, card2, card3, card4, card5]);
      expect(cards.findFirstFaceUpIndex()).toBe(-1);
    });
  });
  describe("findLastFaceDownIndex", () => {
    test("returns last face down index if exist", () => {
      const cards = Cards.of([Card.of(Suit.CLUB, Rank.EIGHT, false)]);
      expect(cards.findLastFaceDownIndex()).toBe(0);
    });
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
  describe("findLast", () => {
    it("returns null. if empty", () => {
      expect(Cards.empty().findLast()).toBeNull();
    });
    it("returns last card.", () => {
      const card1 = Card.of(Suit.CLUB, Rank.EIGHT, true);
      const card2 = Card.of(Suit.DIAMOND, Rank.SEVEN, true);
      const cards = Cards.of([card1, card2]);
      expect(cards.findLast()).toEqual(card2);
    });
  });
  describe("isEmpry", () => {
    test("returns true, if empty", () => {
      expect(Cards.empty().isEmpty()).toBeTruthy();
    });
    test("returns false, if not empty", () => {
      expect(
        Cards.of([Card.of(Suit.CLUB, Rank.ACE, true)]).isEmpty()
      ).toBeFalsy();
    });
  });
  describe("append", () => {
    test("returns new cards that contain the card", () => {
      const card1 = Card.of(Suit.CLUB, Rank.ACE, true);
      const actual1 = Cards.empty().append(Cards.of([card1]));
      const expectation1 = Cards.of([card1]);
      expect(actual1).toBeInstanceOf(Cards);
      expect(JSON.stringify(actual1)).toEqual(JSON.stringify(expectation1));

      const card2 = Card.of(Suit.HEART, Rank.TWO, false);
      const card3 = Card.of(Suit.CLUB, Rank.THREE, true);
      const actual2 = Cards.empty().append(Cards.of([card2, card3]));
      const expectation2 = Cards.of([card2, card3]);
      expect(actual2).toBeInstanceOf(Cards);
      expect(JSON.stringify(actual2)).toEqual(JSON.stringify(expectation2));
    });
  });
  describe("getFirst", () => {
    it("returns undefined, if no elments", () => {
      expect(Cards.empty().getFirst()).toBeUndefined();
    });
    describe("returns first element", () => {
      test("the first is face up", () => {
        const first = Card.of(Suit.CLUB, Rank.ACE, true);
        const second = Card.of(Suit.CLUB, Rank.TWO, true);
        expect(Cards.of([first, second]).getFirst()).toEqual(first);
      });
      test("the first is face down", () => {
        const first = Card.of(Suit.CLUB, Rank.ACE, false);
        const second = Card.of(Suit.CLUB, Rank.TWO, false);
        expect(Cards.of([first, second]).getFirst()).toEqual(first);
      });
    });
  });
  describe("isOnlyFaceUp", () => {
    it("returns false, if empty", () => {
      expect(Cards.empty().isOnlyFaceUp()).toBeFalsy();
    });
    it("returns false, some of them is face up ", () => {
      const first = Card.of(Suit.CLUB, Rank.ACE, false);
      const second = Card.of(Suit.CLUB, Rank.TWO, true);
      expect(Cards.of([first, second]).isOnlyFaceUp()).toBeFalsy();
    });
    it("returns true, all is face up ", () => {
      const first = Card.of(Suit.CLUB, Rank.ACE, true);
      const second = Card.of(Suit.CLUB, Rank.TWO, true);
      expect(Cards.of([first, second]).isOnlyFaceUp()).toBeTruthy();
    });
  });
  describe("isOnlyFaceDown", () => {
    it("returns false, if empty", () => {
      expect(Cards.empty().isOnlyFaceDown()).toBeFalsy();
    });
    it("returns false, some of them is face down", () => {
      const first = Card.of(Suit.CLUB, Rank.ACE, false);
      const second = Card.of(Suit.CLUB, Rank.TWO, true);
      expect(Cards.of([first, second]).isOnlyFaceDown()).toBeFalsy();
    });
    it("returns true, all is face up", () => {
      const first = Card.of(Suit.CLUB, Rank.ACE, false);
      const second = Card.of(Suit.CLUB, Rank.TWO, false);
      expect(Cards.of([first, second]).isOnlyFaceDown()).toBeTruthy();
    });
  });
  describe("faceUpIfLastIsFaceDown", () => {
    it("returns empty, if empty", () => {
      const actual = Cards.empty().faceUpIfLastIsFaceDown();
      expect(actual).toBeInstanceOf(Cards);
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(Cards.empty()));
    });
    it("returns the same, if last is face up", () => {
      const first = Card.of(Suit.CLUB, Rank.ACE, true);
      const second = Card.of(Suit.CLUB, Rank.TWO, true);
      const initial = Cards.of([first, second]);

      const actual = initial.faceUpIfLastIsFaceDown();

      expect(actual).toBeInstanceOf(Cards);
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(initial));
    });
    it("returns the same but last one is turn overed, if last is face down", () => {
      const first = Card.of(Suit.CLUB, Rank.ACE, true);
      const second = Card.of(Suit.CLUB, Rank.TWO, false);
      const initial = Cards.of([first, second]);

      const actual = initial.faceUpIfLastIsFaceDown();
      const expectation = Cards.of([first, Card.of(Suit.CLUB, Rank.TWO, true)]);

      expect(actual).toBeInstanceOf(Cards);
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(expectation));
    });
  });
});
