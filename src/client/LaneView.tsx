import React from "react";
import Card from "shared/domain/card/Card";
import Lane from "shared/domain/lane/Lane";
import LaneId from "shared/domain/lane/LaneId";
import styled from "styled-components";
import CardView from "./CardView";

export type LaneViewProps = {
  lane: Lane;
  selectedCardState: [Card, React.Dispatch<React.SetStateAction<Card>>];
  selectedCardIndexInLaneState: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ];
  selectedLaneIdState: [LaneId, React.Dispatch<React.SetStateAction<LaneId>>];
  moveCard: (laneIdTo: LaneId) => Promise<void>;
};

export const LaneView: React.FC<LaneViewProps> = (props: LaneViewProps) => {
  return props.lane.cards.isEmpty() ? (
    <Empty />
  ) : (
    <Wrapper onClick={() => {}}>
      {props.lane.cards.values.map((card, i) => (
        <CardView
          key={i.toString()}
          card={card}
          selectedCardState={props.selectedCardState}
          selectedCardIndexInLaneState={props.selectedCardIndexInLaneState}
          selectedLaneIdState={props.selectedLaneIdState}
          order={i}
          moveCard={props.moveCard}
          laneId={props.lane.laneId}
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
