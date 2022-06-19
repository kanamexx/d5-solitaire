import Card from "shared/entities/Card";
import { SuitResponse } from "./SuitResponse";

class CardResponse{
    public readonly suit: SuitResponse
    public readonly number: number
    public readonly numberSymbol: string
    public readonly isTail: boolean

    private constructor(suit: SuitResponse, number: number, numberSymbol: string, isTail: boolean){
        this.suit = suit
        this.number = number
        this.numberSymbol = numberSymbol
        this.isTail = isTail
    }

    public static fromEntity(entity: Card): CardResponse{
        return new CardResponse(
            SuitResponse.fromEntity(entity.suit),
            entity.number,
            entity.numberSymbol,
            entity.isTail
        )
    }
}
export { CardResponse };
