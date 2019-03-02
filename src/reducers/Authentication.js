import {
    LOG_IN,
    LOG_OUT
} from '../actions/Authentication'

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
    username: '',
    password: '',
    authenticated: false
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                username: action.username,
                password: action.password,
                authenticated: true
            };
        case LOG_OUT:
            return {
                ...state,
                authenticated: false

            };

        default:
            return state
    }
}