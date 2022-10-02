import Card from "shared/domain/card/Card";
import Goal from "shared/domain/goal/Goal";
import LaneResponseBody from "shared/presentation/LaneResponseBody";
import BaseClient from "./baseClient";

export type ResponseBody = {
  set: Card[];
  lanes: LaneResponseBody[];
  goals: Goal[];
  message: string;
};

class SolitaireClient extends BaseClient {
  private constructor() {
    super();
  }

  public static of(): SolitaireClient {
    return new SolitaireClient();
  }

  public init = async (): Promise<ResponseBody> => {
    return await this.get<ResponseBody>("/solitaire");
  };

  public move = async (
    from: number,
    index: number,
    to: number
  ): Promise<ResponseBody> => {
    return await this.get<ResponseBody>(`/solitaire/${from}/${index}/${to}`);
  };

  public command = async (
    from: number,
    index: number,
    to: number
  ): Promise<ResponseBody> => {
    return await this.post<ResponseBody>(`/solitaire/command`, {
      from: from,
      index: index,
      to: to,
    });
  };
}

export default SolitaireClient;
