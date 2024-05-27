import { Route } from "react-router-dom";
import App from "../App";
import { UsageMetricsPage } from "../components";

export const useRoutes = () => {
  return (
    <Route path="/">
      <Route index element={<App />}></Route>
      <Route
        index
        path="usage-metrics/:metrics"
        element={<UsageMetricsPage />}
      />
    </Route>
  );
};