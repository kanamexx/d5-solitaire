import * as Types from '../types/index'

export default class Suit {
    private readonly _symbol: Types.SuitSymbolType
    private readonly _color: Types.ColorType

    public static readonly SPADE: Suit = new Suit('♠', 'black')
    public static readonly CLUB: Suit = new Suit('♣', 'black')
    public static readonly HEART: Suit = new Suit('♡', 'red')
    public static readonly DIAMOND: Suit = new Suit('♢', 'red')

    private constructor(
        symbol: Types.SuitSymbolType,
        color: Types.ColorType,
    ) {
        this._symbol = symbol
        this._color = color
    }

    public static of(symbol: Types.SuitSymbolType): Suit{
        switch (symbol) {
            case '♠':
                return this.SPADE
            case '♣':
                return this.CLUB
            case '♡':
                return this.HEART
            case '♢':
                return this.DIAMOND
            // TODO: change to appropriate exception 
            default:
                throw Error
        }
    }

    public get color(): Types.ColorType {
        return this._color
    }
    public get symbol(): Types.SuitSymbolType {
        return this._symbol
    }
}