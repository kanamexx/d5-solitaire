import Lane from "shared/domain/lane/Lane";
import styled from "styled-components";
import { Container } from "./dndExample/Container";

type LanesProps = {
  props: Lane[];
};

function Lanes(props: LanesProps) {
  return (
    <Div className="lanes">
      {/* {props.props.map((prop, i) => (
        <LaneView key={i.toString()} lane={prop} />
      ))} */}
      <Container></Container>
    </Div>
  );
}

export default Lanes;

const Div = styled.div`
  display: flex;
  background-color: green;
  height: 900px;
`;
