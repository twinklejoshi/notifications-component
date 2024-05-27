import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UsageMetricsPage } from "./components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<App />}></Route>
          <Route
            index
            path="usage-metrics/:metrics"
            element={<UsageMetricsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
