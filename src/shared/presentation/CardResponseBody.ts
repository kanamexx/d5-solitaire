import Card from "shared/domain/Card";
import RankResponseBody from "./RankResponseBody";
import { SuitResponse } from "./SuitResponseBody";

class CardResponseBody {
  public readonly suit: SuitResponse;
  public readonly rank: RankResponseBody;
  public readonly isHead: boolean;

  private constructor(card: Card) {
    this.suit = SuitResponse.of(card.suit);
    this.rank = RankResponseBody.of(card.rank);
    this.isHead = card.isHead;
  }

  public static of(entity: Card): CardResponseBody {
    // TODO: ここなおす
    if (!entity) {
      throw new Error("entity must not be null");
    }

    return new CardResponseBody(entity);
  }
}
export { CardResponseBody as CardResponse };
