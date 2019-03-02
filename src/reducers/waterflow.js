import {
    FETCH_WATERFLOW,
    FETCH_WATERFLOW_CURRENT,
    FETCH_WATERFLOW_PAST
} from '../actions/waterflow'

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
const initialState = {
    consumption: [],
    current_month: [],
    past_month: []
};

export default function waterflow(state = initialState, action) {
    switch (action.type) {
        case FETCH_WATERFLOW:
            return {
                ...state,
                consumption: action.consumption,
            };
        case FETCH_WATERFLOW_PAST:
            return {
                ...state,
                past_month: action.consumption,
            };
        case FETCH_WATERFLOW_CURRENT:
            return {
                ...state,
                current_month: action.consumption,
            };
        default:
            return state
    }
}