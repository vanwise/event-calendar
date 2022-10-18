import { api } from 'Store/api';
import { User } from 'Types/api';

export type UpdatedUser = Partial<
  Pick<User, 'firstName' | 'lastName' | 'email'>
>;
export interface ChangePasswordData {
  newPassword: string;
  currentPassword: string;
}

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<User, UpdatedUser>({
      query: updatedFields => ({
        url: '/users',
        method: 'PATCH',
        body: updatedFields,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    changePassword: builder.mutation<string, ChangePasswordData>({
      query: changePasswordData => ({
        url: '/users/change-password',
        method: 'PATCH',
        body: changePasswordData,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} = usersApi;
