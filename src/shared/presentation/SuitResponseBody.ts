import Suit from "shared/domain/Suit";
import * as Types from "../domain/types/index";

class SuitResponseBody {
  public readonly symbol: Types.SuitSymbolType;
  public readonly color: Types.ColorType;
  public readonly numberSymbol: string;
  public readonly isTail: boolean;

  private constructor(symbol: Types.SuitSymbolType, color: Types.ColorType) {
    this.symbol = symbol;
    this.color = color;
  }

  public static of(entity: Suit): SuitResponseBody {
    return new SuitResponseBody(entity.value, entity.color);
  }
}
export { SuitResponseBody as SuitResponse };
