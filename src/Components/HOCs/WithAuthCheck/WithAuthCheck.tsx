import { Navigate, Outlet } from 'react-router-dom';
import { StorageService } from 'Services';
import { ROOT_ROUTES } from 'Utils/constants/routes';

function WithAuthCheck() {
  const authToken = StorageService.get('auth-token');

  return authToken ? <Outlet /> : <Navigate to={ROOT_ROUTES.AUTH} />;
}

export default WithAuthCheck;
