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
  const content = props.lane.cards.isEmpty() ? (
    <></>
  ) : (
    <>
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
    </>
  );

  const thisLaneDoesntContainsSelectedCard = (): boolean => {
    // TODO: returns null because props.selectedCardState[0] is immutable.
    // TODO: install redux?
    const card = props.lane.cards.find(props.selectedCardState[0]);
    return !card;
  };

  const doesContainSelectedCard = () => {
    console.log("lane");
    // const selectedCard = props.lane.cards.find(props.selectedCardState[0]);

    if (thisLaneDoesntContainsSelectedCard()) {
      props.moveCard(props.lane.laneId);
    } else {
      console.log("none");
    }

    // if (
    //   !thisLaneContainsSelectedCard() &&
    //   (props.selectedCardIndexInLaneState[0] !== undefined ||
    //     props.selectedCardIndexInLaneState[0] !== null)
    // ) {
    //   // move
    //   console.log("aaa", props.lane, props.lane.laneId);
    //   props.moveCard(props.lane.laneId);
    //   return;
    // }
    // cancel
    // props.selectedCardState[1](() => null);
    // props.selectedCardIndexInLaneState[1](() => null);
    // props.selectedLaneIdState[1](() => null);
  };

  return <Wrapper onClick={() => doesContainSelectedCard()}>{content}</Wrapper>;
};

export default LaneView;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  width: 80px;
`;
