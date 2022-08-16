import { TimeService } from 'Services';
import { eventsAdapter, eventsApi, eventsInitialState } from './events.slice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Types/store';
import {
  selectFilterDateRange,
  selectFilterActiveDate,
  selectHasBothDateRange,
} from '../eventsFilter/eventsFilter.selectors';

const selectEventsResult = eventsApi.endpoints.getEvents.select();

const selectEventsData = createSelector(
  selectEventsResult,
  events => events.data,
);

export const { selectIds: selectEventsIds, selectById: selectEventById } =
  eventsAdapter.getSelectors(
    (state: RootState) => selectEventsData(state) || eventsInitialState,
  );

export const selectEventsIdsByDateRange = createSelector(
  [selectEventsData, selectFilterDateRange, selectHasBothDateRange],
  (eventsData, dateRange, hasBothDateRange) => {
    const filteredEventsIds = eventsData?.ids.filter(id => {
      const event = eventsData.entities[id];

      if (hasBothDateRange) {
        return TimeService.isOverlapped(
          { from: event?.startDateISO, to: event?.endDateISO },
          { from: dateRange.from, to: dateRange.to },
        );
      }

      return TimeService.isDateBetween(
        { from: event?.startDateISO, to: event?.endDateISO },
        dateRange.from || dateRange.to,
      );
    });

    return filteredEventsIds || [];
  },
);

export const selectEventsIdsByActiveDate = createSelector(
  [selectEventsData, selectEventsIdsByDateRange, selectFilterActiveDate],
  (eventsData, eventsIdsByDateRange, activeDate) => {
    return eventsIdsByDateRange.filter(id => {
      const event = eventsData?.entities[id];

      if (event) {
        return TimeService.isDateBetween(
          { from: event.startDateISO, to: event.endDateISO },
          activeDate,
        );
      }
    });
  },
);
