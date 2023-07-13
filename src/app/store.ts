import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root-reducer';

import api from '@services/api';

import { socketMiddleware } from '@middlewares';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat([
        api.middleware,
        socketMiddleware,
      ])
  ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store };