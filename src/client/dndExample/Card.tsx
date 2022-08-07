import type { Identifier, XYCoord } from "dnd-core";
import { FC, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "./ItemTypes";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

export interface CardProps {
  id: any;
  text: string;
  containerIndex: number;
  itemIndex: number;
  moveCard: (
    dragContainerIndex: number,
    hoverContainerIndex: number,
    dragIndex: number,
    hoverIndex: number
  ) => void;
  isDraggable: boolean;
}

interface DragItem {
  containerIndex: number;
  itemIndex: number;
  id: string;
  type: string;
}

export const CardItem: FC<CardProps> = ({
  id,
  text,
  containerIndex,
  itemIndex,
  moveCard,
  isDraggable,
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
      const dragIndex = item.itemIndex;
      const hoverIndex = itemIndex;

      const dragContainerIndex = item.containerIndex;
      const hoverContainerIndex = containerIndex;

      // console.log("item: ", item);
      console.log("dragIndex: ", dragIndex);
      console.log("hoverIndex: ", hoverIndex);
      console.log("dragContainerIndex: ", dragContainerIndex);
      console.log("hoverContainerIndex: ", hoverContainerIndex);
      // if (
      //   !dragIndex ||
      //   !hoverIndex ||
      //   !dragContainerIndex ||
      //   !hoverContainerIndex
      // ) {
      //   return;
      // }

      // Don't replace items with themselves
      if (dragContainerIndex === hoverContainerIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
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
      moveCard(dragContainerIndex, hoverContainerIndex, dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.itemIndex = hoverIndex;
      item.containerIndex = hoverContainerIndex;
    },
  });

  const [canDrag, setCanDrag] = useState(isDraggable);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: () => {
        return { id, itemIndex, containerIndex };
      },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: canDrag,
    }),
    [canDrag]
  );

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {text}
    </div>
  );
};
