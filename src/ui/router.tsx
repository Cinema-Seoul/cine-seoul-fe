import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ClientRoutes from "./pages/client.router";
import AdminRoutes from "./pages/admin.router";

import type { RouteObject } from "react-router-dom";
import ClientErrorPage from "./pages/client/_error";
import AdminErrorPage from "./pages/admin/_error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="admin/*"
        Component={AdminRoutes}
        errorElement={<AdminErrorPage />}
      />
      <Route
        path="*"
        Component={ClientRoutes}
        errorElement={<ClientErrorPage />}
      />
    </Route>
  )
);

export default router;
