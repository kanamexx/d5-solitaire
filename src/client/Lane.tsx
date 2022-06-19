import React from 'react';
import Card from '../shared/entities/Card';
import CardView from './CardView';

export type LaneProps = {
  cards: Card[]
  // number: number
  // tail: boolean
}

export function Lane(props: LaneProps) {
  return (
    <div className="lane">
        {props.cards.map((suit, i) => 
            <CardView
                key={i.toString()}
                card={suit}
            />
        )}
    </div>
  );
}

export default Lane;
