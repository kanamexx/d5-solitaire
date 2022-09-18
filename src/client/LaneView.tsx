import React from "react";
import Card from "shared/domain/card/Card";
import Lane from "shared/domain/lane/Lane";
import styled from "styled-components";
import CardView from "./CardView";

export type LaneViewProps = {
  lane: Lane;
  selectedCardState: [Card, React.Dispatch<React.SetStateAction<Card>>];
};

export const LaneView: React.FC<LaneViewProps> = (props: LaneViewProps) => {
  return props.lane.cards.isEmpty() ? (
    <Empty />
  ) : (
    <Wrapper>
      {props.lane.cards.values.map((card, i) => (
        <CardView
          key={i.toString()}
          card={card}
          selectedCardState={props.selectedCardState}
          order={i}
        />
      ))}
    </Wrapper>
  );
};

export default LaneView;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
`;

const Empty = styled.div`
  width: 80px;
`;
