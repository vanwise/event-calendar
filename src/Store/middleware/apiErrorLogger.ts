import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { StorageService, ToastService } from 'Services';
import { api, ApiErrors } from 'Store/api';
import { AccessToken } from 'Store/features/auth/auth.slice';
import { config } from 'Utils/constants/config';
import { FORBIDDEN_CODE, UNAUTHORIZED_CODE } from 'Utils/constants/http';
import { logOut } from 'Utils/helpers/auth';

interface RTKQueryRejectAction {
  payload: FetchBaseQueryError;
  meta: {
    arg: {
      type: 'mutation' | 'query';
      endpointName: string;
      originalArgs: any;
      track: boolean;
      fixedCacheKey?: string;
    };
  };
}
enum QUERY_ERROR {
  FETCH_ERROR = 'FETCH_ERROR',
}

let refreshTokenPromise: Promise<void> | undefined;

function handleUnauthorizedError(
  repeatApiRequest: () => void,
  isMutation: boolean,
) {
  async function updateTokenOrLogoutWithError(response: Response) {
    const { accessToken }: AccessToken = await response.json();

    if (!accessToken) {
      logOut();
      throw new Error('Unauthorized user');
    }

    StorageService.set('access-token', accessToken);

    if (isMutation) {
      ToastService.error('Connection problems. Try again');
    }
  }

  if (!refreshTokenPromise) {
    refreshTokenPromise = fetch(`${config.BASE_API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(updateTokenOrLogoutWithError)
      .finally(() => (refreshTokenPromise = undefined));
  }

  refreshTokenPromise.then(() => {
    if (!isMutation) {
      repeatApiRequest();
    }
  });
}

function generateFieldsErrorMessage(
  messages: Exclude<ApiErrors['messages'], undefined>,
) {
  return Object.keys(messages).reduce((acc, fieldKey, index) => {
    const field = messages[fieldKey];
    const space = index === 0 ? '' : '\n';

    return acc + space + `${fieldKey}: ${field}`;
  }, '');
}

function handleRequestError(
  { status: errorStatus, data }: FetchBaseQueryError,
  repeatApiRequest: () => void,
  isMutation: boolean,
) {
  const { message, messages } = (data || {}) as ApiErrors;
  const storedAccessToken = StorageService.get('access-token');

  function getErrorMessage() {
    if (errorStatus === QUERY_ERROR.FETCH_ERROR) {
      return 'Failed to fetch. Check connection';
    } else if (messages) {
      return generateFieldsErrorMessage(messages);
    }

    return message || `Errors status: ${errorStatus}`;
  }

  if (errorStatus === UNAUTHORIZED_CODE) {
    return handleUnauthorizedError(repeatApiRequest, isMutation);
  } else if (errorStatus === FORBIDDEN_CODE && storedAccessToken) {
    logOut();
  }

  ToastService.error(getErrorMessage());
}

const apiErrorLogger: Middleware =
  ({ dispatch }: MiddlewareAPI) =>
  next =>
  action => {
    if (isRejectedWithValue(action)) {
      const {
        payload: error,
        meta: {
          arg: { endpointName, originalArgs, type: queryType },
        },
      } = action as RTKQueryRejectAction;

      const isMutation = queryType === 'mutation';
      const callRejectedApi = (api.endpoints as any)[endpointName]?.initiate;

      if (callRejectedApi) {
        const repeatRejectedRequest = () =>
          dispatch(callRejectedApi(originalArgs));
        handleRequestError(error, repeatRejectedRequest, isMutation);
      }
    }

    return next(action);
  };

export default apiErrorLogger;
