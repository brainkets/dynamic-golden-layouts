import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import the root reducer
import rootReducer from "./reducers/index";
import { List } from "immutable";
import { setDefaultState } from "./actions";

// create an object for the default data
const defaultState = {
  count: 0,
  panels: [
    // {
    //   type: "react-component",
    //   component: "IncrementButtonContainer"
    // },
    // {
    //   type: "react-component",
    //   component: "DecrementButtonContainer"
    // },
    // {
    //   type: "react-component",
    //   component: "IncrementButtonContainer"
    // },
    // {
    //   type: "react-component",
    //   component: "IncrementButtonContainer"
    // }
  ]
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middlewares = [thunk];

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
// //setting default state
// store.dispatch(setDefaultState(defaultState));

export default store;
