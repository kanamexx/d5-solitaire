import fs from "fs";
import path from "path";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import Cards from "shared/domain/card/Cards";
import GameMaster from "shared/domain/GameMaster";
import PlayField from "shared/domain/PlayField";
import CardResponseBody from "shared/presentation/CardResponseBody";
import LaneResponseBody from "shared/presentation/LaneResponseBody";
import PlayerUsecase from "shared/usecase/PlayerUsecase";
import sourceMapSupport from "source-map-support";
import App from "../client/App";
sourceMapSupport.install();

const PORT = process.env.PORT || 3006;
const api = express();

api.use(express.static("dist"));
api.get("/", (req, res) => {
  const app = ReactDOMServer.renderToString(
    <App set={[]} deck={Cards.empty()} goals={[]} lanes={[]} message={""} />
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
  return toResponse(res, playField);
});
api.get("/solitaire/:from/:index/:to", (req, res) => {
  try {
    playField = new PlayerUsecase().move(
      playField,
      parseInt(req.params.from),
      parseInt(req.params.index),
      parseInt(req.params.to)
    );
  } catch (e) {
    console.log(e);
    return toResponse(res, playField);
  }
  return toResponse(res, playField);
});

api.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const toResponse = (res: any, playField: PlayField) => {
  return res.json({
    set: !playField.set
      ? []
      : playField.set.map((card) => CardResponseBody.of(card)),
    lanes: !playField.lanes
      ? null
      : playField.lanes.map((lane) => LaneResponseBody.of(lane)),
    goals: playField.goals,
    message: "Which lane do you move:",
  });
};
