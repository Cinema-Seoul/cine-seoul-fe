import { Route, Routes } from "react-router-dom";

import AdminErrorPage from "./admin/_error";
import AdminRoot from "./admin/_root";
import AdminIndexPage from "./admin/home";
import AdminMovieListPage from "./admin/movie/list";
import AdminScheduleListPage from "./admin/schedule/list";
import AdminDataComplex from "@/components/admin-data-complex";
import { getTickets } from "@/services/ticket/ticket.service";
import { getUsers } from "@/services/user/user.service";
import AdminSignInPage from "./admin/sign-in";

const AdminRoutes = () => (
  <Routes>
    <Route path="signin" element={<AdminSignInPage />} />
    <Route element={<AdminRoot />} ErrorBoundary={AdminErrorPage}>
      <Route index element={<AdminIndexPage />} />
      <Route path="movie" element={<AdminMovieListPage />} />
      <Route path="sched" element={<AdminScheduleListPage />} />
      <Route path="ticket" element={<AdminDataComplex onGetList={(page, size) => getTickets({ page, size })} />} />
      <Route path="user" element={<AdminDataComplex onGetList={(page, size) => getUsers({ page, size })} />} />
      <Route path="*" element={<AdminErrorPage noRoute />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
