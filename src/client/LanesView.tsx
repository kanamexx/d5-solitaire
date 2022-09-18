import React, { useState } from "react";
import Card from "shared/domain/card/Card";
import Lane from "shared/domain/lane/Lane";
import styled from "styled-components";
import { LaneView } from "./LaneView";

type LanesViewProps = {
  props: Lane[];
};

export const LanesView: React.FC<LanesViewProps> = (props: LanesViewProps) => {
  const selectedCardState = useState<Card | null>(null);

  return (
    <Div className="lanes">
      {props.props.map((prop, i) => (
        <LaneView
          key={i.toString()}
          lane={prop}
          selectedCardState={selectedCardState}
        />
      ))}
    </Div>
  );
};

export default LanesView;

const Div = styled.div`
  display: flex;
  background-color: green;
  height: 300px;
`;
