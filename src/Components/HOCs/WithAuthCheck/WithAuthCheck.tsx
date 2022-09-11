import { Navigate, Outlet, useMatch } from 'react-router-dom';
import { StorageService } from 'Services';
import { ROOT_ROUTES } from 'Utils/constants/routes';

function WithAuthCheck() {
  const authMatch = useMatch({ path: ROOT_ROUTES.AUTH, end: false });
  const accessToken = StorageService.get('access-token');

  const isAuthorizedAndOnAuthRoute = Boolean(accessToken && authMatch);
  const isUnauthorizedAndOnAuthRoute = Boolean(!accessToken && authMatch);
  const isAuthorizedAndOnNonAuthRoute = Boolean(accessToken && !authMatch);

  if (isAuthorizedAndOnAuthRoute) {
    return <Navigate to={ROOT_ROUTES.HOME} />;
  } else if (isUnauthorizedAndOnAuthRoute || isAuthorizedAndOnNonAuthRoute) {
    return <Outlet />;
  }

  return <Navigate to={ROOT_ROUTES.AUTH} />;
}

export default WithAuthCheck;
