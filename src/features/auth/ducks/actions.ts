import { FieldValues } from 'react-hook-form';

import { createAsyncThunkFromApi } from '@common/middleware';

import { dcApi } from '@app/api';

type AuthData = {
  userId: string;
  accessToken: string;
};

const login = createAsyncThunkFromApi<AuthData, FieldValues>(
  'auth/login',
  async ({ email, password }) => await dcApi.post('/auth/login', { email, password }, { withCredentials: true })
);

const refreshAccessToken = createAsyncThunkFromApi<AuthData, void>(
  'auth/refresh',
  async () => await dcApi.post('/auth/refresh', undefined, { withCredentials: true })
);

export {
  login,
  refreshAccessToken,
};