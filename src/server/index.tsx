import fs from "fs";
import path from "path";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import GameMaster from "shared/domain/GameMaster";
import { CardResponse as CardResponseBody } from "shared/presentation/CardResponseBody";
import App from "../client/App";

const PORT = process.env.PORT || 3006;
const api = express();

api.use(express.static("dist"));
api.get("/", (req, res) => {
  const app = ReactDOMServer.renderToString(
    <App set={[]} goals={[]} lines={[]} message={""} />
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

const playField = GameMaster.init();

api.get("/solitaire/:now", (req, res) => {
  return res.json({
    set: playField.set.map((card) => CardResponseBody.of(card)),
    lines: playField.lines.map((line) =>
      line.map((card) => CardResponseBody.of(card))
    ),
    goals: playField.goals,
    message: "どうしますか？(操作対象のレーン。手札の場合は7):",
  });
});

api.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
