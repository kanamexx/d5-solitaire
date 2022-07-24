import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "../shared/domain/card/Card";
import Rank from "../shared/domain/card/Rank";
import Suit from "../shared/domain/card/Suit";
import { CardView } from "./CardView";

describe("attribute", () => {
  test("contain card class", async () => {
    const card = Card.of(Suit.CLUB, Rank.ACE, true);
    const renderResult = render(
      <DndProvider backend={HTML5Backend}>
        <CardView key={1} card={card} id={1} index={1} moveCard={() => {}} />
      </DndProvider>
    );
    expect(renderResult.container.getElementsByClassName("card").length).toBe(
      1
    );
  });
});
