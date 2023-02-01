import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { StorageService } from 'Services';
import { config } from 'Utils/constants/config';
import { mockLocalStorage, userEventWithAct } from 'Utils/helpers/tests';
import { renderTestApp } from 'Utils/helpers/tests/render';
import { SIGN_UP_ROUTE_DATA } from '../SignUp/SignUp.utils';
import SignInPage from './SignIn';
import { SIGN_IN_ROUTE_DATA } from './SignIn.utils';

mockLocalStorage();

const server = setupServer(
  rest.post(`${config.BASE_API_URL}/auth/login`, (_, res, ctx) => {
    return res(ctx.json({ accessToken: 'kekToken' }));
  }),
);

function setup(props = {}) {
  const renderResult = renderTestApp(<SignInPage {...props} />);
  return renderResult;
}

beforeEach(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
  setup();
});

afterEach(() => {
  server.resetHandlers();
  StorageService.clear();
});

afterAll(() => server.close());

describe('Sign In Page', () => {
  it('should be possible to write credentials and enter to app', async () => {
    const loginInput = screen.getByRole('textbox', { name: 'Login' });
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      await userEvent.type(loginInput, 'mister');
      await userEvent.type(passwordInput, '12345');
      await userEvent.click(submitButton);
    });

    await screen.findByRole('heading', { level: 1, name: 'Availability' });
  });

  it('should be possible navigate to Sign Up page', async () => {
    const signUpLink = screen.getByRole('link', {
      name: SIGN_IN_ROUTE_DATA.linkText,
    });

    await userEventWithAct.click(signUpLink);
    await screen.findByRole('heading', {
      level: 1,
      name: SIGN_UP_ROUTE_DATA.title,
    });
  });
});
