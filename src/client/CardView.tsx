import React, { useEffect, useState } from "react";
import { ColorType } from "shared/domain/card/Suit";
import styled from "styled-components";
import Card from "../shared/domain/card/Card";
import backImage from "./assets/card-back.png";
type CardViewProps = {
  card: Card;
  view: ViewProps;
};

type ViewProps = {
  // field: string;
  order: number;
};

export const CardView: React.FC<CardViewProps> = (props: CardViewProps) => {
  const [card, setCard] = useState(props.card);
  const [view, setView] = useState(props.view);
  useEffect(() => {
    setCard(card);
  });

  const handleClick = () => setCard((card) => card.turnOver());

  const cardView = card.isFaceUp ? (
    <FaceUp color={card.suit.color}>
      <FaceUpTop>{card.suit.value + card.rank}</FaceUpTop>
      <FaceUpMiddle>{card.suit.value}</FaceUpMiddle>
      <FaceUpBottom>{card.rank + card.suit.value}</FaceUpBottom>
    </FaceUp>
  ) : (
    <FaceDown src={backImage} />
  );

  return (
    <Wrapper className="card" order={view.order} onClick={handleClick}>
      {cardView}
    </Wrapper>
  );
};

export default CardView;

const Wrapper = styled.div<ViewProps>`
  position: relative;
  top: ${(props) => `${-100 * props.order}px`};
  border: 1px solid black;
`;

const FaceDown = styled.img`
  width: 80px;
  height: 116.125px;
`;
const FaceUp = styled.div<{ color: ColorType }>`
  width: 80px;
  height: 116.125px;
  background-color: aliceblue;
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
