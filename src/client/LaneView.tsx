import update from "immutability-helper";
import { FC, useCallback, useState } from "react";
import Lane from "shared/domain/lane/Lane";
import styled from "styled-components";
import Card from "../shared/domain/card/Card";
import { CardTestView } from "./CardView";
import { Container } from "./dndExample/Container";

export type LaneProps = {
  lane: Lane;
};

export const LaneView: FC<LaneProps> = (props: LaneProps) => {
  {
    const [cards, setCards] = useState(props.lane.cards.values);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Card[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    }, []);

    const renderCard = useCallback((card: Card, i: number) => {
      return (
        <CardTestView
          key={i.toString()}
          card={card}
          view={{ order: i }}
          id={i}
          index={i}
          text={i.toString()}
          moveCard={moveCard}
        />
      );
    }, []);
    return (
      <Wrapper>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        <Container></Container>
      </Wrapper>
    );
  }
};
const style = {
  width: 40,
};
const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
`;
