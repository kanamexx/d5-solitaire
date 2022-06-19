import Suit from './Suit'

class Card {
    public readonly suit: Suit
    private readonly _number: number
    public readonly numberSymbol: string
    public readonly isTail: boolean

    public get number() {
        return this._number
    }

    private constructor(suit: Suit, number: number, numberSymbol: string, isTail: boolean){
        this.suit = suit
        this._number = number
        this.numberSymbol = numberSymbol
        this.isTail = isTail
    }

    public static of(suit: Suit, number: number, isTail: boolean = false): Card{
        return new Card(suit, number, this.numberToSymbol(number), isTail)
    }

    public static fromNumber(number: number){
        return this.of(this.numberToSuit(number), number)
    }

    static numberToSuit(i :number): Suit {
        if (i < 13) return Suit.of('♠')
        if (i < 13 * 2) return Suit.of('♣')
        if (i < 13 * 3) return Suit.of('♡')
        return Suit.of('♢')
    }

    static numberToSuit2(i: number): Suit {
        if (i === 0) return Suit.of('♠')
        if (i === 1) return Suit.of('♣')
        if (i === 2) return Suit.of('♡')
        return Suit.of('♢')
    
    }

    static numberToSymbol(i: number): string {
        const ret = (i % 13) + 1
        if (ret === 11) return "J"
        if (ret === 12) return "Q"
        if (ret === 13) return "K"
        if (ret === 1) return "A"
        return ret.toString()
    }
}

export default Card