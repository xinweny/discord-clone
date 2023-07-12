import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root-reducer';

import { dcApi } from '@services/api';

import { socketMiddleware } from '@features/websocket';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat([
        dcApi.middleware,
        socketMiddleware,
      ])
  ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store };