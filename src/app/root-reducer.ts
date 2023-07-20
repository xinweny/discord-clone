import { combineReducers } from '@reduxjs/toolkit';

import api from '@services/api';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export default rootReducer;