import Card from "shared/domain/Card";
import PlayField from "shared/domain/PlayField";

export default class PlayerUsecase {
  public constructor() {}

  public move = (
    playField: PlayField,
    from: number,
    index: number,
    to: number
  ): PlayField => {
    let lines = null;
    try {
      lines = this.fromTo(playField.lines, from, index, to);
    } catch (e) {
      throw e;
    }

    return PlayField.of(playField.set, lines, playField.goals);
  };

  private fromTo = (
    lanes: Card[][],
    from: number,
    index: number,
    to: number
  ): Card[][] => {
    const fromLane = lanes[from];
    const moving: Card[] = fromLane.splice(index, fromLane.length - index);
    if (moving.length === 0) {
      throw new Error("cannot move");
    }
    if (moving.filter((card) => card.isHead).length >= 1) {
      throw new Error("you cannot moved tail card(s)");
    }

    lanes[to].push(...moving);

    return lanes;
  };
}
