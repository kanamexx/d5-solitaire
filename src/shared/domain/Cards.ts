import Card from "./card/Card";

export default class Cards {
  private readonly _values: Card[];

  private constructor(values: Card[]) {
    this._values = values;
  }

  public get values(): Card[] {
    return this._values;
  }

  public static of = (values: Card[]): Cards => {
    return new Cards(values);
  };

  public getFaces = (): Card[] => {
    return this._values.filter((c) => c.isFace);
  };
  public getBacks = (): Card[] => {
    return this._values.filter((c) => !c.isFace);
  };
  public haveFaces = (): boolean => {
    return this.getFaces().length !== 0;
  };
  public haveBacks = (): boolean => {
    return this.getBacks().length !== 0;
  };
  public findFirstFaceIndex = (): number => {
    return this._values.findIndex((c) => c.isFace);
  };
  public findLastBackIndex = (): number => {
    for (let i = this._values.length - 1; i > 0; i--) {
      if (!this._values[i].isFace) {
        return i;
      }
    }
    return -1;
  };

  public static empty = (): Cards => {
    return new Cards([]);
  };

  public isEmpty = (): boolean => {
    return this._values.length === 0;
  };

  public append = (cards: Cards): Cards => {
    return new Cards(this._values.concat(cards.values));
  };

  public getFirst = (): Card => {
    return this._values.find((_) => true);
  };
}
