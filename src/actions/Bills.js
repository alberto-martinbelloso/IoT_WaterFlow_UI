import * as billsRequests from '../requests/Bills'

export const FETCH_BILLS = 'FETCH_BILLS';


export const fetch_bills = (token) => {
    return (dispatch) => {
        billsRequests.getBills(token, (err, data) => {
            if(!err)
                dispatch({
                    type: FETCH_BILLS,
                    bills: data.bills
                })
        })
    }
};