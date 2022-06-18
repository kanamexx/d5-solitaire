import axios from 'axios';
import React, { Component } from 'react';
import Card from './Card';
import Lanes from './Lanes';

type PlayMatProps = {
    set: string[]
    lines: TempCard[][]
    goals: string[]
    message: string
}

export type TempCard = {
    card: string
    tail: boolean
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
        console.log(data)

        this.setState({
            set: data.set,
            lines: data.lines,
            goals: data.goals,
            message: data.message,
        })
    }

    renderCard(suit: string){
        return (
            <Card
                suit={suit}
                key={suit}
            />
        )
    }
    renderLanes(props: TempCard[][]){
        return (
            <Lanes
                props={props}
            />
        )
    }

    render() {
        return (
            <>
                <div className='set'>set: {this.state.set.map(card => this.renderCard(card))}</div>
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