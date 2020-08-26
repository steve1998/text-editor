import React from 'react'

import { Button } from 'reactstrap'

const File = (props) => {
    return(
        <Button outline className="mr-4 rounded-pill" onClick={() => props.eventHandler(props.file.id)}>{props.file.fileName}</Button>
    )
}

export default File