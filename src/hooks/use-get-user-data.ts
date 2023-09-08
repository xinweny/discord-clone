import { useRefreshTokenQuery } from '@features/auth/api';
import { useGetUserSelfQuery } from '@features/users/api';

export const useGetUserData = () => {
  const auth = useRefreshTokenQuery();

  const user = useGetUserSelfQuery(auth.data!.userId);

  return { auth, user };
};