import {
    FETCH_BILLS
} from '../actions/Bills'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const initialState = {
    bills: [],
};

export default function bills(state = initialState, action) {
    switch (action.type) {
        case FETCH_BILLS:
            let aux = action.bills.map(bill => {
                bill['Month'] = monthNames[new Date(bill.date).getMonth()];
                return bill
            });
            return {
                ...state,
                bills: aux,
            };
        default:
            return state
    }
}