import React from 'react';
import Card from 'shared/entities/Card';
import PlayMat from './PlayMat';

type AppProps = {
  set: Card[]
  lines: Card[][]
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
