import React from 'react';
// import logo from './logo.svg';
// import './App.css';
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
