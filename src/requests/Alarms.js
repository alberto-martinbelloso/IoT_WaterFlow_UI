import {US} from './Authentication'

/**
 *  HTTP GET
 *  Get all bills from user
 *
 * @param token {string}
 * @param callback {function(boolean, {})}
 */
export const getAlarms = (token, callback) => {
    US.get('/alarms', {headers: {Authorization: `JWT ${token}`}})
        .then(resp => {
            callback(false, resp.data)
        })
        .catch(err => {
            callback(true, err)
        })
};