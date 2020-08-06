import React, { useState, useEffect } from 'react'
import { Editor, EditorState } from 'draft-js'

import { Input, Button } from 'reactstrap'

const Edit = () => {
    const[editorState, setEditorState] = useState(() => 
        EditorState.createEmpty()
    )

    return(
        <div>
            <div className="border p-2 rounded-0">
                <Editor editorState={editorState} onChange={setEditorState} />
            </div>
        </div>
    )
}

export default Edit