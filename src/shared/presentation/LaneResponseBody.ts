import Lane from "shared/domain/lane/Lane";
import CardResponseBody from "./CardResponseBody";
import LaneIdResponseBody from "./LaneIdResponseBody";

export default class LaneResponseBody {
  public readonly laneId: LaneIdResponseBody;
  public readonly cards: CardResponseBody[];

  private constructor(lane: Lane) {
    this.laneId = LaneIdResponseBody.of(lane.laneId);
    this.cards = lane.cards.values.map((card) => CardResponseBody.of(card));
  }

  public static of(entity: Lane): LaneResponseBody {
    if (!entity) {
      throw new Error("entity must not be null");
    }

    return new LaneResponseBody(entity);
  }
}
