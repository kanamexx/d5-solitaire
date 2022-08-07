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

// export interface ContainerState {
//   cards: Item[];
// }

export const Container: FC = () => {
  {
    const [lanes, setLanes] = useState([
      {
        cards: [
          {
            id: 11,
            text: "11Write a cool JS library",
          },
          {
            id: 12,
            text: "12Make it generic enough",
          },
          {
            id: 13,
            text: "13Write README",
          },
          {
            id: 14,
            text: "14Create some examples",
          },
        ],
      },
      {
        cards: [
          {
            id: 21,
            text: "21Write a cool JS library",
          },
          {
            id: 22,
            text: "22Make it generic enough",
          },
          {
            id: 23,
            text: "23Write README",
          },
          {
            id: 24,
            text: "24Create some examples",
          },
        ],
      },
      {
        cards: [
          {
            id: 31,
            text: "31Write a cool JS library",
          },
          {
            id: 32,
            text: "32Make it generic enough",
          },
          {
            id: 33,
            text: "33Write README",
          },
          {
            id: 34,
            text: "34Create some examples",
          },
        ],
      },
    ]);

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
  }
};
const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
`;
