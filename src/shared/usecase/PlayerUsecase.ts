import _ from "lodash";
import LaneId from "shared/domain/lane/LaneId";
import Lane from "../domain/lane/Lane";
import PlayField from "../domain/PlayField";

export default class PlayerUsecase {
  public constructor() {}

  public move = (
    playField: PlayField,
    from: LaneId,
    index: number,
    to: LaneId
  ): { playField: PlayField; message: string } => {
    const oldPlayField = _.cloneDeep(playField);
    let lanes = null;
    try {
      lanes = this.fromTo(playField.lanes, from, index, to);
    } catch (e) {
      console.log(e);
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
    from: LaneId,
    index: number,
    to: LaneId
  ): Lane[] => {
    const removed = lanes[from.value].removeRear(index);
    lanes[from.value] = removed.lane;
    lanes[to.value] = Lane.of(
      lanes[to.value].laneId,
      lanes[to.value].cards.append(removed.cards)
    );
    return lanes;
  };
}
