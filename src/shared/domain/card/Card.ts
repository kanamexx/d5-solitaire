import { RankSymbolType, RankType, SuitSymbolType } from "shared/domain/types";
import Rank from "./Rank";
import Suit from "./Suit";

class Card {
  private readonly _suit: Suit;
  private readonly _rank: Rank;
  private readonly _isFace: boolean;

  public get suit() {
    return this._suit;
  }
  public get rank() {
    return this._rank;
  }
  public get isFace() {
    return this._isFace;
  }

  private constructor(
    suit: Suit | SuitSymbolType,
    rank: Rank | RankType,
    isFace: boolean
  ) {
    if (!suit || !rank) {
      throw new Error(
        `invalid args: {suit: ${suit}, rank: ${rank}, isFace: ${isFace}`
      );
    }

    this._suit = suit instanceof Suit ? suit : Suit.of(suit);
    this._rank = rank instanceof Rank ? rank : Rank.of(rank);
    this._isFace = isFace;
  }

  public static of = (
    suit: Suit | SuitSymbolType,
    rank: Rank | RankType,
    isFace: boolean
  ): Card => {
    return new Card(suit, rank, isFace);
  };

  public getSuitString(): SuitSymbolType {
    return this._suit.value;
  }
  public getRankString(): RankSymbolType {
    return this._rank.toString();
  }

  public turnOver = (): Card => {
    return this.isFace ? this.faceUp() : this.faceDown();
  };
  public faceUp = (): Card => {
    return new Card(this._suit, this._rank, false);
  };
  public faceDown = (): Card => {
    return new Card(this._suit, this._rank, true);
  };
}

export default Card;
