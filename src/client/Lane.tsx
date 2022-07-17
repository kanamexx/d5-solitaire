import React from "react";
import styled from "styled-components";
import Card from "../shared/domain/card/Card";
import CardView from "./CardView";

export type LaneProps = {
  cards: Card[];
};

export function LaneView(props: LaneProps) {
  return (
    <Lane>
      {props.cards.map((card, i) => (
        <CardView key={i.toString()} card={card} view={{ order: i }} />
      ))}
    </Lane>
  );
}

export default LaneView;

const Lane = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
`;
