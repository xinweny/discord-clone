import { createSlice } from '@reduxjs/toolkit';

import { ApiErrorResponse } from '@common/types';

import { localStorageService } from '@common/services';
import { login, refreshAccessToken } from './actions';

interface AuthState {
  userId: string | null;
  token: string | null;
  isPending: boolean;
  error?: ApiErrorResponse | null;
}

const initialState: AuthState = {
  userId: null,
  token: null,
  isPending: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isPending = false;

        const { userId, accessToken } = action.payload;

        state.userId = userId;
        localStorageService.set('userId', state.userId);

        state.token = accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false;
        state.error = action.payload;
        console.log(state.error);
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