import { createSlice } from '@reduxjs/toolkit';

import { localStorageService } from '@common/services';
import { login, refreshAccessToken } from './actions';

const initialState = {
  userId: null,
  token: null,
  isPending: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isPending = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isPending = false;

        const { userId, accessToken } = action.payload;

        state.userId = userId;
        localStorageService.set('userId', state.userId);

        state.token = accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.error.message!;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.isPending = false;

        const { userId, accessToken } = action.payload;

        state.userId = userId;
        state.token = accessToken;
      })

  }
});

export const authReducer = authSlice.reducer;