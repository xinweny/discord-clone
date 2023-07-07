import { FieldValues } from 'react-hook-form';

import { createAsyncThunkFromApi } from '@common/middleware';

import { dcApi, dcApiWithCreds } from '@app/api';

type AuthData = {
  userId: string;
  accessToken: string;
};

const login = createAsyncThunkFromApi<AuthData, FieldValues>(
  'auth/login',
  async ({ email, password }) => await dcApi.post('/auth/login', { email, password })
);

const refreshAccessToken = createAsyncThunkFromApi<AuthData, void>(
  `auth/refresh`,
  async () => await dcApiWithCreds.post('/auth/refresh')
);

export {
  login,
  refreshAccessToken,
};