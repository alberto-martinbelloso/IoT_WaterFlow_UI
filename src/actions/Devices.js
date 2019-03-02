import * as devicesRequests from '../requests/Devices'

export const FETCH_DEVICES = 'FETCH_DEVICES';


export const fetch_alldevices = (token) => {
    return (dispatch) => {
        devicesRequests.getDevices(token, (err, data) => {
            if (!err) {
                dispatch({
                    type: FETCH_DEVICES,
                    devices: data.devices,
                    count: data.count
                })
            }
        });
    }
};