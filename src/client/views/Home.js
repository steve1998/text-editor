import React, { useState, useEffect } from 'react';

import Edit from './Edit'
import File from '../components/File'

import { Container, Button, Row } from 'reactstrap'

let testFiles = [
    {
        id: 0,
        fileName: "Diary",
        text: "Hello There! This is a test text"
    },
    {
        id: 1,
        fileName: "Study Schedule",
        text: "Happy birthday!"
    },
    {
        id: 2,
        fileName: "List of Contacts",
        text: "Damnit"
    },
]

const Home = () => {
    const[texts, setTexts] = useState([])
    const[selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        setTexts(testFiles)
    }, [])

    useEffect(() => {
        setSelectedFile(texts[0]) 
    },[texts])

    const handleSetCurrentId = (currentId) => {
        const result = texts.filter(text => text.id === currentId)
        setSelectedFile(result[0])
    }

    const handleSave = () => {
        alert('Saved')
    }
    
    return(
        <div>
            <Container className="py-4">
                <Row className="py-4">
                    {
                        texts.map(text => {
                            return(
                                <File key={text.id} eventHandler={handleSetCurrentId} file={text} />
                            )
                        })
                    }
                </Row>
                <Row>
                    {
                        texts.length > 0 && selectedFile ? <h1>{selectedFile.fileName}</h1> : null
                    }
                </Row>
                {
                    selectedFile ? <Edit text={selectedFile.text} /> : <Edit text={null} />
                }
                <Row className ="pt-2 justify-content-end pr-3">
                    <Button className="rounded-0" onClick={handleSave}>Save</Button>
                </Row>
            </Container>
        </div>
    )
}

export default Home