import React, { useState } from "react";
import Card from "shared/domain/card/Card";
import Lane from "shared/domain/lane/Lane";
import LaneId from "shared/domain/lane/LaneId";
import styled from "styled-components";
import { LaneView } from "./LaneView";

type LanesViewProps = {
  props: Lane[];
  moveCard: (
    laneIdFrom: LaneId,
    indexFrom: number,
    laneIdTo: LaneId
  ) => Promise<void>;
};

export const LanesView: React.FC<LanesViewProps> = (props: LanesViewProps) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedCardIndexInLane, setSelectedCardIndexInLane] = useState<
    number | null
  >(null);
  const [selectedLaneId, setSelectedLaneId] = useState<LaneId | null>(null);

  const doMoveCard = async (laneIdTo: LaneId) => {
    if (selectedLaneId !== laneIdTo) {
      await props.moveCard(selectedLaneId, selectedCardIndexInLane, laneIdTo);
    }
    setSelectedCard(null);
    setSelectedCardIndexInLane(null);
    setSelectedLaneId(null);
  };

  return (
    <Div className="lanes">
      {props.props.map((prop, i) => (
        <LaneView
          key={i.toString()}
          lane={prop}
          selectedCardState={[selectedCard, setSelectedCard]}
          selectedCardIndexInLaneState={[
            selectedCardIndexInLane,
            setSelectedCardIndexInLane,
          ]}
          selectedLaneIdState={[selectedLaneId, setSelectedLaneId]}
          moveCard={doMoveCard}
        />
      ))}
    </Div>
  );
};

export default LanesView;

const Div = styled.div`
  display: flex;
  background-color: green;
  height: 300px;
`;
