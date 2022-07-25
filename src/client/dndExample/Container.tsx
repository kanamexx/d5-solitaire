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
        if (dragContainerIndex === hoverContainerIndex) {
          const lane = lanes[dragContainerIndex];
          // lane.cards.splice();
          console.log("lanes", lanes);
          const newLanes = update(lanes, {
            [dragContainerIndex]: {
              cards: {
                $splice: [
                  [dragIndex, 1],
                  [hoverIndex, 0, lane.cards[dragIndex] as Item],
                ],
              },
            },
          });
          console.dir("newLanes", newLanes);
          setLanes([...newLanes]);
        }
        // const newCards = [{ id: 8, text: "new" }];
        // setCardsList([...cardsList, newCards]);

        // setCardsList((prevCards: Item[][]) =>
        //   update(prevCards, {
        //     $splice: [
        //       [dragIndex, 1],
        //       [hoverIndex, 0, prevCards[dragIndex] as Item],
        //     ],
        //   })
        // );
      },
      []
    );

    const renderCards = useCallback(
      (cards: { id: number; text: string }[], containerIndex: number) => {
        console.log("xxxxxxxxcontainerIndex: ", containerIndex);
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
