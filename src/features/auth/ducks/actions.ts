import { createAsyncThunk } from '@reduxjs/toolkit';

import { dcApi, dcApiWithCreds } from '@app/api';

const PREFIX = 'auth';

const login = createAsyncThunk(`${PREFIX}/login`, async ({ email, password }, thunkApi) => {
  try {
    const res = await dcApi.post('/auth/login', { email, password });
    console.log(res);

    return res.data;
  } catch (err) {
    thunkApi.rejectWithValue(err.response.message);
  }
});

const refreshAccessToken = createAsyncThunk(`${PREFIX}/refresh`, async () => {
  const res = await dcApiWithCreds.post('/auth/refresh');

  return res.data;
});

export {
  login,
  refreshAccessToken,
};