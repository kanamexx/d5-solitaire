import { RankType, SuitSymbolType } from "shared/domain/types";
import Rank from "./Rank";
import Suit from "./Suit";

export default class Card {
  private readonly _suit: Suit;
  private readonly _rank: Rank;
  private readonly _isFaceUp: boolean;

  public get suit() {
    return this._suit;
  }
  public get rank() {
    return this._rank;
  }
  public get isFaceUp() {
    return this._isFaceUp;
  }

  private constructor(
    suit: Suit | SuitSymbolType,
    rank: Rank | RankType,
    isFaceUp: boolean
  ) {
    if (!suit || !rank) {
      throw new Error(
        `invalid args: {suit: ${suit}, rank: ${rank}, isFace: ${isFaceUp}`
      );
    }

    this._suit = suit instanceof Suit ? suit : Suit.of(suit);
    this._rank = rank instanceof Rank ? rank : Rank.of(rank);
    this._isFaceUp = isFaceUp;
  }

  public static of = (
    suit: Suit | SuitSymbolType,
    rank: Rank | RankType,
    isFace: boolean
  ): Card => {
    return new Card(suit, rank, isFace);
  };

  public turnOver = (): Card => {
    return this.isFaceUp ? this.faceDown() : this.faceUp();
  };
  public faceUp = (): Card => {
    return new Card(this._suit, this._rank, true);
  };
  public faceDown = (): Card => {
    return new Card(this._suit, this._rank, false);
  };

  public equals = (another: Card): boolean => {
    if (!another) {
      return false;
    }
    return this._suit === another._suit && this._rank === another._rank;
  };

  public isLessByOne = (another: Card): boolean => {
    if (!another) {
      return false;
    }
    return this._rank.isLessByOne(another.rank);
  };

  public id = (): string => {
    return this.suit.toString() + this.rank.toString();
  };

  public top = (): string => {
    return this.suit.toString() + this.rank.toString();
  };

  public bottom = (): string => {
    return this.rank === Rank.TEN
      ? "01" + this.suit.toString()
      : this.rank.toString() + this.suit.toString();
  };
}
