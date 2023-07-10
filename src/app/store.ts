import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './root-reducer';
import { socketMiddleware } from '@features/websocket';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(socketMiddleware)
  ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store };