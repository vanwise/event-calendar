import { FC } from 'react';
import { Route } from 'react-router-dom';
import { CalendarPage, ProfilePage } from 'Pages';
import { SignInPage, SignUpPage } from 'Pages/auth';
import { AUTH_ROUTES, ROOT_ROUTES } from 'Utils/constants/routes';

const { CALENDAR, PROFILE } = ROOT_ROUTES;
const { SIGN_IN, SIGN_UP } = AUTH_ROUTES;

export const MAIN_COMPONENTS = [
  { path: CALENDAR, Component: CalendarPage },
  { path: PROFILE, Component: ProfilePage },
];

export const AUTH_COMPONENTS = [
  { path: SIGN_IN, Component: SignInPage },
  { path: SIGN_UP, Component: SignUpPage },
];

interface RouteComponent {
  path: string;
  Component: FC;
}

export function createRoutesList(Layout: FC, components: RouteComponent[]) {
  return (
    <Route element={<Layout />}>
      {components.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Route>
  );
}
