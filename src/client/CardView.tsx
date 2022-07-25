import type { Identifier } from "dnd-core";
import { FC, useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ColorType } from "shared/domain/card/Suit";
import styled from "styled-components";
import Card from "../shared/domain/card/Card";
import backImage from "./assets/card-back.png";
import { ItemTypes } from "./dndExample/ItemTypes";

type CardViewProps = {
  card: Card;
  id: any;
  index: number;
  moveCard: (dragIndex: number, hoberIndex: number) => void;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const CardView: FC<CardViewProps> = ({ card, id, index, moveCard }) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    // canDrop(item: DragItem, monitor) {
    //   return true;
    // },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        canDrop: monitor.canDrop(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Dont't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determin rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determin mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  const view = card.isFaceUp ? (
    <FaceUp color={card.suit.color}>
      <FaceUpTop>{card.suit.value + card.rank}</FaceUpTop>
      <FaceUpMiddle>{card.suit.value}</FaceUpMiddle>
      <FaceUpBottom>{card.rank + card.suit.value}</FaceUpBottom>
    </FaceUp>
  ) : (
    <FaceDown src={backImage} />
  );

  return (
    <Wrapper
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="card"
      onClick={card.turnOver}
      index={index}
    >
      {view}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ index: number }>`
  position: relative;
  top: ${(props) => `${-100 * props.index}px`};
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

export default {};
