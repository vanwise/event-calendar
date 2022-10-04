import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { api } from 'Store/api';
import { UserNotification } from 'Types/api';

export const notificationsAdapter = createEntityAdapter<UserNotification>();
export const notificationsInitialState = notificationsAdapter.getInitialState();

export const notificationsApi = api.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<EntityState<UserNotification>, void>({
      query: () => 'notifications',
      transformResponse: (response: []) => {
        return notificationsAdapter.setAll(notificationsInitialState, response);
      },
      providesTags: result => {
        const notifications =
          result?.ids.map(id => ({
            type: 'Notification' as const,
            id,
          })) || [];
        return [...notifications, 'Notification'];
      },
    }),
    readNotification: builder.mutation<void, string>({
      query: id => ({
        url: `notifications/read/${id}`,
        method: 'POST',
      }),
      invalidatesTags: (_, error, arg) =>
        error ? [] : [{ type: 'Notification', id: arg }],
    }),
    readAllNotifications: builder.mutation<void, void>({
      query: () => ({
        url: `notifications/read`,
        method: 'POST',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Notification']),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useReadNotificationMutation,
  useReadAllNotificationsMutation,
} = notificationsApi;
