import React from 'react';
import Card from '../shared/entities/Card';

type CardViewProps = {
  card: Card
}

function CardView(props: CardViewProps) {
  return (
    <div className="card">
      {props.card.suit.symbol}
      {props.card.numberSymbol}
    </div>
  );
}

export default CardView;
