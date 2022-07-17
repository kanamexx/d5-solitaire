import React from "react";
import Card from "shared/domain/card/Card";
import Cards from "shared/domain/card/Cards";
import Lane from "shared/domain/lane/Lane";
import PlayField from "./PlayField";

type AppProps = {
  set: Card[];
  deck: Cards;
  lanes: Lane[];
  goals: Card[][];
  message: string;
};

function App(props: AppProps) {
  return (
    <div className="App">
      <PlayField {...props} />
    </div>
  );
}

export default App;
