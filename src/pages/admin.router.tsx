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
import AdminScreenListPage from "./admin/screen/list";
import AdminActorListPage from "./admin/movie-meta/actor";
import AdminDirectorListPage from "./admin/movie-meta/director";
import AdminDistributorListPage from "./admin/movie-meta/distributor";
import AdminTicketListPage from "./admin/ticket/list";
import AdminPaymentListPage from "./admin/payment/list";
import AdminUserListPage from "./admin/user/list";

const AdminRoutes = () => (
  <Routes>
    <Route path="signin" element={<AdminSignInPage />} />
    <Route element={<AdminRoot />} ErrorBoundary={AdminErrorPage}>
      <Route index element={<AdminIndexPage />} />
      <Route path="user" element={<AdminUserListPage />} />
      <Route path="movie" element={<AdminMovieListPage />} />
      <Route path="movie/actor" element={<AdminActorListPage />} />
      <Route path="movie/director" element={<AdminDirectorListPage />} />
      <Route path="movie/distributor" element={<AdminDistributorListPage />} />
      <Route path="screen" element={<AdminScreenListPage />} />
      <Route path="sched" element={<AdminScheduleListPage />} />
      <Route path="ticket" element={<AdminTicketListPage />} />
      <Route path="payment" element={<AdminPaymentListPage />} />
      <Route path="*" element={<AdminErrorPage noRoute />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
