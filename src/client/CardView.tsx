import React from "react";
import { ColorType } from "shared/domain/card/Suit";
import LaneId from "shared/domain/lane/LaneId";
import styled from "styled-components";
import Card from "../shared/domain/card/Card";
import backImage from "./assets/card-back.png";
type CardViewProps = {
  card: Card;
  order: number;
  selectedCardState: [Card, React.Dispatch<React.SetStateAction<Card>>];
  selectedCardIndexInLaneState: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ];
  selectedLaneIdState: [LaneId, React.Dispatch<React.SetStateAction<LaneId>>];
  moveCard: (laneIdTo: LaneId) => Promise<void>;
  laneId: LaneId;
};

export const CardView: React.FC<CardViewProps> = (props: CardViewProps) => {
  const [selectedCard, setSelectedCard] = props.selectedCardState;
  const [selectedCardIndexInLane, setSelectedCardIndexInLane] =
    props.selectedCardIndexInLaneState;
  const [selectedLaneId, setSelectedLaneId] = props.selectedLaneIdState;

  const thisCard = props.card;
  const content = determinCardContent(thisCard, selectedCard);
  const handleClick = async () => {
    if (!props.card.isFaceUp) {
      setSelectedCard(null);
      setSelectedCardIndexInLane(null);
      setSelectedLaneId(null);
      return;
    }

    if (!selectedCard) {
      setSelectedCard(() => thisCard);
      setSelectedCardIndexInLane(() => props.order);
      setSelectedLaneId(props.laneId);
    }
  };

  return (
    <Wrapper className="card" order={props.order} onClick={() => handleClick()}>
      {content}
    </Wrapper>
  );
};

export default CardView;

const determinCardContent = (
  thisCard: Card,
  selectedCard: Card
): JSX.Element => {
  const isMeSelected = thisCard.equals(selectedCard);
  return thisCard.isFaceUp ? (
    <FaceUp
      id={thisCard.suit.value + thisCard.rank}
      color={thisCard.suit.color}
      isSelected={isMeSelected}
    >
      <FaceUpTop>{thisCard.suit.value + thisCard.rank}</FaceUpTop>
      <FaceUpMiddle>{thisCard.suit.value}</FaceUpMiddle>
      <FaceUpBottom>{thisCard.rank + thisCard.suit.value}</FaceUpBottom>
    </FaceUp>
  ) : (
    <FaceDown src={backImage}></FaceDown>
  );
};

const Wrapper = styled.div<{ order: number }>`
  position: relative;
  top: ${(props) => `${-100 * props.order}px`};
  border: 1px solid black;
`;

const FaceDown = styled.img`
  width: 80px;
  height: 116.125px;
`;
const FaceUp = styled.div<{ color: ColorType; isSelected: boolean }>`
  width: 80px;
  height: 116.125px;
  background-color: ${(props) => (props.isSelected ? "gold" : "aliceblue")};
  color: ${(props) => props.color};

  display: flex;
  flex-flow: column;
`;
const FaceUpTop = styled.div`
  height: 33.33%;
`;
const FaceUpMiddle = styled.div`
  height: 33.33%;
  text-align: center;
  font-size: 30px;
`;
const FaceUpBottom = styled.div`
  height: 33.33%;
  transform: scaleY(-1);
  text-align: right;
`;
