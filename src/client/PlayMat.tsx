import React, { Component } from 'react';
import axios from 'axios'
import Card from './Card';

type PlayMatProps = {
    set: string[]
    lines: string[]
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

    render() {
        return (
            <>
                <h1>set: {this.state.set.map(card => this.renderCard(card))}</h1>
                {/* <h1>lines: {this.state.lines}</h1>
                <h1>goals: {this.state.goals}</h1> */}
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