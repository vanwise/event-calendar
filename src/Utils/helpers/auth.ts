import { appHistory } from 'Routes/Routes';
import { StorageService } from 'Services';
import { ROOT_ROUTES } from 'Utils/constants/routes';

export async function logOut() {
  // async import for deferred access to store before it init
  const { resetReduxStore } = await import('Store/config');

  resetReduxStore();
  StorageService.remove('access-token');
  appHistory.push(ROOT_ROUTES.AUTH);
}
