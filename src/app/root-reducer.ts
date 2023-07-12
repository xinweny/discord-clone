import { combineReducers } from '@reduxjs/toolkit';

import { dcApi } from '@services/api';

const rootReducer = combineReducers({
  [dcApi.reducerPath]: dcApi.reducer,
});

export default rootReducer;