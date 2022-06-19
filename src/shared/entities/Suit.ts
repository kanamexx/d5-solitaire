import * as Types from '../types/index'

export default class Suit {
    public readonly suit: Types.SuitSymbolType
    public readonly color: Types.ColorType

    public static readonly spade: Suit = Suit.of('♠')
    public static readonly club: Suit = Suit.of('♣')
    public static readonly heart: Suit = Suit.of('♡')
    public static readonly diamond: Suit = Suit.of('♢')

    private constructor(suit: Types.SuitSymbolType, color: Types.ColorType) {
        this.suit = suit
        this.color = color
    }

    static of(suit: Types.SuitSymbolType){
        return new Suit(suit, (suit === '♠' || suit === '♣') ? 'black' : 'red')
    }
}