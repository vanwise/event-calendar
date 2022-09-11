import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { PromiseWithKnownReason } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { QueryFulfilledRejectionReason } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { StorageService } from 'Services';
import { AccessToken } from './auth.slice';

interface SuccessedData {
  data: AccessToken;
}
type QueryFulfilled = PromiseWithKnownReason<
  SuccessedData,
  QueryFulfilledRejectionReason<BaseQueryFn>
>;

export function saveTokenToStorage(queryFulfilled: QueryFulfilled) {
  queryFulfilled.then(({ data: { accessToken } }) => {
    StorageService.set('access-token', accessToken);
  });
}
