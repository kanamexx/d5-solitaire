import Card from "./card/Card";
import Cards from "./card/Cards";
import Rank from "./card/Rank";
import Suit from "./card/Suit";
import Lane from "./lane/Lane";
import LaneId, { LaneIdType } from "./lane/LaneId";
import PlayField from "./PlayField";

export default class GameMaster {
  private constructor() {}

  public static init = (): PlayField => {
    const deck: Card[] = Suit.list()
      .map((suit) => Rank.list().map((rank) => Card.of(suit, rank, false)))
      .flat();

    let lanes: Lane[] = [];
    for (let i = 0 as LaneIdType; i < 7; i++) {
      let cards = Cards.empty();

      for (let j = 0; j < i + 1; j++) {
        const appending = deck.shift();
        const upOrDown = j === i ? appending.faceUp() : appending;
        cards = cards.append(Cards.of([upOrDown]));
      }

      const lane: Lane = Lane.of(LaneId.of(i), cards);
      lanes.push(lane);
    }
    const goals: Card[][] = Suit.list().map(() => []);

    return PlayField.of(deck, lanes, goals);
  };
}
