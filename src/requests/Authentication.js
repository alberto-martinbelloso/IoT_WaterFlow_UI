import axios from 'axios'

let baseUrl = '';

if (process.env.NODE_ENV === 'production') {
    baseUrl = process.env.USER_SERVICE
}

export const US = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
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
            callback(false)
        }).catch(err => {
        callback(true)
    })
};