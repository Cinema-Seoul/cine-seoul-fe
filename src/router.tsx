import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import IndexPage from './pages';

import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = createRoutesFromElements(
  <Route path='/' element={<IndexPage />}>

  </Route>
)

const router = createBrowserRouter(routes);

export default router;