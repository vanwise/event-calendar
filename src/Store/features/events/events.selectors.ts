import { TimeService } from 'Services';
import { eventsAdapter, eventsApi, eventsInitialState } from './events.slice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'Types/store';
import { selectFilterDateRange } from '../eventsFilter/eventsFilter.selectors';

const selectEventsResult = eventsApi.endpoints.getEvents.select();

const selectEventsData = createSelector(
  selectEventsResult,
  events => events.data,
);

export const { selectIds: selectEventsIds, selectById: selectEventById } =
  eventsAdapter.getSelectors(
    (state: RootState) => selectEventsData(state) || eventsInitialState,
  );

export const selectEventsIdsByFilter = createSelector(
  [selectEventsData, selectFilterDateRange],
  (eventsData, dateRange) => {
    const filteredEventsIds = eventsData?.ids.filter(id => {
      const event = eventsData.entities[id];
      const eventStartDate = TimeService.getDate(event?.startDate);

      return eventStartDate.isBetween(dateRange.from, dateRange.to);
    });

    return filteredEventsIds || [];
  },
);
