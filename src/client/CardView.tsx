import React, { Component } from "react";
import Card from "../shared/domain/card/Card";
import backImage from "./assets/card-back.png";

type CardViewProps = {
  card: Card;
};

export default class CardVeiw extends Component<CardViewProps, CardViewProps> {
  constructor(props: CardViewProps) {
    super(props);
    this.state = {
      card: props.card,
    };
  }

  handleClick = () => {
    this.setState({
      card: this.state.card.turnOver(),
    });
  };

  render() {
    const view = this.state.card.isFace ? (
      <div>
        {this.state.card.getSuitString() + this.state.card.getRankString()}
      </div>
    ) : (
      <img src={backImage} />
    );

    return (
      <div className="card" onClick={this.handleClick}>
        {view}
      </div>
    );
  }
}
