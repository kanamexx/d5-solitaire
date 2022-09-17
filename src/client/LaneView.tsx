import React from "react";
import Lane from "shared/domain/lane/Lane";
import styled from "styled-components";
import CardView from "./CardView";

export type LaneViewProps = {
  lane: Lane;
};

export const LaneView: React.FC<LaneViewProps> = (props: LaneViewProps) => {
  return (
    <Wrapper>
      {props.lane.cards.values.map((card, i) => (
        <CardView key={i.toString()} card={card} view={{ order: i }} />
      ))}
    </Wrapper>
  );
};

export default LaneView;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
`;
