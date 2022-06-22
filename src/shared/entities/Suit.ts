import * as Types from '../types/index'

export default class Suit {
    private readonly _symbol: Types.SuitSymbolType
    private readonly _color: Types.ColorType

    public static readonly SPADE: Suit = new Suit('♠')
    public static readonly CLUB: Suit = new Suit('♣')
    public static readonly HEART: Suit = new Suit('♡')
    public static readonly DIAMOND: Suit = new Suit('♢')

    private constructor(
        symbol: Types.SuitSymbolType,
    ) {
        this._symbol = symbol
        this._color = (symbol === '♠' || symbol === '♣') ? 'black' : 'red'
    }

    public static of(symbol: Types.SuitSymbolType): Suit{
        console.log(symbol)
        switch (symbol) {
            case '♠': return this.SPADE
            case '♣': return this.CLUB
            case '♡': return this.HEART
            case '♢': return this.DIAMOND
            default: throw new Error(`invalid Suit: ${symbol}`)
        }
    }

    public static all(): Suit[] {return [this.SPADE, this.CLUB, this.HEART, this.DIAMOND]}

    public get color(): Types.ColorType {
        return this._color
    }
    public get symbol(): Types.SuitSymbolType {
        return this._symbol
    }
}