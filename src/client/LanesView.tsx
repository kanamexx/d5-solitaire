import Lane from "shared/domain/lane/Lane";
import styled from "styled-components";
import { Container } from "./dndExample/Container";

type LanesProps = {
  props: Lane[];
};

function LanesView(props: LanesProps) {
  const lanes = [
    {
      cards: [
        {
          id: 11,
          text: "11Write a cool JS library",
        },
        {
          id: 12,
          text: "12Make it generic enough",
        },
        {
          id: 13,
          text: "13Write README",
        },
        {
          id: 14,
          text: "14Create some examples",
        },
      ],
    },
    {
      cards: [
        {
          id: 21,
          text: "21Write a cool JS library",
        },
        {
          id: 22,
          text: "22Make it generic enough",
        },
        {
          id: 23,
          text: "23Write README",
        },
        {
          id: 24,
          text: "24Create some examples",
        },
      ],
    },
    {
      cards: [
        {
          id: 31,
          text: "31Write a cool JS library",
        },
        {
          id: 32,
          text: "32Make it generic enough",
        },
        {
          id: 33,
          text: "33Write README",
        },
        {
          id: 34,
          text: "34Create some examples",
        },
      ],
    },
  ];

  return (
    <Div className="lanes">
      {/* {props.props.map((prop, i) => (
        <LanesView key={i.toString()} lane={prop} />
      ))} */}
      <Container items={lanes}></Container>
    </Div>
  );
}

export default LanesView;

const Div = styled.div`
  display: flex;
  background-color: green;
  height: 900px;
`;
