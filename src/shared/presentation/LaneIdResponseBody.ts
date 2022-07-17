import LaneId, { LaneIdType } from "shared/domain/lane/LaneId";

export default class LaneIdResponseBody {
  public readonly value: LaneIdType;

  private constructor(value: LaneIdType) {
    this.value = value;
  }

  public static of(entity: LaneId): LaneIdResponseBody {
    return new LaneIdResponseBody(entity.value);
  }
}
