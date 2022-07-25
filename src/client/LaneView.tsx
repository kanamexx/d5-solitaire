import update from "immutability-helper";
import { FC, useCallback, useState } from "react";
import Lane from "shared/domain/lane/Lane";
import styled from "styled-components";
import Card from "../shared/domain/card/Card";
import { CardView } from "./CardView";

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
            [hoverIndex, 0, prevCards[dragIndex] as Card],
          ],
        })
      );
    }, []);

    const renderCard = useCallback((card: Card, i: number) => {
      return (
        <CardView
          key={card.suit.value.toString() + card.rank.toString()}
          card={card}
          id={card.suit.value.toString() + card.rank.toString()}
          index={i}
          moveCard={moveCard}
        />
      );
    }, []);
    return (
      <>
        {/* <Wrapper>{cards.map((card, i) => renderCard(card, i))}</Wrapper>; */}
      </>
    );
  }
};
const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
`;
