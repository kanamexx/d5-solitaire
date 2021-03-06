import Card from "shared/domain/card/Card";
import RankResponseBody from "./RankResponseBody";
import { SuitResponse } from "./SuitResponseBody";

export default class CardResponseBody {
  public readonly suit: SuitResponse;
  public readonly rank: RankResponseBody;
  public readonly isFaceUp: boolean;

  private constructor(card: Card) {
    this.suit = SuitResponse.of(card.suit);
    this.rank = RankResponseBody.of(card.rank);
    this.isFaceUp = card.isFaceUp;
  }

  public static of(entity: Card): CardResponseBody {
    // TODO: ここなおす
    if (!entity) {
      throw new Error("entity must not be null");
    }

    return new CardResponseBody(entity);
  }
}
