import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { lazy } from "react";

// import AdminRoutes from "./pages/admin.router";
// import ClientRoutes from "./pages/client.router";
const AdminRoutes = lazy(() => import("./pages/admin.router"));
const ClientRoutes = lazy(() => import("./pages/client.router"));

import AdminErrorPage from "./pages/admin/_error";
import ClientErrorPage from "./pages/client/_error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path="admin/*" Component={AdminRoutes} errorElement={<AdminErrorPage />} />
      <Route path="*" Component={ClientRoutes} errorElement={<ClientErrorPage />} />
    </Route>
  )
);

export default router;
