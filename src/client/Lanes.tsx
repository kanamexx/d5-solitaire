import React from 'react';
import {Lane} from './Lane'
import {TempCard} from './PlayMat'

type LanesProps = {
  props: TempCard[][]
}

function Lanes(props: LanesProps) {
  return (
    <div className="lanes">
        {props.props.map(prop => 
            <Lane
              suits={prop}
            />
        )}
    </div>
  );
}

export default Lanes;
