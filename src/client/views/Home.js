import React from 'react';

import Edit from './Edit'

import { Container, Button, Row } from 'reactstrap'

let testFileName = "Test File Name"

const Home = () => {
    return(
        <div>
            <Container className="py-4">
                <Row>
                    <h1>{testFileName}</h1>
                </Row>
                <Edit />
                <Row className ="pt-2 justify-content-end pr-3">
                    <Button className="rounded-0">Save</Button>
                </Row>
            </Container>
        </div>
    )
}

export default Home