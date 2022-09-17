import _ from "lodash";
import Cards from "../domain/card/Cards";
import Lane from "../domain/lane/Lane";
import PlayField from "../domain/PlayField";

export default class PlayerUsecase {
  public constructor() {}

  public move = (
    playField: PlayField,
    from: number,
    index: number,
    to: number
  ): { playField: PlayField; message: string } => {
    const oldPlayField = _.cloneDeep(playField);
    let lines = null;
    try {
      lines = this.fromTo(playField.lanes, from, index, to);
    } catch (e) {
      return {
        playField: oldPlayField,
        message: e.message,
      };
    }

    return {
      playField: PlayField.of(playField.set, lines, playField.goals),
      message: "",
    };
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
      throw new Error("select card(s)");
    }
    if (moving.haveFaceDowns()) {
      throw new Error("you cannot move face down card(s)");
    }

    lanes[to] = Lane.of(lanes[to].laneId, lanes[to].cards.append(moving));

    return lanes;
  };
}
