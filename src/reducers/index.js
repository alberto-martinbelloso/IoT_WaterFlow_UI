import authentication from './Authentication'
import bills from './Bills'
import waterflow from './waterflow'
import devices from './Devices'
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    authentication,
    bills,
    waterflow,
    devices
});

export default rootReducer;