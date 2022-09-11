import { useNavigate } from 'react-router-dom';
import { AuthForm } from 'Components/forms';
import { AuthFormMethods } from 'Components/forms/AuthForm/AuthForm';
import { Input } from 'Components/inputs';
import { useLogInMutation } from 'Store/features/auth/auth.slice';
import { AUTH_ROUTES, ROOT_ROUTES } from 'Utils/constants/routes';
import { getValidations } from 'Utils/helpers/validation';

interface SignInFormValuesBase {
  login: string;
  password: string;
}
type SignInFormValues = Partial<SignInFormValuesBase>;
export type SubmittedSignInFormValues = SignInFormValuesBase;

const requiredValidation = getValidations(['required']);

const ROUTE_DATA = {
  url: AUTH_ROUTES.SIGN_UP,
  text: `Don't have an account yet?`,
  title: 'Sign In',
  linkText: 'Sign Up',
};

function SignInPage() {
  const naviagate = useNavigate();
  const [logIn, { isLoading: isLogInLoading }] = useLogInMutation();

  function handleSubmit(values: SignInFormValues) {
    const formValues = values as SubmittedSignInFormValues;

    return logIn(formValues)
      .unwrap()
      .then(() => naviagate(ROOT_ROUTES.HOME));
  }

  function renderInputs({
    register,
    formState: { errors },
  }: AuthFormMethods<SignInFormValues>) {
    return (
      <>
        <Input
          name="login"
          label="Login"
          errors={errors}
          register={register}
          placeholder="Enter login"
          registerOptions={requiredValidation}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          errors={errors}
          register={register}
          placeholder="Enter password"
          registerOptions={requiredValidation}
        />
      </>
    );
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
      routeData={ROUTE_DATA}
      isLoading={isLogInLoading}
      renderInputs={renderInputs}
    />
  );
}

export default SignInPage;
