import styled from 'styled-components/macro';
import AuthForm, { AuthFormMethods } from 'Components/forms/AuthForm/AuthForm';
import WithFieldWatcher from 'Components/HOCs/WithFieldWatcher';
import { Input } from 'Components/inputs';
import { AUTH_ROUTES } from 'Utils/constants/routes';
import { getValidations } from 'Utils/helpers/validation';

interface SignUpFormValuesBase {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
  passwordConfirm: string;
}
type SignUpFormValues = Partial<SignUpFormValuesBase>;
type SubmittedSignUpFormValues = PartialBy<SignUpFormValuesBase, 'lastName'>;

const requiredValidation = getValidations(['required']);

const ROUTE_DATA = {
  url: AUTH_ROUTES.SIGN_IN,
  text: 'You already have an account?',
  title: 'Sign Up',
  linkText: 'Sign In',
};

function SignUpPage() {
  function handleSubmit(values: SignUpFormValues) {
    const formValues = values as SubmittedSignUpFormValues;
    console.log('formValues', formValues);
  }

  function renderInputs({
    control,
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
            registerOptions={requiredValidation}
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
          registerOptions={requiredValidation}
        />

        <Input
          name="email"
          label="Email"
          errors={errors}
          register={register}
          placeholder="Enter email"
          registerOptions={getValidations(['email'])}
        />

        <Wrapper>
          <Input
            name="password"
            type="password"
            label="Password"
            errors={errors}
            register={register}
            placeholder="Enter password"
            registerOptions={requiredValidation}
          />
          <WithFieldWatcher name={['password']} control={control}>
            {([password]) => {
              const registerOptions = getValidations([
                'required',
                { match: { value: password, text: 'Passwords not same' } },
              ]);

              return (
                <Input
                  name="passwordConfirm"
                  type="password"
                  label="Password Confirm"
                  errors={errors}
                  register={register}
                  placeholder="Confirm password"
                  registerOptions={registerOptions}
                />
              );
            }}
          </WithFieldWatcher>
        </Wrapper>
      </>
    );
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
      routeData={ROUTE_DATA}
      renderInputs={renderInputs}
    />
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0 20px;
`;

export default SignUpPage;
