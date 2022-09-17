import axios from "axios";
import React, { useState } from "react";
import Card from "shared/domain/card/Card";
import Cards from "shared/domain/card/Cards";
import Lane from "shared/domain/lane/Lane";
import LaneId from "shared/domain/lane/LaneId";
import LaneResponseBody from "shared/presentation/LaneResponseBody";
import CardView from "./CardView";
import DeckView from "./DeckView";
import Lanes from "./LanesView";

type PlayFieldProps = {
  deck: Cards;
  // TODO: delete set and use deck
  set: Card[];
  lanes: Lane[];
  goals: Card[][];
  message: string;
};

type ResponseBody = {
  set: Card[];
  lanes: LaneResponseBody[];
  goals: Card[][];
  message: string;
};

export const PlayFieldView: React.FC<PlayFieldProps> = (
  props: PlayFieldProps
) => {
  const [deck, setDeck] = useState(props.deck);
  const [set, setSet] = useState(props.set);
  const [lanes, setLanes] = useState(props.lanes);
  const [goals, setGoals] = useState(props.goals);
  const [message, setMessage] = useState(props.message);
  const [from, setFrom] = useState("");
  const [index, setIndex] = useState("");
  const [to, setTo] = useState("");

  const init = async () => {
    const res = await axios.get(`/solitaire`);
    const data: ResponseBody = res.data;

    setDeck(() =>
      Cards.of(
        data.set.map((card) =>
          Card.of(card.suit.value, card.rank.value, card.isFaceUp)
        )
      )
    );

    setLanes(() =>
      data.lanes.map((lane) =>
        Lane.of(
          LaneId.of(lane.laneId.value),
          Cards.of(
            lane.cards.map((card) =>
              Card.of(card.suit.value, card.rank.value, card.isFaceUp)
            )
          )
        )
      )
    );

    setGoals(() =>
      data.goals.map((goal) =>
        goal.map((card) =>
          Card.of(card.suit.value, card.rank.value, card.isFaceUp)
        )
      )
    );

    setMessage(() => data.message);
  };

  const get = async () => {
    const res = await axios.get(`/solitaire/${from}/${index}/${to}`);
    const data: ResponseBody = res.data;

    setDeck(() =>
      Cards.of(
        data.set.map((card) =>
          Card.of(card.suit.value, card.rank.value, card.isFaceUp)
        )
      )
    );

    setLanes(() =>
      data.lanes.map((lane) =>
        Lane.of(
          LaneId.of(lane.laneId.value),
          Cards.of(
            lane.cards.map((card) =>
              Card.of(card.suit.value, card.rank.value, card.isFaceUp)
            )
          )
        )
      )
    );

    setGoals(() =>
      data.goals.map((goal) =>
        goal.map((card) =>
          Card.of(card.suit.value, card.rank.value, card.isFaceUp)
        )
      )
    );

    setMessage(() => data.message);
  };

  const renderDeck = (cards: Cards) => {
    return <DeckView cards={cards} />;
  };
  const renderCard = (card: Card, i: number) => {
    return <CardView key={i.toString()} card={card} view={{ order: 1 }} />;
  };
  const renderLanes = (props: Lane[]) => {
    return <Lanes props={props} />;
  };
  const renderGoals = (props: Lane[]) => {
    return <Lanes props={props} />;
  };
  return (
    <>
      <div>deck: {renderDeck(deck)}</div>
      <div>lanes: {renderLanes(lanes)}</div>
      <div>goals: {renderGoals([Lane.of(LaneId.of(1), Cards.empty())])}</div>
      <h1>message: {message}</h1>
      <div>
        from:
        <input
          value={from}
          onChange={(e) => setFrom(() => e.target.value)}
        ></input>
        index:
        <input
          value={index}
          onChange={(e) => setIndex(() => e.target.value)}
        ></input>
        <br />
        to:
        <input value={to} onChange={(e) => setTo(() => e.target.value)}></input>
      </div>
      <button id="init-button" onClick={async () => await init()}>
        init
      </button>
      <button onClick={async () => await get()}>commit</button>
    </>
  );
};

export default PlayFieldView;
