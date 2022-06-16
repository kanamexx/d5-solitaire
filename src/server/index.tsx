import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../client/App';

const PORT = process.env.PORT || 3006;
const app = express();
app.use(express.static("dist"));

app.get('/', (req, res) => {
    const app = ReactDOMServer.renderToString(<App set={[]} lines={[]} goals={[]} message={""}/>);
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>d5-solitaire</title>
                    <script src="/public/client.js" defer></script>
                </head>
                <body>
                    <div id="root">${app}</div>
                </body>
            </html>
        `)
    });
});

let set: Array<number> = [...Array(13 * 4)].map((_, i) => i)
let lines: Array<Array<{ number, bool }>> = []
for (let i = 0; i < 7; i++) {
    const line = new Array<{ number, bool }>()
    lines.push(line)
    for (let j = 0; j < i + 1; j++) {
        line.push({ number: set.shift(), bool: i === j })
    }
}

let goals: Array<Array<number>> = []
for (let i = 0; i < 4; i++) {
    goals.push(new Array<number>())
}

app.get('/solitaire/:now', (req, res) => {
    return res.json({
        set: set.map(i => `${suit(i)}${number(i)}`),
        lines: lines.map(line => line.map(card =>
        ({
            card: `${suit(card.number)}${number(card.bool)}`,
            tail: card.bool
        }))),
        goals: goals,
        message: "どうしますか？(操作対象のレーン。手札の場合は7):"
    })
})

app.listen(PORT, () => {
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
