import React, { useState } from 'react'
import { Editor, EditorState, ContentState } from 'draft-js'

import '../styles/Edit.scss'

const Edit = props => {
    const[editorState, setEditorState] = useState(() =>  
        props.text ? EditorState.createWithContent(ContentState.createFromText(props.text)) : EditorState.createEmpty()
    )

    return(
        <div>
            <div className="border p-2 rounded-0 box">
                <Editor editorState={editorState} onChange={setEditorState} />
            </div>
        </div>
    )
}

export default Edit