import * as authRequests from '../requests/Authentication'

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const log_in = (username, password) => {
    return (dispatch) => {
        authRequests.authenticateUser(username, password, (err, resp) => {
            if (!err) {
                dispatch({
                    type: LOG_IN,
                    username,
                    password,
                    token: resp.access_token
                });
                localStorage.setItem('token', resp.access_token);
            } else {
                window.alert('failed to auth')
            }
        });
    }
};

export const validate_token = () => {
    return (dispatch) => {
        authRequests.validateUser((err) => {
            if (!err) {
                dispatch({
                    type: LOG_IN,
                    token: localStorage.getItem('token')
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