import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { StorageService, ToastService } from 'Services';
import { config } from 'Utils/constants/config';
import { UNAUTHORIZED_CODE } from 'Utils/constants/http';
import { API_TAG_TYPES } from 'Utils/constants/store';
import { logOut } from 'Utils/helpers/auth';
import { AccessToken } from './features/auth/auth.slice';

enum QUERY_ERROR {
  FETCH_ERROR = 'FETCH_ERROR',
}
export interface ApiErrors {
  message?: string;
  messages?: Record<string, string | string[]>;
}

function handleRequestError(
  error: FetchBaseQueryError,
  repeatApiRequest: () => void,
) {
  async function handleUnauthorizedError() {
    const tokenResponse = await fetch(`${config.BASE_API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    const { accessToken }: AccessToken = await tokenResponse.json();

    if (accessToken) {
      StorageService.set('access-token', accessToken);
      repeatApiRequest();
    } else {
      logOut();
    }
  }

  function getErrorMessage() {
    if (error.status === QUERY_ERROR.FETCH_ERROR) {
      return 'Failed to fetch. Check connection';
    }

    function getMessage({ message, messages }: ApiErrors = {}) {
      if (messages) {
        return Object.keys(messages).reduce((acc, fieldKey) => {
          const field = messages[fieldKey];
          return acc + '\n' + `${fieldKey}: ${field}`;
        }, '');
      }
      return message || `Errors status: ${error.status}`;
    }

    return getMessage(error.data as ApiErrors);
  }

  if (error.status === UNAUTHORIZED_CODE) {
    handleUnauthorizedError();
  } else {
    ToastService.error(getErrorMessage());
  }
}

const getApiBaseQuery: BaseQueryFn = async (...args) => {
  const baseQuery = await fetchBaseQuery({
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
  let result = await baseQuery(...args);

  if (result.error) {
    const repeatApiRequest = async () => (result = await baseQuery(...args));
    handleRequestError(result.error, repeatApiRequest);
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: getApiBaseQuery,
  tagTypes: Object.values(API_TAG_TYPES),
  endpoints: () => ({}),
});
