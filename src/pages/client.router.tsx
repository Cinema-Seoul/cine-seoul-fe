import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import ClientErrorPage from "./client/_error";
import Root from "./client/_root";
import IndexPage from "./client/home";
import ActorDetailPage from "./client/movie-meta/actor/detail";
import DirectorDetailPage from "./client/movie-meta/director/detail";
import DistributorDetailPage from "./client/movie-meta/distributor/detail";
import MovieDetailPage from "./client/movie-detail";
import MovieListPage from "./client/movie-list";
import MyPage from "./client/mypage";
import MyTicketsPage from "./client/mypage/tickets";
import SignInPage from "./client/sign-in";
import SignUpPage from "./client/sign-up";
import TheatreInfoPage from "./client/theatre";
import TicketingPage from "./client/ticketing";

const ClientRoutes = () => (
  <Suspense>
    <Routes>
      <Route path="/" element={<Root />} errorElement={<ClientErrorPage />}>
        <Route index element={<IndexPage />} />
        <Route path="theatre" element={<TheatreInfoPage />} />
        <Route path="movie">
          <Route index element={<MovieListPage />} />
          <Route path=":movieNum" element={<MovieDetailPage />} />
        </Route>
        <Route path="m/actor/:actorNum" element={<ActorDetailPage />} />
        <Route path="m/director/:dirNum" element={<DirectorDetailPage />} />
        <Route path="m/distributor/:distNum" element={<DistributorDetailPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="my" element={<MyPage />} />
        <Route path="my/ticket" element={<MyTicketsPage />} />
        <Route path="ticketing/*" element={<TicketingPage />} />
        <Route path="*" element={<ClientErrorPage noRoute />} />
      </Route>
    </Routes>
  </Suspense>
);

export default ClientRoutes;
