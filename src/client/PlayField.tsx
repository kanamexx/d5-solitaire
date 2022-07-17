import axios from "axios";
import React, { Component } from "react";
import Card from "shared/domain/card/Card";
import Cards from "shared/domain/card/Cards";
import Lane from "shared/domain/lane/Lane";
import LaneId from "shared/domain/lane/LaneId";
import LaneResponseBody from "shared/presentation/LaneResponseBody";
import CardView from "./CardView";
import DeckView from "./DeckView";
import Lanes from "./Lanes";

type PlayFieldProps = {
  deck: Cards;
  // TODO: delete set and use deck
  set: Card[];
  lanes: Lane[];
  goals: Card[][];
  message: string;
};

type OrderProps = {
  from: string;
  index: string;
  to: string;
};

type ResponseBody = {
  set: Card[];
  lanes: LaneResponseBody[];
  goals: Card[][];
  message: string;
};

class PlayField extends Component<PlayFieldProps, PlayFieldProps & OrderProps> {
  constructor(props: PlayFieldProps) {
    super(props);
    this.state = {
      deck: props.deck,
      set: props.set,
      lanes: props.lanes,
      goals: props.goals,
      message: props.message,
      from: "",
      index: "",
      to: "",
    };
  }

  init = async () => {
    const res = await axios.get(`/solitaire`);
    const data: ResponseBody = res.data;

    this.setState({
      deck: Cards.of(
        data.set.map((card) =>
          Card.of(card.suit.value, card.rank.value, card.isFaceUp)
        )
      ),
      lanes: data.lanes.map((lane) =>
        Lane.of(
          LaneId.of(lane.laneId.value),
          Cards.of(
            lane.cards.map((card) =>
              Card.of(card.suit.value, card.rank.value, card.isFaceUp)
            )
          )
        )
      ),
      goals: data.goals.map((goal) =>
        goal.map((card) =>
          Card.of(card.suit.value, card.rank.value, card.isFaceUp)
        )
      ),
      message: data.message,
    });
  };

  get = async () => {
    const res = await axios.get(
      `/solitaire/${this.state.from}/${this.state.index}/${this.state.to}`
    );
    const data: ResponseBody = res.data;

    this.setState({
      deck: Cards.of(
        data.set.map((card) =>
          Card.of(card.suit.value, card.rank.value, card.isFaceUp)
        )
      ),
      lanes: data.lanes.map((lane) =>
        Lane.of(
          LaneId.of(lane.laneId.value),
          Cards.of(
            lane.cards.map((card) =>
              Card.of(card.suit.value, card.rank.value, card.isFaceUp)
            )
          )
        )
      ),
      goals: data.goals.map((goal) =>
        goal.map((card) =>
          Card.of(card.suit.value, card.rank.value, card.isFaceUp)
        )
      ),
      message: data.message,
    });
  };

  renderDeck(cards: Cards) {
    return <DeckView cards={cards} />;
  }
  renderCard(card: Card, i: number) {
    return <CardView key={i.toString()} card={card} view={{ order: 1 }} />;
  }
  renderLanes(props: Lane[]) {
    return <Lanes props={props} />;
  }
  renderGoals(props: Lane[]) {
    return <Lanes props={props} />;
  }

  render() {
    return (
      <>
        <div>deck: {this.renderDeck(this.state.deck)}</div>
        <div>lanes: {this.renderLanes(this.state.lanes)}</div>
        <div>
          goals: {this.renderGoals([Lane.of(LaneId.of(1), Cards.empty())])}
        </div>
        <h1>message: {this.state.message}</h1>
        <div>
          from:
          <input
            value={this.state.from}
            onChange={(e) => this.setState({ from: e.target.value })}
          ></input>
          index:
          <input
            value={this.state.index}
            onChange={(e) => this.setState({ index: e.target.value })}
          ></input>
          <br />
          to:
          <input
            value={this.state.to}
            onChange={(e) => this.setState({ to: e.target.value })}
          ></input>
        </div>
        <button id="init-button" onClick={async () => await this.init()}>
          init
        </button>
        <button onClick={async () => await this.get()}>commit</button>
      </>
    );
  }
}

export default PlayField;
