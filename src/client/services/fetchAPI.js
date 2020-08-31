import { FILES_URI } from  '../constants/URI'

const axios = require('axios')

// GET files from MongoDB
export const fetchFiles = () => {
    return axios.get(FILES_URI)
    .then(res => {
        let result = res.data
        return result
    })
    .catch(error => {
        console.log('GET error: ', error)
    })
}