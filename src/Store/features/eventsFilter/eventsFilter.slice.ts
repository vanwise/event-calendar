import { createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { DefaultSelectedDates } from 'Components/inputs/DatePicker/DatePicker.types';
import { TimeService } from 'Services';

interface EventsFilterStore {
  activeDate: Nullable<string>;
  dateRange: DefaultSelectedDates;
  activeEventId: Nullable<EntityId>;
  eventsLastScrollValue: Nullable<number>;
}

const initialState: EventsFilterStore = {
  eventsLastScrollValue: null,
  activeEventId: null,
  activeDate: null,
  dateRange: {
    from: null,
    to: null,
  },
};

export const eventsFilterSlice = createSlice({
  name: 'eventsFilter',
  initialState,
  reducers: {
    changeDateRange(
      state,
      { payload: dateRange }: PayloadAction<DefaultSelectedDates>,
    ) {
      function setCorrectActiveDate() {
        const activeDate = TimeService.getDate(state.activeDate);
        const isActiveDateBetweenDateRange = activeDate.isBetween(
          dateRange.from,
          dateRange.to,
        );

        if (!dateRange.from && !dateRange.to) {
          state.activeDate = null;
        } else if (!state.activeDate || !isActiveDateBetweenDateRange) {
          state.activeDate = dateRange.from || dateRange.to;
        }
      }

      if (!dateRange.from && !dateRange.to) {
        state.activeEventId = null;
      }

      state.dateRange = dateRange;
      setCorrectActiveDate();
    },
    showPrevActiveDate(state) {
      if (state.activeDate && state.dateRange.from) {
        const currentActiveDate = TimeService.getDate(state.activeDate);
        const dateFrom = TimeService.getDate(state.dateRange.from);
        const prevActiveDate = currentActiveDate.subtract(1, 'days');

        if (dateFrom.isSameOrBefore(prevActiveDate)) {
          state.activeDate = prevActiveDate.toISOString();
        }
      }
    },
    showNextActiveDate(state) {
      if (state.activeDate && state.dateRange.to) {
        const currentActiveDate = TimeService.getDate(state.activeDate);
        const dateTo = TimeService.getDate(state.dateRange.to);
        const nextActiveDate = currentActiveDate.add(1, 'days');

        if (dateTo.isSameOrAfter(nextActiveDate)) {
          state.activeDate = nextActiveDate.toISOString();
        }
      }
    },
    changeActiveEventId(
      state,
      { payload: eventId }: PayloadAction<Nullable<EntityId>>,
    ) {
      state.activeEventId = eventId;
    },
    changeEventsLastScrollValue(
      state,
      { payload: scrollValue }: PayloadAction<Nullable<number>>,
    ) {
      state.eventsLastScrollValue = scrollValue;
    },
  },
});

export const {
  changeDateRange,
  showPrevActiveDate,
  showNextActiveDate,
  changeActiveEventId,
  changeEventsLastScrollValue,
} = eventsFilterSlice.actions;

export default eventsFilterSlice.reducer;
