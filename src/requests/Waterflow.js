import {US} from './Authentication'


/**
 *  HTTP GET
 *  get waterflow between two dates
 *
 * @param from {string}
 * @param to {string}
 * @param token {string}
 * @param callback {function(boolean,{})}
 */
export const getWaterFlowFromTo = (device, from, to = new Date().getTime(), token, callback) => {
    console.log(token)
    US.get(`/waterflow/${device}`, {
        params: {
            from: from,
            to: to
        }, headers: {
            Authorization: `JWT ${token}`
        }
    })
        .then(response => {
            callback(false, response.data)
        })
        .catch(err => {
            callback(true, err)
        })
};

/**
 *  HTTP GET
 *  get waterflow between two dates
 *
 * @param from {string}
 * @param to {string}
 * @param token {string}
 * @param callback {function(boolean,{})}
 */
export const getWaterFlowFromToGrouped = (device, from, to = new Date().getTime(), token, groupBy, callback) => {
    US.get(`/waterflow/${device}`, {
        params: {
            from: from,
            to: to,
            group: groupBy
        }, headers: {
            Authorization: `JWT ${token}`
        }
    })
        .then(response => {
            callback(false, response.data)
        })
        .catch(err => {
            callback(true, err)
        })
};