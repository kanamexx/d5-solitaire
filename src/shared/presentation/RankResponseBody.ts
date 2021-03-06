import Rank from "shared/domain/card/Rank";
import { RankType } from "shared/domain/types";

export default class RankResponseBody {
  public readonly value: RankType;

  private constructor(value: RankType) {
    this.value = value;
  }

  public static of = (entity: Rank): RankResponseBody => {
    return new RankResponseBody(entity.value);
  };
}
