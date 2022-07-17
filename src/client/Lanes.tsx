import React from "react";
import Lane from "shared/domain/lane/Lane";
import styled from "styled-components";
import { LaneView } from "./LaneView";

type LanesProps = {
  props: Lane[];
};

function Lanes(props: LanesProps) {
  return (
    <Div className="lanes">
      {props.props.map((prop, i) => (
        <LaneView key={i.toString()} lane={prop} />
      ))}
    </Div>
  );
}

export default Lanes;

const Div = styled.div`
  display: flex;
  background-color: green;
  height: 300px;
`;
