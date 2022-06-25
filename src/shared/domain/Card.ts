import { RankType, SuitSymbolType } from "shared/domain/types";
import Rank from "./Rank";
import Suit from "./Suit";

class Card {
  private readonly _suit: Suit;
  private readonly _rank: Rank;
  private readonly _isTail: boolean;

  public get suit() {
    return this._suit;
  }
  public get rank() {
    return this._rank;
  }
  public get isTail() {
    return this._isTail;
  }

  private constructor(
    suit: Suit | SuitSymbolType,
    rank: Rank | RankType,
    isTail: boolean
  ) {
    if (!suit || !rank) {
      throw new Error(
        `invalid args: {suit: ${suit}, rank: ${rank}, isTail: ${isTail}`
      );
    }

    this._suit = suit instanceof Suit ? suit : Suit.of(suit);
    this._rank = rank instanceof Rank ? rank : Rank.of(rank);
    this._isTail = isTail;
  }

  public static of = (
    suit: Suit | SuitSymbolType,
    rank: Rank | RankType,
    isTail: boolean
  ): Card => {
    return new Card(suit, rank, isTail);
  };

  public getSuitString(): SuitSymbolType {
    return this._suit.value;
  }
  public getRankString(): RankType {
    return this._rank.value;
  }
}

export default Card;
