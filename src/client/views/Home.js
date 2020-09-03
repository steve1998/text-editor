import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'

import { fetchFiles, updateFile, deleteFile } from '../services/fetchAPI'

import Edit from './Edit'
import File from '../components/File'

import { Container, Button, Row } from 'reactstrap'

import '../styles/Home.scss'

const Home = () => {
    const[texts, setTexts] = useState([])
    const[text, setText] = useState(null)
    const[selectedFile, setSelectedFile] = useState(null)
    const[title, setTitle] = useState('')
    const[id, setId] = useState(0)

    useEffect(() => {
        // Intialize app with files from database
        fetchFiles()
        .then(res => {
            setTexts(res)
        })    
    }, [])

    useEffect(() => {
        if(texts.length > 0) {
            setSelectedFile(texts[0])
        }
    /*eslint-disable*/
    },[])
    /*eslint-enable*/

    useEffect(() => {
        let file =  {
            id: id,
            fileName: 'New Document',
            text: ''
        }

        setTexts([
            ...texts,
            file
        ])
        setSelectedFile(file)
    /*eslint-disable*/
    }, [id])
    /*eslint-enable*/

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
        let newId = uuidv4()
        setId(newId)
    }

    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handleTextChange = (txt) => {
        setText(txt)
    }

    const handleSave = () => {
        updateFile(selectedFile.id, title, text)
        .then(res => {
            if(res.status === 200) {
                fetchFiles()
                .then(res => {
                    setTexts(res)
                })
            }
        })
    }

    const handleDelete = () => {
        deleteFile(selectedFile.id)
        .then(res => {
            if(res.status === 200) {
                fetchFiles()
                .then(res => {
                    setTexts(res)
                })
            }
        })
    }
    
    return(
        <div className="main">
            <Container className="py-4">
                <Row className="py-4">
                    <h1 className="brand">bsic <span className="subtitle">text editor</span></h1>
                </Row>
                <Row className="py-2 align-items-center">
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
                    <Button color="primary" className="rounded-0" onClick={handleSave}>Save</Button>
                    <Button color="danger" className="rounded-0 ml-2" onClick={handleDelete}>Delete</Button>
                </Row>
                <footer className="footer">
                    <p>Created with React and Flask. <a target="_blank" rel="noopener noreferrer" href="https://github.com/steve1998">GitHub</a></p>
                </footer>
            </Container>
        </div>
    )
}

export default Home