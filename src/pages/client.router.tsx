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
import MyProfileEditPage from "./client/mypage/edit-profile";
import SearchMovieListPage from "./client/movie-list/search";
import SignInNonmemberPage from "./client/sign-in-nonmember";
import EventListPage from "./client/event/list";
import EventDetailpage from "./client/event/detail";
import TicketDetailPage from "./client/mypage/tickets/detail";

const ClientRoutes = () => (
  <Suspense>
    <Routes>
      <Route path="/" element={<Root />} errorElement={<ClientErrorPage />}>
        <Route index element={<IndexPage />} />
        <Route path="theatre" element={<TheatreInfoPage />} />
        <Route path="b/event">
          <Route index element={<EventListPage />} />
          <Route path=":eventNum" element={<EventDetailpage />} />
        </Route>
        <Route path="movie">
          <Route index element={<MovieListPage />} />
          <Route path="s" element={<SearchMovieListPage />} />
          <Route path="d/:movieNum" element={<MovieDetailPage />} />
        </Route>
        <Route path="m/actor/:actorNum" element={<ActorDetailPage />} />
        <Route path="m/director/:dirNum" element={<DirectorDetailPage />} />
        <Route path="m/distributor/:distNum" element={<DistributorDetailPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signin/nm" element={<SignInNonmemberPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="my" element={<MyPage />} />
        <Route path="my/ticket" element={<MyTicketsPage />} />
        <Route path="my/ticket/d/:ticketNum" element={<TicketDetailPage />} />
        <Route path="my/edit" element={<MyProfileEditPage />} />
        <Route path="ticketing/*" element={<TicketingPage />} />
        <Route path="*" element={<ClientErrorPage noRoute />} />
      </Route>
    </Routes>
  </Suspense>
);

export default ClientRoutes;
