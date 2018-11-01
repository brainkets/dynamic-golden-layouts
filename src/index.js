import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";

//golden-layout css files
import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";
import "./css/main.css";

import store from "./app_redux/store";

//required for golden-layouts
window.React = React;
window.ReactDOM = ReactDOM;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
