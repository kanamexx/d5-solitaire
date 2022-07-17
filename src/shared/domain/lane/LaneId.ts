export default class LaneId {
  private readonly _value: LaneIdType;

  private constructor(value: LaneIdType) {
    this._value = value;
  }

  public static of = (value: LaneIdType) => {
    return new LaneId(value);
  };

  public get value(): LaneIdType {
    return this._value;
  }
}

export type LaneIdType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
