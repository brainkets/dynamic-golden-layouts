//*** */HANDLING COUNT EVENTS PAGE/* ***//
import { Map } from "immutable";
import actionType from "./../actions/index";

//*** HELPER FUNCTIONS  */
function loadCount(state, loadedState) {
  //return default state when there is no saved states
  if (loadedState == null) {
    return state;
  }
  const statesArray = Object.values(loadedState); //array of states

  const loadedCount = statesArray.pop().count;

  return state.update("count", count => loadedCount);
}
//*** HELPER FUNCTIONS END */

function count(state = Map({ count: 0 }), action) {
  switch (action.type) {
    case "LOAD_COUNT_SUCCESS":
      return loadCount(state, action.payload);
    case actionType.INCREMENT_COUNT:
      return state.update("count", count => count + 1);
    case actionType.DECREMENT_COUNT:
      return state.update("count", count => count - 1);
    case actionType.RESET_COUNT:
      return state.update("count", count => 0);
    default:
      return state;
  }
}

export default count;
