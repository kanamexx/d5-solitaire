import Card from "shared/domain/card/Card";
import LaneResponseBody from "shared/presentation/LaneResponseBody";
import BaseClient from "./baseClient";

type ResponseBody = {
  set: Card[];
  lanes: LaneResponseBody[];
  goals: Card[][];
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
}

export default SolitaireClient;
