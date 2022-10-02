import { RankType } from "shared/domain/types";

export default class Rank {
  private readonly _value: RankType;
  private readonly _str: string;

  public static readonly ACE: Rank = new Rank(1, "A");
  public static readonly TWO: Rank = new Rank(2, "2");
  public static readonly THREE: Rank = new Rank(3, "3");
  public static readonly FOUR: Rank = new Rank(4, "4");
  public static readonly FIVE: Rank = new Rank(5, "5");
  public static readonly SIX: Rank = new Rank(6, "6");
  public static readonly SEVEN: Rank = new Rank(7, "7");
  public static readonly EIGHT: Rank = new Rank(8, "8");
  public static readonly NINE: Rank = new Rank(9, "9");
  public static readonly TEN: Rank = new Rank(10, "10");
  public static readonly JACK: Rank = new Rank(11, "J");
  public static readonly QUEEN: Rank = new Rank(12, "Q");
  public static readonly KING: Rank = new Rank(13, "K");

  private constructor(value: RankType, str: string) {
    this._value = value;
    this._str = str;
  }

  public static of = (value: RankType): Rank => {
    switch (value) {
      case 1:
        return Rank.ACE;
      case 2:
        return Rank.TWO;
      case 3:
        return Rank.THREE;
      case 4:
        return Rank.FOUR;
      case 5:
        return Rank.FIVE;
      case 6:
        return Rank.SIX;
      case 7:
        return Rank.SEVEN;
      case 8:
        return Rank.EIGHT;
      case 9:
        return Rank.NINE;
      case 10:
        return Rank.TEN;
      case 11:
        return Rank.JACK;
      case 12:
        return Rank.QUEEN;
      case 13:
        return Rank.KING;
      default:
        throw new Error(`invalid Rank: ${value}`);
    }
  };

  public static list = (): Rank[] => {
    return [
      this.ACE,
      this.TWO,
      this.THREE,
      this.FOUR,
      this.FIVE,
      this.SIX,
      this.SEVEN,
      this.EIGHT,
      this.NINE,
      this.TEN,
      this.JACK,
      this.QUEEN,
      this.KING,
    ];
  };

  public get value(): RankType {
    return this._value;
  }

  public isLessThan = (another: Rank): boolean => {
    return this._value < another._value;
  };
  public isGreaterThan = (another: Rank): boolean => {
    return this._value > another._value;
  };

  public toString = (): string => {
    return this._str;
  };
}
