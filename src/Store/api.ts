import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { ToastService } from 'Services';
import { QueryResponse } from 'Types/libs';
import { config } from 'Utils/constants/config';
import { API_TAG_TYPES } from 'Utils/constants/store';

enum QUERY_ERROR {
  FETCH_ERROR = 'FETCH_ERROR',
}

function getErrorMessage(error: FetchBaseQueryError, details: string) {
  if (error.status === QUERY_ERROR.FETCH_ERROR) {
    return `Failed to fetch ${details}. Check connection`;
  } else if ('error' in error) {
    return `${error.error} - ${details}`;
  } else if (error.status === 404) {
    return `Resource ${details} not found`;
  } else {
    return `Error code ${error.status} for ${details} requext`;
  }
}

const { BASE_URL = '' } = config;

const getApiBaseQuery: BaseQueryFn = (...args) => {
  const queryPromise = Promise.resolve(
    fetchBaseQuery({
      baseUrl: BASE_URL,
    })(...args),
  );

  function handleError(response: QueryResponse) {
    const { error, meta } = response;

    if (error && meta) {
      const details = meta.request.url.replace(BASE_URL, '').slice(1);
      const errorMessage = getErrorMessage(
        error,
        `"${meta.request.method}: ${details}"`,
      );

      ToastService.error(errorMessage);
    }

    return response;
  }

  return queryPromise.then(handleError);
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: getApiBaseQuery,
  tagTypes: Object.values(API_TAG_TYPES),
  endpoints: () => ({}),
});
