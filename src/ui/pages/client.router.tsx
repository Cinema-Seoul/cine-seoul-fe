import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

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
      <Route path="ticketing" element={<TicketingPage />} />
      <Route path="*" element={<ClientErrorPage noRoute />} />
    </Route>
  </Routes>
);

export default ClientRoutes;
