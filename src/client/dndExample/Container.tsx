import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { CardItem } from "./Card";

const style = {
  width: 200,
  display: "flex",
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export type ContainerProps = {
  items: TestLane[];
};

type TestLane = {
  cards: TestCard[];
};

type TestCard = {
  id: number;
  text: string;
};

export const Container: FC<ContainerProps> = (props: ContainerProps) => {
  const [lanes, setLanes] = useState(props.items);
  const moveCard = useCallback(
    (
      dragContainerIndex: number,
      hoverContainerIndex: number,
      dragIndex: number,
      hoverIndex: number
    ) => {
      // console.log("dragContainerIndex: ", dragContainerIndex);
      // console.log("hoverContainerIndex: ", hoverContainerIndex);
      if (dragContainerIndex !== hoverContainerIndex) {
        setLanes(
          (
            prev: {
              cards: {
                id: number;
                text: string;
              }[];
            }[]
          ) =>
            update(prev, {
              [dragContainerIndex]: {
                cards: {
                  $splice: [[dragIndex, 1]],
                },
              },
              [hoverContainerIndex]: {
                cards: {
                  $splice: [
                    [
                      prev[hoverContainerIndex].cards.length,
                      0,
                      prev[dragContainerIndex].cards[dragIndex] as Item,
                    ],
                  ],
                },
              },
            })
        );
      } else {
        throw new Error(
          `failed. dragContainerIndex: ${dragContainerIndex}, hoverContainerIndex: ${hoverContainerIndex}`
        );
      }
    },
    []
  );

  const renderCards = useCallback(
    (cards: { id: number; text: string }[], containerIndex: number) => {
      console.log("renderCards: ", containerIndex);
      return (
        <div key={containerIndex} className="container">
          {cards.map((card, id) => {
            return (
              <CardItem
                key={card.id}
                id={id}
                text={card.text}
                containerIndex={containerIndex}
                itemIndex={id}
                moveCard={moveCard}
                isDraggable={id === cards.length - 1}
              />
            );
          })}
        </div>
      );
    },
    []
  );

  return (
    <>
      <div style={style}>
        {/* {renderCards(cardsList[0], 0)} */}
        {lanes.map((lane, i) => renderCards(lane.cards, i))}
      </div>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
`;
