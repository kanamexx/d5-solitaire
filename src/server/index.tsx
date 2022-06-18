import fs from 'fs';
import path from 'path';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../client/App';

const PORT = process.env.PORT || 3006;
const rest = express();

rest.use(express.static("dist"));
rest.get('/', (req, res) => {
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

let set: Array<number> = [...Array(13 * 4)].map((_, i) => i)
let lines: Array<Array<{ number, bool }>> = []
for (let i = 0; i < 7; i++) {
    const line = new Array<{ number, bool }>()
    for (let j = 0; j < i + 1; j++) {
        line.push({ number: set.shift(), bool: i === j })
    }
    lines.push(line)
}

let goals: Array<Array<number>> = []
for (let i = 0; i < 4; i++) {
    goals.push(new Array<number>())
}

rest.get('/solitaire/:now', (req, res) => {
    return res.json({
        set: set.map(i => `${suit(i)}${number(i)}`),
        lines: lines.map(line => line.map(card =>
        ({
            card: `${suit(card.number)}${number(card.number)}`,
            tail: card.bool
        }))),
        goals: goals,
        message: "どうしますか？(操作対象のレーン。手札の場合は7):"
    })
})

rest.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

function suit(i: any): string {
    if (i < 13) return "♠"
    if (i < 13 * 2) return "♣"
    if (i < 13 * 3) return "♡"
    return "♢"
}

function suit2(i: any): string {
    if (i === 0) return "♠"
    if (i === 1) return "♣"
    if (i === 2) return "♡"
    return "♢"
}

function number(i: any): string {
    const ret = (i % 13) + 1
    if (ret === 11) return "J"
    if (ret === 12) return "Q"
    if (ret === 13) return "K"
    if (ret === 1) return "A"
    return ret.toString()
}
