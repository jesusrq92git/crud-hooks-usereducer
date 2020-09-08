import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import myStore from "./reducer/index";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <App />,
  rootElement
);
