import React, { Children } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./providers/AuthProvider";
import { AuthContextProvider } from "./store/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./store/UserContext";

import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <UserContextProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
