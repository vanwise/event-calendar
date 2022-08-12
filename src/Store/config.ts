import { api } from './api';
import { configureStore } from '@reduxjs/toolkit';
import eventsFilterReducer from './features/eventsFilter/eventsFilter.slice';

export const store = configureStore({
  reducer: {
    eventsFilter: eventsFilterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});
