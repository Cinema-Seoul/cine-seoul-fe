import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AdminRoot from "./admin/_root";
import AdminErrorPage from "./admin/_error";
import AdminIndexPage from "./admin/home";
import AdminMovieListPage from "./admin/movie/list";

const AdminRoutes = () => (
  <Routes>
    <Route element={<AdminRoot />} ErrorBoundary={AdminErrorPage}>
      <Route index element={<AdminIndexPage />} />
      <Route path="movie" element={<AdminMovieListPage />} />
      <Route path="*" element={<AdminErrorPage noRoute />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
