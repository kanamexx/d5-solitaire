import SolitaireClient, { ResponseBody } from "client/clients/solitaireClient";
import React, { useState } from "react";
import Card from "shared/domain/card/Card";
import Cards from "shared/domain/card/Cards";
import Suit from "shared/domain/card/Suit";
import Goal from "shared/domain/goal/Goal";
import Lane from "shared/domain/lane/Lane";
import LaneId from "shared/domain/lane/LaneId";
import DeckView from "./DeckView";
import Lanes from "./LanesView";

type PlayFieldProps = {
  deck: Cards;
  // TODO: delete set and use deck
  set: Card[];
  lanes: Lane[];
  goals: Goal[];
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

  const sClient = SolitaireClient.of();

  const init = async () => {
    const res = await sClient.init();
    setData(res);
  };

  const move = async (
    laneIdFrom: LaneId,
    indexFrom: number,
    laneIdTo: LaneId
  ) => {
    const res = await sClient.command(
      laneIdFrom.value,
      indexFrom,
      laneIdTo.value
    );
    setData(res);
  };

  const setData = (data: ResponseBody) => {
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

    setGoals(
      () => [Goal.empty(Suit.CLUB)]
      // data.goals.map((goal) => Goal.of(goal.suit, Cards.of(goal.cards.values)))
    );

    setMessage(() => data.message);

    setFrom(() => "");
    setIndex(() => "");
    setTo(() => "");
  };

  const renderDeck = (cards: Cards) => {
    return <DeckView cards={cards} />;
  };
  // const renderCard = (card: Card, i: number) => {
  //   return <CardView key={i.toString()} card={card} view={{ order: 1 }} />;
  // };
  const renderLanes = (props: Lane[]) => {
    return <Lanes props={props} moveCard={move} />;
  };
  const renderGoals = (props: Lane[]) => {
    return <Lanes props={props} moveCard={move} />;
  };
  return (
    <>
      <div>deck: {renderDeck(deck)}</div>
      <div>lanes: {renderLanes(lanes)}</div>
      <div>goals: {renderGoals([Lane.of(LaneId.of(1), Cards.empty())])}</div>
      <h1>message: {message}</h1>
      <button id="init-button" onClick={async () => await init()}>
        init
      </button>
    </>
  );
};

export default PlayFieldView;
