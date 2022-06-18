import React from 'react';
import PlayMat from './PlayMat'

type AppProps = {
  set: string[]
  lines: string[]
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
