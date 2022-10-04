import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Types/libs';
import {
  notificationsAdapter,
  notificationsApi,
  notificationsInitialState,
} from './notifications.slice';

const selectEventsResult = notificationsApi.endpoints.getNotifications.select();

const selectEventsData = createSelector(selectEventsResult, ({ data }) => data);

export const {
  selectById: selectNotificationById,
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors(
  (state: RootState) => selectEventsData(state) || notificationsInitialState,
);

export const hasUnreadedNotifications = createSelector(
  selectAllNotifications,
  notifications => notifications.some(({ isRead }) => !isRead),
);
