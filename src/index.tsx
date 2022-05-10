import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./providers/AuthProvider";
import { AuthContextProvider } from "./store/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./store/UserContext";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
