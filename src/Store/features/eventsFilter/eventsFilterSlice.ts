import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultSelectedDates } from 'Components/forms/DateRangePicker/DateRangePicker';
import { RootState } from 'Store/config';

interface EventsFilterStore {
  dateRange: DefaultSelectedDates;
}

const initialState: EventsFilterStore = {
  dateRange: {
    from: null,
    to: null,
  },
};

export const eventsFilterSlice = createSlice({
  name: 'eventsFilter',
  initialState,
  reducers: {
    setDateRange(state, action: PayloadAction<DefaultSelectedDates>) {
      state.dateRange = action.payload;
    },
  },
});

export const selectFilterDateRange = (state: RootState) =>
  state.eventsFilter.dateRange;

export const { setDateRange } = eventsFilterSlice.actions;

export default eventsFilterSlice.reducer;
