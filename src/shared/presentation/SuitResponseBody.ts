import Suit, { ColorType } from "shared/domain/card/Suit";
import * as Types from "../domain/types/index";

export default class SuitResponseBody {
  public readonly value: Types.SuitSymbolType;
  public readonly color: ColorType;
  public readonly numberSymbol: string;
  public readonly isBack: boolean;

  private constructor(value: Types.SuitSymbolType, color: ColorType) {
    this.value = value;
    this.color = color;
  }

  public static of(entity: Suit): SuitResponseBody {
    return new SuitResponseBody(entity.value, entity.color);
  }
}
