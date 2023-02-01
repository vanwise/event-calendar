import { ValidationService } from 'Services';
import { AUTH_ROUTES } from 'Utils/constants/routes';

export const SIGN_IN_ROUTE_DATA = {
  url: AUTH_ROUTES.SIGN_UP,
  text: `Don't have an account yet?`,
  title: 'Sign In',
  linkText: 'Sign Up!',
};

export const signInValidations = ValidationService.object({
  login: ValidationService.string().trimAndRequired(),
  password: ValidationService.string().password(),
});
