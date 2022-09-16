import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StorageService } from 'Services';
import { config } from 'Utils/constants/config';

export interface ApiErrors {
  message?: string;
  messages?: Record<string, string | string[]>;
}

const baseQuery = fetchBaseQuery({
  baseUrl: config.BASE_API_URL,
  credentials: 'include',
  prepareHeaders(headers) {
    const accesToken = StorageService.get('access-token');
    if (accesToken) {
      headers.set('Authorization', `Bearer ${accesToken}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Event'],
  endpoints: () => ({}),
});
