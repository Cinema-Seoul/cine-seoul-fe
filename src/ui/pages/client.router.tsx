import { Suspense, lazy } from "react";
import { Route, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

// const IndexPage = lazy(() => import("./client/home"));
// const ClientErrorPage = lazy(() => import("./client/_error"));
// const Root = lazy(() => import("./client/_root"));
// const MovieDetailPage = lazy(() => import("./client/movie/detail"));
// const MovieListPage = lazy(() => import("./client/movie/list"));
// const SignInPage = lazy(() => import("./client/sign-in"));
// const TheatreInfoPage = lazy(() => import("./client/theatre/theatre"));
// const TicketingPage = lazy(() => import("./client/ticketing"));
// const SignUpPage = lazy(() => import("./client/sign-up"));
import IndexPage from "./client/home";
import ClientErrorPage from "./client/_error";
import Root from "./client/_root";
import MovieDetailPage from "./client/movie/detail";
import MovieListPage from "./client/movie/list";
import SignInPage from "./client/sign-in";
import TheatreInfoPage from "./client/theatre/theatre";
import TicketingPage from "./client/ticketing";
import SignUpPage from "./client/sign-up";

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
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="ticketing/*" element={<TicketingPage />} />
        <Route path="*" element={<ClientErrorPage noRoute />} />
      </Route>
    </Routes>
  </Suspense>
);

export default ClientRoutes;
