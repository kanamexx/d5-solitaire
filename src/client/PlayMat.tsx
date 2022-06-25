import axios from 'axios';
import React, { Component } from 'react';
import Card from 'shared/domain/Card';
import CardView from './CardView';
import Lanes from './Lanes';

type PlayMatProps = {
    set: Card[]
    lines: Card[][]
    goals: string[]
    message: string
}

class PlayMat extends Component<PlayMatProps, PlayMatProps> {
    constructor(props: PlayMatProps){
        super(props)
        this.state = {
            set: props.set,
            lines: props.lines,
            goals: props.goals,
            message: props.message,
        }
    }

    get = async() => {
        const res = await axios.get('/solitaire/aa')
        const data: PlayMatProps = res.data

        this.setState({
            set: data.set.map(card => Card.of(card.suit.value, card.rank.value, card.isTail)),
            lines: data.lines.map(line => line.map(card => Card.of(card.suit.value, card.rank.value, card.isTail))),
            goals: data.goals,
            message: data.message,
        })
    }

    renderCard(card: Card, i: number){
        return (
            <CardView
                key={i.toString()}
                card={card}
            />
        )
    }
    renderLanes(props: Card[][]){
        return (
            <Lanes
                props={props}
            />
        )
    }

    render() {
        return (
            <>
                <div className='set'>set: {this.state.set.map((card, i) => this.renderCard(card, i))}</div>
                <div>lines: {this.renderLanes(this.state.lines)}</div>
                {/* <h1>goals: {this.state.goals}</h1> */}
                <h1>message: {this.state.message}</h1>
                <button
                    onClick={async() => await this.get()}
                >
                    commit
                </button>
            </>
        )
    }
}

export default PlayMat;