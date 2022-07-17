import React, { Component } from "react";
import { ColorType } from "shared/domain/card/Suit";
import styled from "styled-components";
import Card from "../shared/domain/card/Card";
import backImage from "./assets/card-back.png";

type CardViewProps = {
  card: Card;
  view: ViewProps;
};

type ViewProps = {
  // field: string;
  order: number;
};

export default class CardVeiw extends Component<CardViewProps, CardViewProps> {
  constructor(props: CardViewProps) {
    super(props);
    this.state = {
      card: props.card,
      view: {
        // field: "any",
        order: props.view.order,
      },
    };
  }

  handleClick = () => {
    this.setState({
      card: this.state.card.turnOver(),
    });
  };

  render() {
    const view = this.state.card.isFace ? (
      <FaceUp color={this.state.card.suit.color}>
        <FaceUpTop>
          {this.state.card.getSuitString() + this.state.card.getRankString()}
        </FaceUpTop>
        <FaceUpMiddle>{this.state.card.getSuitString()}</FaceUpMiddle>
        <FaceUpBottom>
          {this.state.card.getRankString() + this.state.card.getSuitString()}
        </FaceUpBottom>
      </FaceUp>
    ) : (
      <FaceDown src={backImage} />
    );

    return (
      <Wrapper
        className="card"
        order={this.state.view.order}
        onClick={this.handleClick}
      >
        {view}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div<ViewProps>`
  position: relative;
  top: ${(props) => `${-100 * props.order}px`};
  border: 1px solid black;
`;

const FaceDown = styled.img`
  width: 80px;
  height: 116.125px;
`;
const FaceUp = styled.div<{ color: ColorType }>`
  width: 80px;
  height: 116.125px;
  background-color: aliceblue;
  color: ${(props) => props.color};

  display: flex;
  flex-flow: column;
`;
const FaceUpTop = styled.div`
  height: 33.33%;
`;
const FaceUpMiddle = styled.div`
  height: 33.33%;
  text-align: center;
  font-size: 30px;
`;
const FaceUpBottom = styled.div`
  height: 33.33%;
  transform: scaleY(-1);
  text-align: right;
`;
