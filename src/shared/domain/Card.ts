import { RankSymbolType, RankType, SuitSymbolType } from "shared/domain/types";
import Rank from "./Rank";
import Suit from "./Suit";

class Card {
  private readonly _suit: Suit;
  private readonly _rank: Rank;
  private readonly _isHead: boolean;

  public get suit() {
    return this._suit;
  }
  public get rank() {
    return this._rank;
  }
  public get isHead() {
    return this._isHead;
  }

  private constructor(
    suit: Suit | SuitSymbolType,
    rank: Rank | RankType,
    isHead: boolean
  ) {
    if (!suit || !rank) {
      throw new Error(
        `invalid args: {suit: ${suit}, rank: ${rank}, isHead: ${isHead}`
      );
    }

    this._suit = suit instanceof Suit ? suit : Suit.of(suit);
    this._rank = rank instanceof Rank ? rank : Rank.of(rank);
    this._isHead = isHead;
  }

  public static of = (
    suit: Suit | SuitSymbolType,
    rank: Rank | RankType,
    isHead: boolean
  ): Card => {
    return new Card(suit, rank, isHead);
  };

  public getSuitString(): SuitSymbolType {
    return this._suit.value;
  }
  public getRankString(): RankSymbolType {
    return this._rank.toString();
  }

  public turnOver = (): Card => {
    return this.isHead ? this.toHead() : this.toTail();
  };
  public toHead = (): Card => {
    return new Card(this._suit, this._rank, false);
  };
  public toTail = (): Card => {
    return new Card(this._suit, this._rank, true);
  };
}

export default Card;
