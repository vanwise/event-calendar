import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import AuthForm, { AuthFormMethods } from 'Components/forms/AuthForm/AuthForm';
import { Input } from 'Components/inputs';
import { ValidationService } from 'Services';
import { useRegisterUserMutation } from 'Store/features/auth/auth.slice';
import { ROOT_ROUTES } from 'Utils/constants/routes';
import { omit } from 'Utils/helpers/object';
import { SIGN_UP_ROUTE_DATA, signUpValidations } from './SignUp.utils';

export type SignUpFormValues = ValidationService.InferType<
  typeof signUpValidations
>;

function SignUpPage() {
  const naviagate = useNavigate();
  const [registerUser, { isLoading: isRegisterUserLoading }] =
    useRegisterUserMutation();

  async function handleSubmit(values: SignUpFormValues) {
    const dataForRequest = omit(values, ['passwordConfirm']);

    return registerUser(dataForRequest)
      .unwrap()
      .then(() => naviagate(ROOT_ROUTES.HOME));
  }

  function renderInputs({
    register,
    formState: { errors },
  }: AuthFormMethods<SignUpFormValues>) {
    return (
      <>
        <Wrapper>
          <Input
            name="firstName"
            label="First Name"
            errors={errors}
            register={register}
            placeholder="Enter first name"
          />
          <Input
            name="lastName"
            label="Last Name"
            errors={errors}
            register={register}
            placeholder="Enter last name"
          />
        </Wrapper>

        <Input
          name="login"
          label="Login"
          errors={errors}
          register={register}
          placeholder="Enter login"
        />

        <Input
          name="email"
          label="Email"
          errors={errors}
          register={register}
          placeholder="Enter email"
        />

        <Wrapper>
          <Input
            name="password"
            type="password"
            label="Password"
            errors={errors}
            register={register}
            placeholder="Enter password"
          />
          <Input
            name="passwordConfirm"
            label="Password Confirm"
            type="password"
            placeholder="Confirm password"
            errors={errors}
            register={register}
          />
        </Wrapper>
      </>
    );
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
      routeData={SIGN_UP_ROUTE_DATA}
      isLoading={isRegisterUserLoading}
      renderInputs={renderInputs}
      validationSchema={signUpValidations}
    />
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0 20px;
`;

export default SignUpPage;
