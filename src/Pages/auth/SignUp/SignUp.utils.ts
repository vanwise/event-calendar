import { ValidationService } from 'Services';
import { AUTH_ROUTES } from 'Utils/constants/routes';
import { signInValidations } from '../SignIn/SignIn.utils';

export const SIGN_UP_ROUTE_DATA = {
  url: AUTH_ROUTES.SIGN_IN,
  text: 'You already have an account?',
  title: 'Sign Up',
  linkText: 'Sign In',
};

export const signUpValidations = signInValidations.concat(
  ValidationService.object({
    firstName: ValidationService.string().trimAndRequired(),
    lastName: ValidationService.string().trim(),
    email: ValidationService.string().email(),
    passwordConfirm: ValidationService.string().passwordConfirm('password'),
  }),
);
