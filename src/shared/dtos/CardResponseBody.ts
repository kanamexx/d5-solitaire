import Card from "shared/entities/Card";
import RankResponseBody from "./RankResponseBody";
import { SuitResponse } from "./SuitResponseBody";

class CardResponseBody{
    public readonly suit: SuitResponse
    public readonly rank: RankResponseBody
    public readonly isTail: boolean

    private constructor(card: Card){
        this.suit = SuitResponse.of(card.suit)
        this.rank = RankResponseBody.of(card.rank)
        this.isTail = card.isTail
    }

    public static of(entity: Card): CardResponseBody{
        return new CardResponseBody(entity)
    }
}
export { CardResponseBody as CardResponse };
