import { useEffect } from 'react';

import { socket } from '@app';

import { useRefreshTokenQuery } from '@features/auth/api';
import { useGetUserQuery } from '@features/users/api';

export const useConnect = () => {
  useEffect(() => {
    socket.connect();

    return () => { socket.disconnect() };
  }, []);

  return socket;
};

export const useGetUserData = () => {
  const auth = useRefreshTokenQuery();

  const user = useGetUserQuery(auth.data!.userId, { skip: !auth.data });

  return { auth, user };
};