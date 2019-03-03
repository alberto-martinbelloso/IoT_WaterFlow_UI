import axios from 'axios'

let baseUrl = 'https://iotuserservice.azurewebsites.net';

if (process.env.NODE_ENV === "production") {
    baseUrl = 'https://iotuserservice.azurewebsites.net'
}
export const US = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});


/**
 *  HTTP POST request for login authentication
 *
 * @param username {string}
 * @param password {string}
 * @param callback {function(boolean,{access_token:string})}
 */
export const authenticateUser = (username, password, callback) => {
    US.post('/auth', {
        username,
        password
    })
        .then(response => {
            callback(false, response.data)
        }).catch(err => {
        callback(true, err)
    })
};

export const validateUser = (callback) => {
    US.get('/protected', {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}}
    )
        .then(response => {
            callback(false, response.data)
        }).catch(err => {
        callback(true, null)
    })
};