import React from 'react';

type HomeProps = {
    name: string
}

function Home(props: HomeProps) {
    return (
        <h1>Hello {props.name}!</h1>
    )
}

export default Home;