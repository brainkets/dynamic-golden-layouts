//*** */HANDLING EVENTS INDEX PAGE/* ***//
import { combineReducers } from "redux";

//import reducers
import count from "./count";
import panels from "./panels";

// combine all reducers to the root reducer
const rootReducer = combineReducers({
  count,
  panels
});

export default rootReducer;
