import React from 'react';

import Edit from './Edit'

import { Container } from 'reactstrap'

let testFileName = "Test File Name"

const Home = () => {
    return(
        <div>
            <Container className="py-4">
                <h1>{testFileName}</h1>
                <Edit />
            </Container>
        </div>
    )
}

export default Home