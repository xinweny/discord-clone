import { store } from '@app';

import authApi from './api';

export const checkUsernameAvailability = async (username: string) => {
  const result = store.dispatch(
    authApi.endpoints.checkUsernameAvailability
      .initiate(username)
  );

  const isAvailable = await result.unwrap();

  result.unsubscribe();

  return isAvailable;
};