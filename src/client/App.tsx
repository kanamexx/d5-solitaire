import React from "react";
import Card from "shared/domain/card/Card";
import Cards from "shared/domain/Cards";
import PlayField from "./PlayField";

type AppProps = {
  set: Card[];
  deck: Cards;
  lines: Card[][];
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
