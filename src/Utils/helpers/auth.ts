import { appHistory } from 'Routes/Routes';
import { StorageService } from 'Services';
import { resetReduxStore } from 'Store/config';
import { ROOT_ROUTES } from 'Utils/constants/routes';

export async function logOut() {
  StorageService.remove('access-token');
  appHistory.push(ROOT_ROUTES.AUTH);

  const unlisten = appHistory.listen(() => {
    resetReduxStore();
    unlisten();
  });
}
