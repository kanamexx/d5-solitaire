import Card from "./card/Card";
import Lane from "./lane/Lane";

export default class PlayField {
  private readonly _set: Card[];
  private readonly _lanes: Lane[];
  private readonly _goals: Card[][];

  public get set(): Card[] {
    return this._set;
  }
  public get lanes(): Lane[] {
    return this._lanes;
  }
  public get goals(): Card[][] {
    return this._goals;
  }

  private constructor(set: Card[], lanes: Lane[], goals: Card[][]) {
    this._set = set;
    this._lanes = lanes;
    this._goals = goals;
  }

  public static of = (
    set: Card[],
    lanes: Lane[],
    goals: Card[][]
  ): PlayField => {
    return new PlayField(set, lanes, goals);
  };
}
