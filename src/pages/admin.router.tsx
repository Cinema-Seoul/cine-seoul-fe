import {
  Route,
  Routes
} from "react-router-dom";

import AdminErrorPage from "./admin/_error";
import AdminRoot from "./admin/_root";
import AdminIndexPage from "./admin/home";
import AdminMovieListPage from "./admin/movie/list";
import AdminScheduleListPage from "./admin/schedule/list";

const AdminRoutes = () => (
  <Routes>
    <Route element={<AdminRoot />} ErrorBoundary={AdminErrorPage}>
      <Route index element={<AdminIndexPage />} />
      <Route path="movie" element={<AdminMovieListPage />} />
      <Route path="sched" element={<AdminScheduleListPage />} />
      <Route path="*" element={<AdminErrorPage noRoute />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
