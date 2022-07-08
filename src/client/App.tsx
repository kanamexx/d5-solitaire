import React from "react";
import Card from "shared/domain/card/Card";
import PlayField from "./PlayField";

type AppProps = {
  set: Card[];
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
