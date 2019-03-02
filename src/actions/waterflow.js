import * as waterflowRequests from '../requests/Waterflow'

export const FETCH_WATERFLOW = 'FETCH_WATERFLOW'
export const FETCH_WATERFLOW_CURRENT = 'FETCH_WATERFLOW_CURRENT'
export const FETCH_WATERFLOW_PAST = 'FETCH_WATERFLOW_PAST'


export const fetchWaterFromTo = (device, from, to, token) => {
    return (dispatch) => {
        waterflowRequests.getWaterFlowFromTo(device, from, to, token, (err, resp) => {
            console.log(resp)
        });
    };
};

export const fetchWaterFromToGrouped = (device, from, to, token, group, callback) => {
    return (dispatch) => {
        waterflowRequests.getWaterFlowFromToGrouped(device, from, to, token, group, (err, resp) => {
            console.log(resp)
        });
    };
};
export const fetchMonthWaterFlow = (device, from, to, token, group, month, callback) => {
    return (dispatch) => {
        waterflowRequests.getWaterFlowFromToGrouped(device, from, to, token, group, (err, resp) => {
            if (!err) {
                if (month === 'current')
                    dispatch({
                        type: FETCH_WATERFLOW_CURRENT,
                        consumption: resp
                    });
                else
                    dispatch({
                        type: FETCH_WATERFLOW_PAST,
                        consumption: resp
                    })
            }
        });
    };
};