import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { api } from 'Store/api';
import { Event } from 'Types/api';
import { API_TAG_TYPES } from 'Utils/constants/store';

type NewEvent = PartialBy<Omit<Event, 'id'>, 'description'>;
interface UpdatedEvent {
  id: string;
  updatedFields: Partial<NewEvent>;
}

export const eventsAdapter = createEntityAdapter<Event>();
export const eventsInitialState = eventsAdapter.getInitialState();

const { EVENT } = API_TAG_TYPES;

export const eventsApi = api.injectEndpoints({
  endpoints: builder => ({
    getEvents: builder.query<EntityState<Event>, void>({
      query: () => '/events',
      providesTags: result => {
        const tags = result?.ids.map(id => ({ type: EVENT, id }));
        return [EVENT, ...(tags || [])];
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
      invalidatesTags: [EVENT],
    }),
    updateEvent: builder.mutation<Event, UpdatedEvent>({
      query: ({ id, updatedFields }) => ({
        url: `/events/${id}`,
        method: 'PATCH',
        body: updatedFields,
      }),
      invalidatesTags: (_, __, arg) => [{ type: EVENT, id: arg.id }],
    }),
    deleteEvent: builder.mutation<Event, string>({
      query: id => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [EVENT],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
