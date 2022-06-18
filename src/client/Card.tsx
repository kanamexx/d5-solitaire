import React from 'react';

type CardProps = {
  suit: string
  // number: number
  // tail: boolean
}

function Card(props: CardProps) {
  return (
    <div className="Card">
      {props.suit}
    </div>
  );
}

export default Card;
