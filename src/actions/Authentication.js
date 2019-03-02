export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const log_in = (username, password) => {
    const action = {
        type: LOG_IN,
        username,
        password
    };

    return (dispatch) => {
        dispatch(action)
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