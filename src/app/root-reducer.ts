import { combineReducers } from '@reduxjs/toolkit';

import api, { cloudinaryApi } from '@services/api';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
});

export default rootReducer;