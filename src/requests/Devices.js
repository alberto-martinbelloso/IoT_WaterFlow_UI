import {US} from './Authentication'

/**
 *  HTTP GET
 *  Get all devices from user
 *
 * @param token {string}
 * @param callback {function(boolean, {})}
 */
export const getDevices = (token, callback) => {
    US.get('/devices', {headers: {Authorization: `JWT ${token}`}})
        .then(resp => {
            callback(false, resp.data)
        })
        .catch(err => {
            callback(true, err)
        })
};