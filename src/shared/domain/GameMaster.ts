import Card from "./card/Card";
import Rank from "./card/Rank";
import Suit from "./card/Suit";
import PlayField from "./PlayField";

export default class GameMaster {
  private constructor() {}

  public static serve = (): Card[] => {
    return Suit.list()
      .map((suit) => Rank.list().map((rank) => Card.of(suit, rank, false)))
      .flat();
  };

  public static init = (): PlayField => {
    const deck: Card[] = Suit.list()
      .map((suit) => Rank.list().map((rank) => Card.of(suit, rank, false)))
      .flat();

    let lines: Card[][] = [];
    for (let i = 0; i < 7; i++) {
      const line: Card[] = [];
      for (let j = 0; j < i + 1; j++) {
        const cardOnLine = deck.shift();
        line.push(j === i ? cardOnLine.faceUp() : cardOnLine);
      }
      lines.push(line);
    }
    const goals: Card[][] = Suit.list().map(() => []);

    return PlayField.of(deck, lines, goals);
  };
}
