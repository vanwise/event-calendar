import { createBrowserHistory } from 'history';
import {
  Navigate,
  Route,
  Routes as Switch,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import WithAuthCheck from 'Components/HOCs/WithAuthCheck';
import { AuthLayout, MainLayout } from 'Components/layouts';
import { AUTH_ROUTES, ROOT_ROUTES } from 'Utils/constants/routes';
import {
  AUTH_COMPONENTS,
  createRoutesList,
  MAIN_COMPONENTS,
} from './Routes.utils';

const { HOME, CALENDAR, AUTH } = ROOT_ROUTES;
export const appHistory = createBrowserHistory({ window });

const mainRoutes = createRoutesList(MainLayout, MAIN_COMPONENTS);
const authRoutes = createRoutesList(AuthLayout, AUTH_COMPONENTS);

function Routes() {
  return (
    <HistoryRouter history={appHistory}>
      <Switch>
        <Route element={<WithAuthCheck />}>
          <Route path={HOME} element={<Navigate to={CALENDAR} />} />
          <Route path={AUTH} element={<Navigate to={AUTH_ROUTES.SIGN_IN} />} />
          {mainRoutes}
          {authRoutes}
        </Route>
      </Switch>
    </HistoryRouter>
  );
}

export default Routes;
