import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '@features/auth/ducks/slice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;