import { createSelector } from '@reduxjs/toolkit';
import { TimeService } from 'Services';
import { Event } from 'Types/api';
import { RootState } from 'Types/libs';
import {
  selectFilterActiveDate,
  selectFilterDateRange,
  selectHasBothDateRange,
} from '../eventsFilter/eventsFilter.selectors';
import { eventsAdapter, eventsApi, eventsInitialState } from './events.slice';
import { getGroupedEvents } from './events.utils';

const selectEventsResult = eventsApi.endpoints.getEvents.select();

const selectEventsData = createSelector(selectEventsResult, ({ data }) => data);

export const {
  selectIds: selectEventsIds,
  selectById: selectEventById,
  selectAll: selecteAllEvents,
} = eventsAdapter.getSelectors(
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

export const selectGroupedEventsByActiveDate = createSelector(
  [selectEventsData, selectEventsIdsByDateRange, selectFilterActiveDate],
  (eventsData, eventsIdsByDateRange, activeDate) => {
    const filteredEvents = eventsIdsByDateRange.reduce((acc: Event[], id) => {
      const event = eventsData?.entities[id];

      if (event) {
        const { startDateISO, endDateISO } = event;
        if (activeDate === endDateISO) return acc;

        const isActiveDateBetweenEventDates = TimeService.isDateBetween(
          { from: startDateISO, to: endDateISO },
          activeDate,
        );

        if (isActiveDateBetweenEventDates) {
          acc.push(event);
        }
      }

      return acc;
    }, []);

    filteredEvents.sort((firstEvent, secondEvent) => {
      if (firstEvent.startDateISO === secondEvent.startDateISO) {
        return 0;
      }
      return firstEvent.startDateISO > secondEvent.startDateISO ? 1 : -1;
    });

    return getGroupedEvents(filteredEvents, activeDate);
  },
);
