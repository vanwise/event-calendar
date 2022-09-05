import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes as Switch,
} from 'react-router-dom';
import WithAuthCheck from 'Components/HOCs/WithAuthCheck';
import { AuthLayout, MainLayout } from 'Components/layouts';
import { AUTH_ROUTES, ROOT_ROUTES } from 'Utils/constants/routes';
import { AUTH_COMPONENTS, MAIN_COMPONENTS } from './Routes.utils';

const { HOME, CALENDAR, AUTH } = ROOT_ROUTES;

function Routes() {
  const mainRoutes = (
    <Route element={<MainLayout />}>
      {MAIN_COMPONENTS.map(({ path, Component }) => (
        <Route key={path} element={<WithAuthCheck />}>
          <Route path={path} element={<Component />} />
        </Route>
      ))}
    </Route>
  );

  const authRoutes = (
    <Route element={<AuthLayout />}>
      {AUTH_COMPONENTS.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Route>
  );

  return (
    <Router>
      <Switch>
        <Route path={HOME} element={<Navigate to={CALENDAR} />} />
        <Route path={AUTH} element={<Navigate to={AUTH_ROUTES.SIGN_IN} />} />
        {mainRoutes}
        {authRoutes}
      </Switch>
    </Router>
  );
}

export default Routes;
