import Rank from "../card/Rank";
import Cards from "../Cards";
import LaneId from "./LaneId";

export default class Lane {
  private readonly _laneId: LaneId;
  private readonly _cards: Cards;

  private constructor(laneId: LaneId, cards: Cards) {
    this._laneId = laneId;
    this._cards = cards;
  }

  public get laneId(): LaneId {
    return this._laneId;
  }

  public get cards(): Cards {
    return this._cards;
  }

  public static of = (laneId: LaneId, cards: Cards): Lane => {
    const nonNullCards = cards ? cards : Cards.empty();
    Lane.validateProperties(laneId, nonNullCards);
    return new Lane(laneId, nonNullCards);
  };

  public append = (cards: Cards): Lane => {
    this.validateAppendingCards(cards);
    const appended: Cards = this._cards.append(cards);
    Lane.validateProperties(this._laneId, appended);
    return new Lane(this._laneId, appended);
  };

  private validateAppendingCards(cards: Cards) {
    if (cards.haveBacks()) {
      throw new Error("back card cannot be appended");
    }

    if (this.isCardsEmpty()) {
      if (cards.getFirst().rank !== Rank.KING) {
        throw new Error("only K can be placed to empty lane");
      }
    }
  }

  private isCardsEmpty = (): boolean => {
    return this._cards.isEmpty();
  };

  private static validateProperties = (laneId: LaneId, cards: Cards) => {
    if (!laneId) {
      throw new Error("laneId must be non-empty");
    }
    if (cards.isEmpty()) {
      return;
    }
    if (
      !Lane.isDescendingBy1AndColorAlternate(cards) ||
      !Lane.isSeparatedAndBacksHaveLessIndex(cards)
    ) {
      throw new Error("invalid order cards");
    }
  };

  private static isDescendingBy1AndColorAlternate(cards: Cards): boolean {
    const faces = cards.getFaces();
    const invalids = faces
      .map((c, i) => [c, faces[i + 1]])
      .filter((c) => c[1])
      .filter((c) => {
        const mustBeHigh = c[0];
        const mustBeLow = c[1];
        if (
          mustBeHigh.rank.value !== mustBeLow.rank.value + 1 ||
          mustBeHigh.suit.color === mustBeLow.suit.color
        ) {
          return mustBeLow;
        }
      });
    return invalids.length === 0;
  }

  private static isSeparatedAndBacksHaveLessIndex(cards: Cards): boolean {
    return cards.findLastBackIndex() < cards.findFirstFaceIndex();
  }
}
