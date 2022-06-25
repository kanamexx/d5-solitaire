import * as Types from "./types/index";

export default class Suit {
  private readonly _value: Types.SuitSymbolType;
  private readonly _color: Types.ColorType;

  public static readonly SPADE: Suit = new Suit("♠");
  public static readonly CLUB: Suit = new Suit("♣");
  public static readonly HEART: Suit = new Suit("♡");
  public static readonly DIAMOND: Suit = new Suit("♢");

  private constructor(value: Types.SuitSymbolType) {
    this._value = value;
    this._color = value === "♠" || value === "♣" ? "black" : "red";
  }

  public static of(symbol: Types.SuitSymbolType): Suit {
    switch (symbol) {
      case "♠":
        return this.SPADE;
      case "♣":
        return this.CLUB;
      case "♡":
        return this.HEART;
      case "♢":
        return this.DIAMOND;
      default:
        throw new Error(`invalid Suit: ${symbol}`);
    }
  }

  public static list(): Suit[] {
    return [this.SPADE, this.CLUB, this.HEART, this.DIAMOND];
  }

  public get color(): Types.ColorType {
    return this._color;
  }
  public get value(): Types.SuitSymbolType {
    return this._value;
  }
}
