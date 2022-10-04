import { createSelector } from '@reduxjs/toolkit';
import { TimeService } from 'Services';
import { RootState } from 'Types/libs';
import {
  selectFilterActiveDate,
  selectFilterDateRange,
  selectHasBothDateRange,
} from '../eventsFilter/eventsFilter.selectors';
import { eventsAdapter, eventsApi, eventsInitialState } from './events.slice';

const selectEventsResult = eventsApi.endpoints.getEvents.select();

const selectEventsData = createSelector(selectEventsResult, ({ data }) => data);

export const { selectIds: selectEventsIds, selectById: selectEventById } =
  eventsAdapter.getSelectors(
    (state: RootState) => selectEventsData(state) || eventsInitialState,
  );

export const selectEventsIdsByDateRange = createSelector(
  [selectEventsData, selectFilterDateRange, selectHasBothDateRange],
  (eventsData, dateRange, hasBothDateRange) => {
    const filteredEventsIds = eventsData?.ids.filter(id => {
      const event = eventsData.entities[id];

      if (!event) return;
      const { startDateISO, endDateISO } = event;

      if (hasBothDateRange) {
        return TimeService.isOverlapped(
          { from: startDateISO, to: endDateISO },
          { from: dateRange.from, to: dateRange.to },
        );
      }

      return TimeService.isDateBetween(
        { from: startDateISO, to: endDateISO },
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
        const { startDateISO, endDateISO } = event;
        if (activeDate === endDateISO) return;

        return TimeService.isDateBetween(
          { from: startDateISO, to: endDateISO },
          activeDate,
        );
      }
    });
  },
);
