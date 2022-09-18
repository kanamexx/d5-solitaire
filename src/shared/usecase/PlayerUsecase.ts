import _ from "lodash";
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
    let lanes = null;
    try {
      lanes = this.fromTo(playField.lanes, from, index, to);
    } catch (e) {
      return {
        playField: oldPlayField,
        message: e.message,
      };
    }

    return {
      playField: PlayField.of(playField.set, lanes, playField.goals),
      message: "",
    };
  };

  private fromTo = (
    lanes: Lane[],
    from: number,
    index: number,
    to: number
  ): Lane[] => {
    const removed = lanes[from].removeRear(index);
    lanes[from] = removed.lane;
    lanes[to] = Lane.of(
      lanes[to].laneId,
      lanes[to].cards.append(removed.cards)
    );
    return lanes;
  };
}
