import Suit from 'shared/entities/Suit';
import * as Types from '../types/index';

class SuitResponseBody{
    public readonly symbol: Types.SuitSymbolType
    public readonly color: Types.ColorType
    public readonly numberSymbol: string
    public readonly isTail: boolean

    private constructor(
        symbol: Types.SuitSymbolType,
        color: Types.ColorType,
    ){
        this.symbol = symbol
        this.color = color
    }

    public static of(entity: Suit): SuitResponseBody{
        return new SuitResponseBody(
            entity.symbol,
            entity.color,
        )
    }
}
export { SuitResponseBody as SuitResponse };
