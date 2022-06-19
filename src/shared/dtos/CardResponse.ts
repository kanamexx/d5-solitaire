import Card from "shared/entities/Card";
import Suit from "shared/entities/Suit";

class CardResponse{
    public readonly suit: Suit
    public readonly number: number
    public readonly numberSymbol: string
    public readonly isTail: boolean

    private constructor(suit: Suit, number: number, numberSymbol: string, isTail: boolean){
        this.suit = suit
        this.number = number
        this.numberSymbol = numberSymbol
        this.isTail = isTail
    }

    public static fromEntity(entity: Card): CardResponse{
        return new CardResponse(
            entity.suit,
            entity.number,
            entity.numberSymbol,
            entity.isTail
        )
    }
}
export { CardResponse };
