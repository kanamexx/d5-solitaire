import { render } from "@testing-library/react";
import React from "react";
import Card from "../shared/domain/card/Card";
import Rank from "../shared/domain/card/Rank";
import Suit from "../shared/domain/card/Suit";
import CardVeiw from "./CardView";

describe("attribute", () => {
  test("contain card class", async () => {
    const card = Card.of(Suit.CLUB, Rank.ACE, true);
    const renderResult = render(<CardVeiw card={card} />);
    expect(renderResult.container.getElementsByClassName("card").length).toBe(
      1
    );
  });
});
