import Card from "./card/Card";
import Goal from "./goal/Goal";
import Lane from "./lane/Lane";

export default class PlayField {
  private readonly _set: Card[];
  private readonly _lanes: Lane[];
  private readonly _goals: Goal[];

  public get set(): Card[] {
    return this._set;
  }
  public get lanes(): Lane[] {
    return this._lanes;
  }
  public get goals(): Goal[] {
    return this._goals;
  }

  private constructor(set: Card[], lanes: Lane[], goals: Goal[]) {
    this._set = set;
    this._lanes = lanes;
    this._goals = goals;
  }

  public static of = (set: Card[], lanes: Lane[], goals: Goal[]): PlayField => {
    return new PlayField(set, lanes, goals);
  };
}
