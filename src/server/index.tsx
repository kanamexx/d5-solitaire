import fs from 'fs';
import path from 'path';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { CardResponse as CardResponseBody } from 'shared/dtos/CardResponseBody';
import Card from 'shared/entities/Card';
import CardServer from 'shared/entities/CardServer';
import Suit from 'shared/entities/Suit';
import App from '../client/App';

const PORT = process.env.PORT || 3006;
const api = express();

api.use(express.static("dist"));
api.get('/', (req, res) => {
    const app = ReactDOMServer.renderToString(<App set={[]} goals={[]} lines={[]} message={""}/>);
    const indexFile = path.resolve('./dist/public/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`))
    });
});

let set: Card[] = CardServer.serve()
let lines: Card[][] = []
for (let i = 0; i < 7; i++) {
    const line: Card[] = []
    for(let j = 0; j < i + 1; j++) {
        line.push(set.shift())
    }
    lines.push(line)
}
let goals: Card[][] = Suit.all().map(() => [])

api.get('/solitaire/:now', (req, res) => {
    return res.json({
        set: set.map(card => CardResponseBody.of(card)),
        lines: lines.map(line => line.map(card => CardResponseBody.of(card))),
        goals: goals,
        message: "どうしますか？(操作対象のレーン。手札の場合は7):"
    })
})

api.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
