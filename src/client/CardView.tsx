import type { Identifier } from "dnd-core";
import { Component, FC, useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ColorType } from "shared/domain/card/Suit";
import styled from "styled-components";
import Card from "../shared/domain/card/Card";
import backImage from "./assets/card-back.png";
import { ItemTypes } from "./dndExample/ItemTypes";
type CardViewProps = {
  card: Card;
  view: ViewProps;
};

type ViewProps = {
  // field: string;
  order: number;
};

export default class CardVeiw extends Component<CardViewProps, CardViewProps> {
  constructor(props: CardViewProps) {
    super(props);
    this.state = {
      card: props.card,
      view: {
        // field: "any",
        order: props.view.order,
      },
    };
  }

  handleClick = () => {
    this.setState({
      card: this.state.card.turnOver(),
    });
  };

  render() {
    const view = this.state.card.isFaceUp ? (
      <FaceUp color={this.state.card.suit.color}>
        <FaceUpTop>
          {this.state.card.suit.value + this.state.card.rank}
        </FaceUpTop>
        <FaceUpMiddle>{this.state.card.suit.value}</FaceUpMiddle>
        <FaceUpBottom>
          {this.state.card.rank + this.state.card.suit.value}
        </FaceUpBottom>
      </FaceUp>
    ) : (
      <FaceDown src={backImage} />
    );

    return (
      <Wrapper
        className="card"
        order={this.state.view.order}
        onClick={this.handleClick}
      >
        {view}
      </Wrapper>
    );
  }
}

type CardTestViewProps = {
  card: Card;
  view: ViewProps;
  id: any;
  index: number;
  text: string;
  moveCard: (dragIndex: number, hoberIndex: number) => void;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const CardTestView: FC<CardTestViewProps> = ({
  id,
  index,
  text,
  moveCard,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
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
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {text}
    </div>
  );
};

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};
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
