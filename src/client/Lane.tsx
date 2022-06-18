import React from 'react';
import Card from './Card';
import { TempCard } from './PlayMat';

export type LaneProps = {
  suits: TempCard[]
  // number: number
  // tail: boolean
}

export function Lane(props: LaneProps) {
  return (
    <div className="lane">
        {props.suits.map((suit, index) => 
            <Card
                key={suit.card + index}
                suit={suit.card}
            />
        )}
    </div>
  );
}

export default Lane;
