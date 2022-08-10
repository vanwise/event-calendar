import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { eventsFilterReducer } from './features';

export const store = configureStore({
  reducer: {
    eventsFilter: eventsFilterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
