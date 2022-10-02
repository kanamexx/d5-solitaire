import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "shared/domain/card/Card";
import Cards from "shared/domain/card/Cards";
import Goal from "shared/domain/goal/Goal";
import Lane from "shared/domain/lane/Lane";
import { changeGeneration, selectGeneration } from "./generation";
import PlayFieldView from "./PlayFieldView";
type AppProps = {
  set: Card[];
  deck: Cards;
  lanes: Lane[];
  goals: Goal[];
  message: string;
};

export const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <div className="App">
      <PlayFieldView {...props} />
      {/* <GenerationPage></GenerationPage> */}
    </div>
  );
};

const GenerationPage: React.FC = () => {
  const generation = useSelector(selectGeneration);
  const dispatch = useDispatch();

  return (
    <>
      <button type="button" onClick={() => dispatch(changeGeneration("First"))}>
        First Generation
      </button>
      <button
        type="button"
        onClick={() => dispatch(changeGeneration("Second"))}
      >
        Second Generation
      </button>
      <div>Generation is {generation}</div>
    </>
  );
};

export default App;
