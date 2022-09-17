import React from "react";
import Card from "shared/domain/card/Card";
import Cards from "shared/domain/card/Cards";
import Lane from "shared/domain/lane/Lane";
import PlayFieldView from "./PlayFieldView";

type AppProps = {
  set: Card[];
  deck: Cards;
  lanes: Lane[];
  goals: Card[][];
  message: string;
};

export const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <div className="App">
      <PlayFieldView {...props} />
    </div>
  );
};

export default App;
