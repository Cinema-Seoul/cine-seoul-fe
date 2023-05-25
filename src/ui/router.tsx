import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import IndexPage from "./pages/index";
import A404Page from "./pages/404";
import MovieListPage from "./pages/movie/list";
import MovieDetailPage from "./pages/movie/detail";

import type { RouteObject } from "react-router-dom";
import TheatreInfoPage from "./pages/theatre/theatre";
import Root from "./pages/_root";
import SignInPage from "./pages/sign-in";
import TicketingPage from "./pages/ticketing";

const routes: RouteObject[] = createRoutesFromElements(
  <Route path="/" element={<Root />} errorElement={<A404Page />}>
    <Route index element={<IndexPage />} />
    <Route path="theatre" element={<TheatreInfoPage />} />
    <Route path="movie">
      <Route index element={<MovieListPage />} />
      <Route path=":movieId" element={<MovieDetailPage />} />
    </Route>
    <Route path="signin" element={<SignInPage />} />
    <Route path="ticketing" element={<TicketingPage />} />
    {/* <Route path='ticket' />
    <Route path='info' />
    <Route path='user' />
    <Route path='signup' />
  <Route path='signin' /> */}
  </Route>
);

const router = createBrowserRouter(routes);

export default router;
