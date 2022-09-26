import { render } from "@testing-library/react";
import React, { useState as useStateMock } from "react";
import Card from "../shared/domain/card/Card";
import Rank from "../shared/domain/card/Rank";
import Suit from "../shared/domain/card/Suit";
import LaneId from "../shared/domain/lane/LaneId";
import CardVeiw from "./CardView";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("attribute", () => {
  const setState = jest.fn();

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation((init) => [init, setState]);
  });

  test("contain card class", async () => {
    const card = Card.of(Suit.CLUB, Rank.ACE, true);
    const selectedCardState = useStateMock<Card | null>(
      Card.of(Suit.CLUB, Rank.ACE, true)
    );
    const selectedCardIndexInLaneState = useStateMock<number | null>(0);
    const selectedLaneIdState = useStateMock<LaneId | null>(LaneId.of(0));

    const renderResult = render(
      <CardVeiw
        key={"key"}
        card={card}
        selectedCardState={selectedCardState}
        selectedCardIndexInLaneState={selectedCardIndexInLaneState}
        selectedLaneIdState={selectedLaneIdState}
        order={1}
        moveCard={async (laneId: LaneId) => {
          await console.log("laneId: ", laneId);
        }}
        laneId={LaneId.of(0)}
      />
    );
    expect(renderResult.container.getElementsByClassName("card").length).toBe(
      1
    );
  });
});
