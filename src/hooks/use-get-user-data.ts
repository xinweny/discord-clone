import { useRefreshTokenQuery } from '@features/auth/api';
import { useGetUserQuery } from '@features/users/api';

export const useGetUserData = () => {
  const auth = useRefreshTokenQuery();

  const user = useGetUserQuery(auth.data!.userId);

  return { auth, user };
};