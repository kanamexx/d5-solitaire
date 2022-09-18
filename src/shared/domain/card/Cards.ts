import Card from "./Card";

export default class Cards {
  private readonly _values: Card[];

  private constructor(values: Card[]) {
    this._values = values;
  }

  public get values(): Card[] {
    return this._values;
  }

  public get length(): number {
    return this._values.length;
  }

  public static of = (values: Card[]): Cards => {
    return new Cards(values);
  };
  public static empty = (): Cards => {
    return new Cards([]);
  };

  public getFaceUps = (): Cards => {
    return Cards.of(this._values.filter((c) => c.isFaceUp));
  };
  public getFaceDowns = (): Cards => {
    return Cards.of(this._values.filter((c) => !c.isFaceUp));
  };
  public haveFaceUps = (): boolean => {
    return this.getFaceUps().values.length !== 0;
  };
  public haveFaceDowns = (): boolean => {
    return this.getFaceDowns().values.length !== 0;
  };
  public findFirstFaceUpIndex = (): number => {
    return this._values.findIndex((c) => c.isFaceUp);
  };
  public findLastFaceDownIndex = (): number => {
    for (let i = this._values.length - 1; i >= 0; i--) {
      if (!this._values[i].isFaceUp) {
        return i;
      }
    }
    return -1;
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

  public isOnlyFaceUp = (): boolean => {
    if (this.isEmpty()) {
      return false;
    }
    return this._values.every((card) => card.isFaceUp);
  };
  public isOnlyFaceDown = (): boolean => {
    if (this.isEmpty()) {
      return false;
    }
    return this._values.every((card) => !card.isFaceUp);
  };

  public faceUpIfLastIsFaceDown = (): Cards => {
    if (this.isLastFaceDown()) {
      return Cards.of(
        this._values.map((v, index) => {
          return Card.of(
            v.suit,
            v.rank,
            index === this._values.length - 1 ? true : v.isFaceUp
          );
        })
      );
    }
    return this;
  };
  private isLastFaceDown = (): boolean => {
    if (this.isEmpty()) {
      return false;
    }
    return this.findLastFaceDownIndex() === this._values.length - 1;
  };
}
