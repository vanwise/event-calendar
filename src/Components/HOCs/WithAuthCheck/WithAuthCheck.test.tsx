import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { StorageService } from 'Services';
import { config } from 'Utils/constants/config';
import { ROOT_ROUTES } from 'Utils/constants/routes';
import { mockLocalStorage } from 'Utils/helpers/tests';
import { renderTestApp } from 'Utils/helpers/tests/render';

mockLocalStorage();

const server = setupServer(
  rest.post(`${config.BASE_API_URL}/auth/refresh`, (_, res, ctx) => {
    return res(ctx.json({ accessToken: 'kekToken' }));
  }),
);

function setup(initialRoute: string) {
  const renderResult = renderTestApp(null, {
    initialRoute,
  });
  return renderResult;
}

function setMockToken() {
  StorageService.set('access-token', 'super token');
}

beforeEach(() => server.listen({ onUnhandledRequest: 'bypass' }));

afterEach(() => {
  server.resetHandlers();
  StorageService.clear();
});

afterAll(() => server.close());

describe('With Auth Check', () => {
  it('should be possible stay on Home page with access token', async () => {
    setMockToken();
    setup(ROOT_ROUTES.HOME);
    await screen.findByRole('heading', { level: 1, name: 'Availability' });
  });

  it('should be redirect from Home to Auth page without access token', async () => {
    setup(ROOT_ROUTES.HOME);
    await screen.findByRole('heading', { level: 1, name: 'Sign In' });
  });

  it('should be redirect from Auth to Home page with access token', async () => {
    setMockToken();
    setup(ROOT_ROUTES.AUTH);
    await screen.findByRole('heading', { level: 1, name: 'Availability' });
  });

  it('should be stay on the Not Found page with access token and without', async () => {
    const [{ rerender }] = setup(ROOT_ROUTES.NOT_FOUND);

    function getPageNotFoundTitle() {
      return screen.findByRole('heading', {
        level: 1,
        name: 'Page not found',
      });
    }

    await getPageNotFoundTitle();
    setMockToken();
    rerender(<></>);
    await getPageNotFoundTitle();
  });
});
