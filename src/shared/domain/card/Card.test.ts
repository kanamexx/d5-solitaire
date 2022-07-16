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

describe("turnOver", () => {
  test("face card turn to be back", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, false);
    const backCard = card.turnOver();
    expect(backCard.isFace).toBeTruthy();
  });
  test("back card turn to be face", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, true);
    const backCard = card.turnOver();
    expect(backCard.isFace).toBeFalsy();
  });
});
describe("toFace", () => {
  test("successful call returns back card", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, false);
    const backCard = card.faceUp();
    expect(backCard.isFace).toBeFalsy();
  });
});
describe("toBack", () => {
  test("successful call returns back card", () => {
    const card = Card.of(Suit.CLUB, Rank.EIGHT, false);
    const backCard = card.faceDown();
    expect(backCard.isFace).toBeTruthy();
  });
});

const testSuccessfulInstantiation = (
  value: any,
  expectation: { suit: Suit; rank: Rank; isBack: boolean }
) => {
  const entity = Card.of(value.suit, value.rank, value.isBack);
  expect(entity.suit).toEqual(expectation.suit);
  expect(entity.rank).toEqual(expectation.rank);
  expect(entity.getSuitString()).toEqual(expectation.suit.value);
  expect(entity.getRankString()).toEqual(expectation.rank.toString());
  expect(entity.isFace).toBeFalsy();
};
const testFailedInstantiation = (suit: any, rank: any, isFace: boolean) => {
  expect(() => Card.of(suit, rank, isFace)).toThrow(
    new Error(`invalid args: {suit: ${suit}, rank: ${rank}, isFace: ${isFace}`)
  );
};
