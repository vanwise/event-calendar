import { SubmittedSignInFormValues } from 'Pages/auth/SignIn/SignIn';
import { SubmittedSignUpFormValues } from 'Pages/auth/SignUp/SignUp';
import { api } from 'Store/api';
import { saveTokenToStorage } from './auth.utils';

export interface AccessToken {
  accessToken: string;
}
type UserForRegistration = Omit<SubmittedSignUpFormValues, 'passwordConfirm'>;

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    logIn: builder.mutation<AccessToken, SubmittedSignInFormValues>({
      query: logInData => ({
        url: '/auth/login',
        method: 'POST',
        body: logInData,
      }),
      onQueryStarted(_, { queryFulfilled }) {
        saveTokenToStorage(queryFulfilled);
      },
    }),
    registerUser: builder.mutation<AccessToken, UserForRegistration>({
      query: newUser => ({
        url: '/auth/registration',
        method: 'POST',
        body: newUser,
      }),
      onQueryStarted(_, { queryFulfilled }) {
        saveTokenToStorage(queryFulfilled);
      },
    }),
  }),
});

export const { useLogInMutation, useRegisterUserMutation } = authApi;
