import fs from "fs";
import path from "path";

import bodyParser from "body-parser";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { Provider } from "react-redux";
import Cards from "shared/domain/card/Cards";
import GameMaster from "shared/domain/GameMaster";
import { LaneIdType } from "shared/domain/lane/LaneId";
import PlayField from "shared/domain/PlayField";
import CardResponseBody from "shared/presentation/CardResponseBody";
import GoalResponseBody from "shared/presentation/GoalResponseBody";
import LaneResponseBody from "shared/presentation/LaneResponseBody";
import PlayerUsecase from "shared/usecase/PlayerUsecase";
import sourceMapSupport from "source-map-support";
import App from "../client/App";
import { store } from "../client/store";
import LaneId from "../shared/domain/lane/LaneId";

sourceMapSupport.install();

const PORT = process.env.PORT || 3006;
const api = express();

api.use(express.static("dist"), bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.get("/", (req, res) => {
  const app = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App set={[]} deck={Cards.empty()} goals={[]} lanes={[]} message={""} />
    </Provider>
  );
  const indexFile = path.resolve("./dist/public/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

let playField = null;

api.get("/solitaire", (req, res) => {
  playField = GameMaster.init();
  return toResponse(res, playField, "Which lane you move:");
});
api.get("/solitaire/:from/:index/:to", (req, res) => {
  const done = new PlayerUsecase().move(
    playField,
    LaneId.of(parseInt(req.params.from) as LaneIdType),
    parseInt(req.params.index),
    LaneId.of(parseInt(req.params.to) as LaneIdType)
  );
  playField = done.playField;
  return toResponse(res, done.playField, done.message);
});
api.post("/solitaire/command", (req, res) => {
  const body = req.body;
  console.log("command", body);
  const done = new PlayerUsecase().move(
    playField,
    LaneId.of(parseInt(body.from) as LaneIdType),
    parseInt(body.index),
    LaneId.of(parseInt(body.to) as LaneIdType)
  );
  return toResponse(res, done.playField, done.message);
});

api.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const toResponse = (res: any, playField: PlayField, message: string) => {
  return res.json({
    set: !playField.set
      ? []
      : playField.set.map((card) => CardResponseBody.of(card)),
    lanes: !playField.lanes
      ? []
      : playField.lanes.map((lane) => LaneResponseBody.of(lane)),
    goals: !playField.goals
      ? []
      : playField.goals.map((goal) => GoalResponseBody.of(goal)),
    message: message,
  });
};
