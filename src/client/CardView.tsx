import React, { Component } from "react";
import Card from "../shared/domain/Card";

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
    return (
      <div className="card" onClick={this.handleClick}>
        {this.state.card.isTail
          ? "■"
          : this.state.card.getSuitString() + this.state.card.getRankString()}
      </div>
    );
  }
}
