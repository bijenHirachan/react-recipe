import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const IMAGE_URL = import.meta.env.VITE_APP_IMAGE_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
