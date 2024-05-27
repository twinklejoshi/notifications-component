import { Routes } from "react-router-dom";
import { useRoutes } from "./useRoutes";

export const AppRoutes = () => {
  const Route = () => useRoutes();
  return (
    <Routes>
      <Route />
    </Routes>
  );
};
