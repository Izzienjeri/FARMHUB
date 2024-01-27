import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import ReactDOM from "react-dom"; // Corrected import
import App from "./App.jsx";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
