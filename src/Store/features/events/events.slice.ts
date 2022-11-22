import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { api } from 'Store/api';
import { Event } from 'Types/api';

type RawEvent = Omit<
  Event,
  'id' | 'createdAt' | 'updatedAt' | 'notificationId'
>;
interface NewEvent extends PartialBy<RawEvent, 'description'> {
  hasReminder?: boolean;
}
interface UpdatedEvent {
  id: string;
  updatedFields: Partial<NewEvent>;
}

export const eventsAdapter = createEntityAdapter<Event>();
export const eventsInitialState = eventsAdapter.getInitialState();

export const eventsApi = api.injectEndpoints({
  endpoints: builder => ({
    getEvents: builder.query<EntityState<Event>, void>({
      query: () => '/events',
      providesTags: result => {
        const tags =
          result?.ids.map(id => ({ type: 'Event' as const, id })) || [];
        return [...tags, 'Event'];
      },
      transformResponse(response: Event[]) {
        return eventsAdapter.setAll(eventsInitialState, response);
      },
    }),
    addEvent: builder.mutation<Event, NewEvent>({
      query: newEvent => ({
        url: '/events',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Event']),
    }),
    updateEvent: builder.mutation<Event, UpdatedEvent>({
      query: ({ id, updatedFields }) => ({
        url: `/events/${id}`,
        method: 'PATCH',
        body: updatedFields,
      }),
      invalidatesTags: (_, error, arg) =>
        error ? [] : [{ type: 'Event', id: arg.id }],
    }),
    deleteEvent: builder.mutation<Event, string>({
      query: id => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Event']),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
