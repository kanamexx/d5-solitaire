import React from 'react';

type HomeProps = {
    name: string
    name2: string
}

function Home(props: HomeProps) {
    return (
        <h1>Hello {props.name} and {props.name2}!</h1>
    )
}

export default Home;