import React, { useState, useEffect } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'

import '../styles/Edit.scss'

const Edit = props => {
    const[editorState, setEditorState] = useState(() =>  
        EditorState.createEmpty()
    )

    useEffect(() => {
        if(props.text) {
            setEditorState(EditorState.push(editorState, ContentState.createFromText(props.text)))
        }
    /*eslint-disable*/
    },[props])
    /*eslint-enable*/

    return(
        <div>
            <div className="border p-2 rounded-0 box">
                <Editor editorState={editorState} onChange={setEditorState} />
            </div>
        </div>
    )
}

export default Edit