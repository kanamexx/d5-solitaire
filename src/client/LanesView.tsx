import Lane from "shared/domain/lane/Lane";
import styled from "styled-components";
import { LaneView } from "./LaneView";

type LanesViewProps = {
  props: Lane[];
};

export const LanesView: React.FC<LanesViewProps> = (props: LanesViewProps) => {
  return (
    <Div className="lanes">
      {props.props.map((prop, i) => (
        <LaneView key={i.toString()} lane={prop} />
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
