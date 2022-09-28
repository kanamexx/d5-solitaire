import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Cards from "shared/domain/card/Cards";
import App from "./App";
import { store } from "./store";

ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <Provider store={store}>
      <App set={[]} deck={Cards.empty()} lanes={[]} goals={[]} message={""} />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
