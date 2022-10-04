import { api } from 'Store/api';
import { User } from 'Types/api';

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: '/users',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery } = usersApi;
