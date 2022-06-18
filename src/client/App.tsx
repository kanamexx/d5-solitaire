import React from 'react';
import PlayMat from './PlayMat'
import {TempCard} from './PlayMat'

type AppProps = {
  set: string[]
  lines: TempCard[][]
  goals: string[]
  message: string
}

function App(props: AppProps) {
  return (
    <div className="App">
      <PlayMat
        {...props}
      />
    </div>
  );
}

export default App;
