import Card from "../card/Card";
import Cards from "../card/Cards";
import Rank from "../card/Rank";
import Suit from "../card/Suit";
export default class Goal {
  private readonly _suit: Suit;
  private readonly _cards: Cards;

  public get suit(): Suit {
    return this._suit;
  }
  public get cards(): Cards {
    return this._cards;
  }

  private constructor(suit: Suit, cards: Cards) {
    this.validate(suit, cards);
    this._suit = suit;
    this._cards = cards;
  }

  private validate = (suit: Suit, cards: Cards) => {
    if (cards.haveFaceDowns()) {
      throw new Error(`cards must have only faceups. cards: ${cards}`);
    }
    if (!this.isAllTheSameSuit(suit, cards)) {
      throw new Error(
        `cards contain invalid suit. lane suit: ${suit}, cards: ${cards}`
      );
    }
    if (!this.isAscendingByOne(cards)) {
      throw new Error(`cards contain invalid rank. cards: ${cards}`);
    }
  };

  private isAllTheSameSuit = (suit: Suit, cards: Cards): boolean => {
    return cards.values.every((c) => c.suit === suit);
  };

  private isAscendingByOne = (cards: Cards): boolean => {
    if (cards.isEmpty()) {
      return true;
    }
    return cards.values
      .map((c, i) => [c, cards.values[i + 1]])
      .filter((c) => c[0] && c[1])
      .every((c) => {
        const mustBeLow = c[0];
        const mustBeHigh = c[1];
        return mustBeLow.isLessByOne(mustBeHigh);
      });
  };

  public static of = (suit: Suit, cards: Cards): Goal => {
    return new Goal(suit, cards);
  };

  public static empty = (suit: Suit): Goal => {
    return this.of(suit, Cards.empty());
  };

  public canAppend = (card: Card): boolean => {
    if (!card.isFaceUp) {
      console.log("card must be face up");
      return false;
    }
    if (this._suit !== card.suit) {
      console.log("suit does not match");
      return false;
    }
    if (this._cards.isEmpty()) {
      if (card.rank !== Rank.ACE) {
        console.log("empty goal can append only just ace");
        return false;
      }
      return true;
    }
    if (!this._cards.findLast().isLessByOne(card)) {
      console.log("invalid rank");
      return false;
    }

    return true;
  };

  public append = (card: Card): Goal => {
    if (!this.canAppend(card)) {
      throw new Error("card cannot be apended");
    }
    return Goal.of(this._suit, this._cards.append(Cards.of([card])));
  };
}
