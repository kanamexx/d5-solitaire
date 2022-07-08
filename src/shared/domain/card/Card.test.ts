import Card from "./Card";
import Rank from "./Rank";
import Suit from "./Suit";

describe("instantiate", () => {
  test("successful call by ValueClass returns instance", () => {
    testSuccessfulInstantiation(
      { suit: Suit.CLUB, rank: Rank.EIGHT, isTail: false },
      { suit: Suit.CLUB, rank: Rank.EIGHT, isTail: false }
    );
    testSuccessfulInstantiation(
      { suit: Suit.CLUB.value, rank: Rank.EIGHT.value, isTail: false },
      { suit: Suit.CLUB, rank: Rank.EIGHT, isTail: false }
    );
  });
  test("successful call by value returns instance", () => {
    Suit.list().map((suit) =>
      Rank.list().map((rank) =>
        testSuccessfulInstantiation(
          { suit: suit.value, rank: rank.value, isTail: false },
          { suit: suit, rank: rank, isTail: false }
        )
      )
    );
  });
  test("failed call throws error", () => {
    testFailedInstantiation(null, Rank.EIGHT, false);
    testFailedInstantiation(Suit.CLUB, null, false);
  });
});

describe("turnOver", () => {
  test("head card turn to be tail", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, false);
    const tailCard = card.turnOver();
    expect(tailCard.isHead).toBeTruthy();
  });
  test("tail card turn to be head", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, true);
    const tailCard = card.turnOver();
    expect(tailCard.isHead).toBeFalsy();
  });
});
describe("toHead", () => {
  test("successful call returns tail card", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, false);
    const tailCard = card.toHead();
    expect(tailCard.isHead).toBeFalsy();
  });
});
describe("toTail", () => {
  test("successful call returns tail card", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, false);
    const tailCard = card.toTail();
    expect(tailCard.isHead).toBeTruthy();
  });
});

const testSuccessfulInstantiation = (
  value: any,
  expectation: { suit: Suit; rank: Rank; isTail: boolean }
) => {
  const entity = Card.of(value.suit, value.rank, value.isTail);
  expect(entity.suit).toEqual(expectation.suit);
  expect(entity.rank).toEqual(expectation.rank);
  expect(entity.getSuitString()).toEqual(expectation.suit.value);
  expect(entity.getRankString()).toEqual(expectation.rank.toString());
  expect(entity.isHead).toBeFalsy();
};
const testFailedInstantiation = (suit: any, rank: any, isHead: boolean) => {
  expect(() => Card.of(suit, rank, isHead)).toThrow(
    new Error(`invalid args: {suit: ${suit}, rank: ${rank}, isHead: ${isHead}`)
  );
};
