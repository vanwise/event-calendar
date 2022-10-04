import { api } from 'Store/api';

export const subscriptionsApi = api.injectEndpoints({
  endpoints: builder => ({
    createNotificationSubscription: builder.mutation<void, PushSubscription>({
      query: newSubscribe => ({
        url: '/subscriptions/notifications',
        method: 'POST',
        body: newSubscribe,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    removeAllNotificationSubscriptions: builder.mutation({
      query: () => ({
        url: '/subscriptions/notifications',
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
  }),
});

export const { useCreateNotificationSubscriptionMutation } = subscriptionsApi;
