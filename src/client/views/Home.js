import React, { useState, useEffect } from 'react';

import { fetchFiles } from '../services/fetchAPI'

import Edit from './Edit'
import File from '../components/File'

import { Container, Button, Row } from 'reactstrap'

import '../styles/Home.scss'

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
    const[text, setText] = useState(null)
    const[selectedFile, setSelectedFile] = useState(null)
    const[title, setTitle] = useState("")

    useEffect(() => {
        // Intialize app with files from database
        fetchFiles()
        .then(res => {
            setTexts(res)
        })    
    }, [])

    useEffect(() => {
        setSelectedFile(texts[0]) 
    },[texts])

    useEffect(() => {
        if(selectedFile) {
            setTitle(selectedFile.fileName)
        }
    },[selectedFile])

    const handleSetCurrentId = (currentId) => {
        const result = texts.filter(text => text.id === currentId)
        setSelectedFile(result[0])
    }

    const handleAdd = () => {
        setSelectedFile("")
    }

    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handleTextChange = (txt) => {
        setText(txt)
    }

    const handleSave = () => {
        console.log(title)
        console.log(text)
    }
    
    return(
        <div className="main">
            <Container className="py-4">
                <Row className="py-4 align-items-center">
                    {
                        texts.length > 0 ? texts.map(text => {
                            return(
                                <File key={text.id} eventHandler={handleSetCurrentId} file={text} />
                            )
                        }) : null
                    }
                    <div className="icon" onClick={handleAdd}>
                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                            <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                        </svg>
                    </div>   
                </Row>
                <Row>
                    {
                        texts && texts.length > 0 ? <input className="title" onChange={(event) => {handleTitleChange(event.target.value)}} value={title}></input> : null
                    }
                </Row>
                {
                    selectedFile ? <Edit text={selectedFile.text} save={handleTextChange}/> : <Edit text={""} save={handleTextChange}/>
                }
                <Row className ="pt-2 justify-content-end pr-3">
                    <Button className="rounded-0" onClick={handleSave}>Save</Button>
                </Row>
            </Container>
        </div>
    )
}

export default Home