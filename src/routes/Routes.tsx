import { Route, Routes } from "react-router-dom";
import App from "../App";
import { UsageMetricsPage } from "../components";

export const AppRoutes = () => {
  return (
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
  );
};
