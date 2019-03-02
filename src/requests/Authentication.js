import axios from 'axios'

const UM = axios.create({
    baseURL: 'https://localhost/api/',
    timeout: 1000,
});


export const authenticateUser = (username, password, callback) => {
    UM.post('/auth', {
        username,
        password
    })
        .then(response => {
            callback(response.data)
        }).catch(err => {
        console.log(err)
    })
};