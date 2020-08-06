import React from 'react';

import Edit from './Edit'

import { Container } from 'reactstrap'

const Home = () => {
    return(
        <div>
            <Container className="py-4">
                <h1>Text Editor</h1>
                <Edit />
            </Container>
        </div>
    )
}

export default Home