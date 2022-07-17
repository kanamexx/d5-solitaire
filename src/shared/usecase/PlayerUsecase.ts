import Cards from "shared/domain/card/Cards";
import Lane from "shared/domain/lane/Lane";
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
      lines = this.fromTo(playField.lanes, from, index, to);
    } catch (e) {
      throw e;
    }

    return PlayField.of(playField.set, lines, playField.goals);
  };

  private fromTo = (
    lanes: Lane[],
    from: number,
    index: number,
    to: number
  ): Lane[] => {
    const fromLane = lanes[from].cards.values;
    const moving: Cards = Cards.of(
      fromLane.splice(index, fromLane.length - index)
    );
    if (moving.isEmpty()) {
      throw new Error("cannot move");
    }
    if (moving.haveFaceDowns()) {
      throw new Error("you cannot move face down card(s)");
    }

    lanes[to] = Lane.of(lanes[to].laneId, lanes[to].cards.append(moving));

    return lanes;
  };
}
