import { useNavigate } from 'react-router-dom';
import { AuthForm } from 'Components/forms';
import { AuthFormMethods } from 'Components/forms/AuthForm/AuthForm';
import { Input } from 'Components/inputs';
import { ValidationService } from 'Services';
import { useLogInMutation } from 'Store/features/auth/auth.slice';
import { ROOT_ROUTES } from 'Utils/constants/routes';
import { SIGN_IN_ROUTE_DATA, signInValidations } from './SignIn.utils';

export type SignInFormValues = ValidationService.InferType<
  typeof signInValidations
>;

function SignInPage() {
  const naviagate = useNavigate();
  const [logIn, { isLoading: isLogInLoading }] = useLogInMutation();

  function handleSubmit(values: SignInFormValues) {
    return logIn(values)
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
        />
        <Input
          name="password"
          type="password"
          label="Password"
          errors={errors}
          register={register}
          placeholder="Enter password"
        />
      </>
    );
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
      routeData={SIGN_IN_ROUTE_DATA}
      isLoading={isLogInLoading}
      renderInputs={renderInputs}
      validationSchema={signInValidations}
    />
  );
}

export default SignInPage;
