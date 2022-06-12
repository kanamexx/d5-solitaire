import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Home from './Home'

type AppProps = {
  old: string,
  now: string,
}

function App(props: AppProps) {
  return (
    <div className="App">
      <Home name={props.old} name2={props.now} />
    </div>
  );
}

export default App;
