import {US} from './Authentication'

/**
 *  HTTP GET
 *  Get all bills from user
 *
 * @param token {string}
 * @param callback {function(boolean, {})}
 */
export const getBills = (token, callback) => {
    US.get('/bills', {headers: {Authorization: `JWT ${token}`}})
        .then(resp => {
            callback(false, resp.data)
        })
        .catch(err => {
            callback(true, err)
        })
};