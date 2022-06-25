import React from "react";
import Card from "../shared/domain/Card";

type CardViewProps = {
  card: Card;
};

function CardView(props: CardViewProps) {
  return (
    <div className="card">
      {props.card.getSuitString()}
      {props.card.getRankString()}
    </div>
  );
}

export default CardView;
