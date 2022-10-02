import Card from "./Card";
import Rank from "./Rank";
import Suit from "./Suit";

describe("instantiate", () => {
  test("successful call by ValueClass returns instance", () => {
    testSuccessfulInstantiation(
      { suit: Suit.CLUB, rank: Rank.EIGHT, isBack: false },
      { suit: Suit.CLUB, rank: Rank.EIGHT, isBack: false }
    );
    testSuccessfulInstantiation(
      { suit: Suit.CLUB.value, rank: Rank.EIGHT.value, isBack: false },
      { suit: Suit.CLUB, rank: Rank.EIGHT, isBack: false }
    );
  });
  test("successful call by value returns instance", () => {
    Suit.list().map((suit) =>
      Rank.list().map((rank) =>
        testSuccessfulInstantiation(
          { suit: suit.value, rank: rank.value, isBack: false },
          { suit: suit, rank: rank, isBack: false }
        )
      )
    );
  });
  test("failed call throws error", () => {
    testFailedInstantiation(null, Rank.EIGHT, false);
    testFailedInstantiation(Suit.CLUB, null, false);
  });
});
const testSuccessfulInstantiation = (
  value: any,
  expectation: { suit: Suit; rank: Rank; isBack: boolean }
) => {
  const entity = Card.of(value.suit, value.rank, value.isBack);
  expect(entity.suit).toEqual(expectation.suit);
  expect(entity.rank).toEqual(expectation.rank);
  expect(entity.suit).toEqual(expectation.suit);
  expect(entity.rank).toEqual(expectation.rank);
  expect(entity.isFaceUp).toBeFalsy();
};
const testFailedInstantiation = (suit: any, rank: any, isFace: boolean) => {
  expect(() => Card.of(suit, rank, isFace)).toThrow(
    new Error(`invalid args: {suit: ${suit}, rank: ${rank}, isFace: ${isFace}`)
  );
};

describe("turnOver", () => {
  test("face up card turn to be face down", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, true);
    const faceDownCard = card.turnOver();
    expect(faceDownCard.isFaceUp).toBeFalsy();
  });
  test("face down card turn to be face up", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, false);
    const faceUpCard = card.turnOver();
    expect(faceUpCard.isFaceUp).toBeTruthy();
  });
});
describe("faceUp", () => {
  test("successful call returns face up card", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, false);
    const faceUpCard = card.faceUp();
    expect(faceUpCard.isFaceUp).toBeTruthy();
  });
});
describe("faceDown", () => {
  test("successful call returns face down card", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, true);
    const faceDownCard = card.faceDown();
    expect(faceDownCard.isFaceUp).toBeFalsy();
  });
});

describe("equals", () => {
  it("returns true, if suit and rank is the same each", () => {
    const faceup = Card.of(Suit.CLUB, Rank.EIGHT, true);
    const facedown = Card.of(Suit.CLUB, Rank.EIGHT, false);
    expect(faceup.equals(facedown)).toBeTruthy();
  });
  it("returns false, if another is none", () => {
    const faceup = Card.of(Suit.CLUB, Rank.SEVEN, true);
    expect(faceup.equals(null)).toBeFalsy();
  });
  it("returns false, if some of suit and rank is not the same", () => {
    const faceup = Card.of(Suit.CLUB, Rank.SEVEN, true);
    const facedown = Card.of(Suit.CLUB, Rank.EIGHT, false);
    expect(faceup.equals(facedown)).toBeFalsy();
  });
});
describe("isLessByOne", () => {
  it("returns true, if me is less than another by one", () => {
    const ace = Card.of(Suit.CLUB, Rank.ACE, true);
    const two = Card.of(Suit.CLUB, Rank.TWO, true);
    expect(ace.isLessByOne(two)).toBeTruthy();
  });
  it("returns false, if me is greater than another", () => {
    const ace = Card.of(Suit.CLUB, Rank.ACE, true);
    const two = Card.of(Suit.CLUB, Rank.TWO, true);
    expect(two.isLessByOne(ace)).toBeFalsy();
  });
  it("returns false, if the same rank", () => {
    const ace = Card.of(Suit.CLUB, Rank.ACE, true);
    expect(ace.isLessByOne(ace)).toBeFalsy();
  });
  it("returns false, if the another is null", () => {
    const ace = Card.of(Suit.CLUB, Rank.ACE, true);
    expect(ace.isLessByOne(null)).toBeFalsy();
  });
});
describe("id", () => {
  it("returns id", () => {
    expect(Card.of(Suit.CLUB, Rank.EIGHT, true).id()).toBe("♣8");
  });
});
describe("top", () => {
  it("returns top", () => {
    expect(Card.of(Suit.CLUB, Rank.EIGHT, true).top()).toBe("♣8");
  });
});
describe("bottom", () => {
  it("returns bottom", () => {
    expect(Card.of(Suit.CLUB, Rank.EIGHT, true).bottom()).toBe("8♣");
  });
  it("returns exchanged rank character if 2 digits", () => {
    expect(Card.of(Suit.CLUB, Rank.TEN, true).bottom()).toBe("01♣");
  });
});
