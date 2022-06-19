import Suit from 'shared/entities/Suit';
import * as Types from '../types/index';

class SuitResponse{
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

    public static fromEntity(entity: Suit): SuitResponse{
        return new SuitResponse(
            entity.symbol,
            entity.color,
        )
    }
}
export { SuitResponse };
