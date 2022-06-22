import React from 'react';
import Card from '../shared/domain/Card';
import { Lane } from './Lane';

type LanesProps = {
  props: Card[][]
}

function Lanes(props: LanesProps) {
  return (
    <div className="lanes">
        {props.props.map((prop, i) => 
            <Lane
              key={i.toString()}
              cards={prop}
            />
        )}
    </div>
  );
}

export default Lanes;
