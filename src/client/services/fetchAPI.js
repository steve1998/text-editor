import { FILES_URI } from  '../constants/URI'

const axios = require('axios')

// GET files from MongoDB
export const fetchFiles = () => {
    return axios.get(FILES_URI)
    .then(res => {
        let result = res.data
        return result
    })
    .catch(err => {
        console.log('GET: ', err)
    })
}

export const updateFile = async (id, title, text) => {
    let file = {
        id: id, 
        fileName: title, 
        text: text
    }

    return axios.post(FILES_URI, file)
    .then(res => {
        console.log('POST: ', res)
        return res
    })
    .catch(err => {
        console.log('POST: ', err)
    })
}