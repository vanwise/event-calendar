import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'Utils/constants/config';
import { API_TAG_TYPES } from 'Utils/constants/store';

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: config.BASE_URL,
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: apiBaseQuery,
  tagTypes: Object.values(API_TAG_TYPES),
  endpoints: () => ({}),
});
