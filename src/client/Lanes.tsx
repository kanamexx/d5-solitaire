import React from "react";
import styled from "styled-components";
import Card from "../shared/domain/card/Card";
import { Lane } from "./Lane";

type LanesProps = {
  props: Card[][];
};

function Lanes(props: LanesProps) {
  return (
    <Div className="lanes">
      {props.props.map((prop, i) => (
        <Lane key={i.toString()} cards={prop} />
      ))}
    </Div>
  );
}

export default Lanes;

const Div = styled.div`
  display: flex;
  background-color: green;
`;
