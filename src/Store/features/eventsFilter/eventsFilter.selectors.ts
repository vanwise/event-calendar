import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Types/libs';

export const selectFilterDateRange = (state: RootState) =>
  state.eventsFilter.dateRange;

export const selectFilterActiveDate = (state: RootState) =>
  state.eventsFilter.activeDate;

export const selectActiveEventId = (state: RootState) =>
  state.eventsFilter.activeEventId;

export const selectEventsLastScrollValue = (state: RootState) =>
  state.eventsFilter.eventsLastScrollValue;

export const selectHasBothDateRange = createSelector(
  selectFilterDateRange,
  dateRange => Boolean(dateRange.from && dateRange.to),
);
