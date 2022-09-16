import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import eventsFilterReducer from './features/eventsFilter/eventsFilter.slice';
import apiErrorLogger from './middleware/apiErrorLogger';

const RESET_STORE_ACTION_TYPE = 'resetStore';

const appReducers = {
  eventsFilter: eventsFilterReducer,
  [api.reducerPath]: api.reducer,
};

function reducer(state: any, action: AnyAction) {
  if (action.type === RESET_STORE_ACTION_TYPE) {
    state = undefined;
  }
  return combineReducers(appReducers)(state, action);
}

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware, apiErrorLogger),
});

export function resetReduxStore() {
  store.dispatch({ type: RESET_STORE_ACTION_TYPE });
}
