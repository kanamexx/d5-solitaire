import fs from "fs";
import path from "path";

import express, { Request, Response } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { Provider } from "react-redux";
import Cards from "shared/domain/card/Cards";
import GameMaster from "shared/domain/GameMaster";
import { LaneIdType } from "shared/domain/lane/LaneId";
import PlayField from "shared/domain/PlayField";
import { CommandType } from "shared/domain/types";
import CardResponseBody from "shared/presentation/CardResponseBody";
import LaneResponseBody from "shared/presentation/LaneResponseBody";
import PlayerUsecase from "shared/usecase/PlayerUsecase";
import sourceMapSupport from "source-map-support";
import App from "../client/App";
import { store } from "../client/store";
import LaneId from "../shared/domain/lane/LaneId";

sourceMapSupport.install();

const PORT = process.env.PORT || 3006;
const api = express();

api.use(express.static("dist"));
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
api.get("/solitaire/:from/:index/:to", (req: Request, res: Response) => {
  const done = new PlayerUsecase().move(
    playField,
    LaneId.of(parseInt(req.params.from) as LaneIdType),
    parseInt(req.params.index),
    LaneId.of(parseInt(req.params.to) as LaneIdType)
  );
  playField = done.playField;
  return toResponse(res, done.playField, done.message);
});
api.post("/solitaire/command", (req: Request, res: Response) => {
  const body = req.body as PostCommandRequestBody;
  switch (body.commandType) {
    case "move": {
      const done = new PlayerUsecase().move(
        playField,
        LaneId.of(parseInt(body.command.from.toString()) as LaneIdType),
        body.command.fromIndex,
        LaneId.of(parseInt(body.command.to.toString()) as LaneIdType)
      );
      playField = done.playField;
      return toResponse(res, done.playField, done.message);
    }
  }
});

export class PostCommandRequestBody {
  public readonly commandType: CommandType;
  public readonly command: MoveCommand;

  private constructor(commandType: CommandType, command: MoveCommand) {
    this.commandType = commandType;
    this.command = command;
  }

  public static moveCommandRequest = (
    from: number,
    index: number,
    to: number
  ) => {
    return new PostCommandRequestBody(
      "move",
      MoveCommand.of("lane", "lane", from, index, to)
    );
  };
}

export class MoveCommand {
  public readonly fromType: string;
  public readonly toType: string;

  public readonly from: number;
  public readonly fromIndex: number;
  public readonly to: number;

  private constructor(
    fromType: string,
    toType: string,
    from: number,
    fromIndex: number,
    to: number
  ) {
    this.fromType = fromType;
    this.toType = toType;
    this.from = from;
    this.fromIndex = fromIndex;
    this.to = to;
  }

  public static of = (
    fromType: string,
    toType: string,
    from: number,
    fromIndex: number,
    to: number
  ): MoveCommand => {
    return new MoveCommand(fromType, toType, from, fromIndex, to);
  };
}

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
    goals: playField.goals,
    message: message,
  });
};
