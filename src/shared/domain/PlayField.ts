import Card from "./Card";

export default class PlayField {
  private readonly _set: Card[];
  private readonly _lines: Card[][];
  private readonly _goals: Card[][];

  public get set(): Card[] {
    return this._set;
  }
  public get lines(): Card[][] {
    return this._lines;
  }
  public get goals(): Card[][] {
    return this._goals;
  }

  private constructor(set: Card[], lines: Card[][], goals: Card[][]) {
    this._set = set;
    this._lines = lines;
    this._goals = goals;
  }

  public static of = (
    set: Card[],
    lines: Card[][],
    goals: Card[][]
  ): PlayField => {
    return new PlayField(set, lines, goals);
  };
}
