//COUNT EVENTS
import actionType from "./index";
import { updateCount } from "../../javascripts/firebase";

export function countDefaultState(state) {
  return {
    type: "COUNT_DEFAULT_STATE",
    state
  };
}
export function incrementCount() {
  return {
    type: actionType.INCREMENT_COUNT
  };
}

export function decrementCount() {
  return {
    type: actionType.DECREMENT_COUNT
  };
}

export function resetCount() {
  return {
    type: actionType.RESET_COUNT
  };
}

export function updateCountValue(newValue) {
  // console.log("updateCountValue()");
  return dispatch => {
    dispatch({
      type: "UPDATE_COUNT_REQUEST"
    });
    updateCount(newValue)
      .then(res => {
        dispatch({
          type: "UPDATE_COUNT_SUCCESS"
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_COUNT_FAILED",
          payload: error
        });
      });
  };
}
