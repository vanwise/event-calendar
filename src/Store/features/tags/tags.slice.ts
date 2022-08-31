import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { api } from 'Store/api';
import { EventTag } from 'Types/api';

export const tagsAdapter = createEntityAdapter<EventTag>();
export const tagsInitialState = tagsAdapter.getInitialState();

export const tagsApi = api.injectEndpoints({
  endpoints: builder => ({
    getTags: builder.query<EntityState<EventTag>, void>({
      query: () => '/tags',
      transformResponse(response: EventTag[]) {
        return tagsAdapter.setAll(tagsInitialState, response);
      },
    }),
  }),
});

export const { useGetTagsQuery } = tagsApi;
