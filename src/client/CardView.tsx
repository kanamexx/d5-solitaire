import React from "react";
import { ColorType } from "shared/domain/card/Suit";
import styled from "styled-components";
import Card from "../shared/domain/card/Card";
import backImage from "./assets/card-back.png";
type CardViewProps = {
  card: Card;
  order: number;
  selectedCardState: [Card, React.Dispatch<React.SetStateAction<Card>>];
};

export const CardView: React.FC<CardViewProps> = (props: CardViewProps) => {
  const [selectedCard, setSelectedCard] = props.selectedCardState;

  const card = props.card;
  const isSelected = card.equals(selectedCard);

  const content = determinCardContent(card, isSelected);
  const handleClick = () => {
    if (isOtherCardSelected(selectedCard, isSelected)) {
      // TODO: call api
      return;
    }
    setSelectedCard(() => (isSelected || !card.isFaceUp ? null : card));
  };

  return (
    <Wrapper className="card" order={props.order} onClick={() => handleClick()}>
      {content}
    </Wrapper>
  );
};

export default CardView;

const isOtherCardSelected = (
  selectedCard: Card,
  isSelected: boolean
): boolean => {
  return !selectedCard && isSelected;
};

const determinCardContent = (card: Card, isSelected: boolean): JSX.Element => {
  return card.isFaceUp ? (
    <FaceUp color={card.suit.color} isSelected={isSelected}>
      <FaceUpTop>{card.suit.value + card.rank}</FaceUpTop>
      <FaceUpMiddle>{card.suit.value}</FaceUpMiddle>
      <FaceUpBottom>{card.rank + card.suit.value}</FaceUpBottom>
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
