import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import WithAuthCheck from 'Components/HOCs/WithAuthCheck';
import { AuthLayout, MainLayout } from 'Components/layouts';
import { NotFoundPage } from 'Pages';
import { AUTH_ROUTES, ROOT_ROUTES } from 'Utils/constants/routes';
import {
  AUTH_COMPONENTS,
  createRoutesList,
  MAIN_COMPONENTS,
} from './Routes.utils';

const { HOME, CALENDAR, AUTH } = ROOT_ROUTES;

const mainRoutes = createRoutesList(MainLayout, MAIN_COMPONENTS);
const authRoutes = createRoutesList(AuthLayout, AUTH_COMPONENTS);

function Routes() {
  return (
    <Switch>
      <Route element={<WithAuthCheck />}>
        <Route path={HOME} element={<Navigate to={CALENDAR} />} />
        <Route path={AUTH} element={<Navigate to={AUTH_ROUTES.SIGN_IN} />} />
        {mainRoutes}
        {authRoutes}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Switch>
  );
}

export default Routes;
