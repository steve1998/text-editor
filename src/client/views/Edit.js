import React, { useState, useEffect } from 'react'
import { Editor, EditorState } from 'draft-js'

import { Input, Row } from 'reactstrap'
import '../styles/Edit.scss'

const Edit = () => {
    const[editorState, setEditorState] = useState(() => 
        EditorState.createEmpty()
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