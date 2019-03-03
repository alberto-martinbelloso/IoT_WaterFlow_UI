import * as authRequests from '../requests/Authentication'
import {FETCH_DEVICES} from './Devices'

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';

export const log_in = (username, password) => {
    return (dispatch) => {
        authRequests.authenticateUser(username, password, (err, resp) => {
            if (!err) {
                dispatch({
                    type: LOG_IN,
                    username,
                    token: resp.access_token
                });
                localStorage.setItem('token', resp.access_token);
                authRequests.validateUser((err, data) => {
                    if (!err) {
                        dispatch({
                            type: FETCH_USER_INFO,
                            data
                        });
                    }
                })
            }
        });
    }
};

export const validate_token = () => {
    return (dispatch) => {
        authRequests.validateUser((err, data) => {
            if (!err) {
                dispatch({
                    type: FETCH_USER_INFO,
                    data
                });
            }
        })
    }
};

export const log_out = () => {
    const action = {
        type: LOG_OUT,
    };
    return (dispatch) => {
        dispatch(action)
    }
};