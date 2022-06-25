import axios from "axios";
import React, { Component } from "react";
import Card from "shared/domain/Card";
import CardView from "./CardView";
import Lanes from "./Lanes";

type PlayFieldProps = {
  set: Card[];
  lines: Card[][];
  goals: Card[][];
  message: string;
};

type OrderProps = {
  from: string;
  to: string;
};

class PlayField extends Component<PlayFieldProps, PlayFieldProps & OrderProps> {
  constructor(props: PlayFieldProps) {
    super(props);
    this.state = {
      set: props.set,
      lines: props.lines,
      goals: props.goals,
      message: props.message,
      from: "",
      to: "",
    };
  }

  get = async () => {
    const res = await axios.get(
      `/solitaire/${this.state.from}/${this.state.to}`
    );
    const data: PlayFieldProps = res.data;

    this.setState({
      set: data.set.map((card) =>
        Card.of(card.suit.value, card.rank.value, card.isTail)
      ),
      lines: data.lines.map((line) =>
        line.map((card) =>
          Card.of(card.suit.value, card.rank.value, card.isTail)
        )
      ),
      goals: data.goals.map((goal) =>
        goal.map((card) =>
          Card.of(card.suit.value, card.rank.value, card.isTail)
        )
      ),
      message: data.message,
    });
  };

  renderCard(card: Card, i: number) {
    return <CardView key={i.toString()} card={card} />;
  }
  renderLanes(props: Card[][]) {
    return <Lanes props={props} />;
  }
  renderGoals(props: Card[][]) {
    return <Lanes props={props} />;
  }

  render() {
    return (
      <>
        <div className="set">
          set: {this.state.set.map((card, i) => this.renderCard(card, i))}
        </div>
        <div>lanes: {this.renderLanes(this.state.lines)}</div>
        <div>goals: {this.renderGoals(this.state.goals)}</div>
        <h1>message: {this.state.message}</h1>
        <div>
          from:
          <input
            value={this.state.from}
            onChange={(e) => this.setState({ from: e.target.value })}
          ></input>
          to:
          <input
            value={this.state.to}
            onChange={(e) => this.setState({ to: e.target.value })}
          ></input>
        </div>
        <button onClick={async () => await this.get()}>commit</button>
      </>
    );
  }
}

export default PlayField;
