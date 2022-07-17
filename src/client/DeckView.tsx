import React, { Component } from "react";
import Cards from "shared/domain/Cards";
import styled from "styled-components";
import backImage from "./assets/card-back.png";

type DeckViewProps = {
  cards: Cards;
};

export default class DeckView extends Component<DeckViewProps, DeckViewProps> {
  constructor(props: DeckViewProps) {
    super(props);
    this.state = {
      cards: props.cards,
    };
  }
  render() {
    // TODO: switch empty and non-empty view.
    // bug: always state.cards is empty.
    // return this.state.cards.isEmpty() ? (
    //   <EmptyView />
    // ) : (
    //   <Image src={backImage} />
    // );
    return <Image src={backImage} />;
  }
}
const Image = styled.img`
  width: 80px;
`;
const EmptyView = styled.div`
  width: 80px;
`;
