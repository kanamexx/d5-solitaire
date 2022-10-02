import Goal from "shared/domain/goal/Goal";
import CardResponseBody from "./CardResponseBody";
import SuitResponseBody from "./SuitResponseBody";

export default class GoalResponseBody {
  public readonly suit: SuitResponseBody;
  public readonly cards: CardResponseBody[];

  private constructor(goal: Goal) {
    this.suit = SuitResponseBody.of(goal.suit);
    this.cards = goal.cards.values.map((card) => CardResponseBody.of(card));
  }

  public static of(entity: Goal): GoalResponseBody {
    if (!entity) {
      throw new Error("entity must not be null");
    }

    return new GoalResponseBody(entity);
  }
}
