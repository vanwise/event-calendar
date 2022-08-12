import { RootState } from 'Types/store';

export const selectFilterDateRange = (state: RootState) =>
  state.eventsFilter.dateRange;
