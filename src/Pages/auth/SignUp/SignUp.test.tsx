import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { StorageService } from 'Services';
import { config } from 'Utils/constants/config';
import { mockLocalStorage, userEventWithAct } from 'Utils/helpers/tests';
import { renderTestApp } from 'Utils/helpers/tests/render';
import { SIGN_IN_ROUTE_DATA } from '../SignIn/SignIn.utils';
import SignUpPage from './SignUp';
import { SIGN_UP_ROUTE_DATA } from './SignUp.utils';

mockLocalStorage();

const server = setupServer(
  rest.post(`${config.BASE_API_URL}/auth/registration`, (_, res, ctx) => {
    return res(ctx.json({ accessToken: 'kekToken' }));
  }),
);

function setup(props = {}) {
  const renderResult = renderTestApp(<SignUpPage {...props} />);
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

describe('Sign Up Page', () => {
  it('should be possible to register and enter to app', async () => {
    const firstNameInput = screen.getByRole('textbox', { name: 'First Name' });
    const lastNameInput = screen.getByRole('textbox', { name: 'Last Name' });
    const loginInput = screen.getByRole('textbox', { name: 'Login' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByLabelText('Password');
    const passwordConfirmInput = screen.getByLabelText('Password Confirm');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      await userEvent.type(firstNameInput, 'David');
      await userEvent.type(lastNameInput, 'Copperfield');
      await userEvent.type(loginInput, 'mister');
      await userEvent.type(emailInput, 'super_mail@mail.com');
      await userEvent.type(passwordInput, '12345');
      await userEvent.type(passwordConfirmInput, '12345');
      await userEvent.click(submitButton);
    });

    await screen.findByRole('heading', { level: 1, name: 'Availability' });
  });

  it('should be possible navigate to Sign In page', async () => {
    const signInLink = screen.getByRole('link', {
      name: SIGN_UP_ROUTE_DATA.linkText,
    });

    await userEventWithAct.click(signInLink);
    await screen.findByRole('heading', {
      level: 1,
      name: SIGN_IN_ROUTE_DATA.title,
    });
  });
});
