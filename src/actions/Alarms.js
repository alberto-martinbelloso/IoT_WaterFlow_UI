import * as alarmActions from '../requests/Alarms'

export const FETCH_ALARMS = 'FETCH_ALARMS';

export const getAlarms = () => {
    return (dispatch) => {
        alarmActions.getAlarms(localStorage.getItem('token'), (err, data) => {
            if (!err) {
                dispatch({
                    type: FETCH_ALARMS,
                    data
                })
            }
        })
    }
};