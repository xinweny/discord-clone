import { useGetLivekitTokenQuery } from './api';
import { useGetUserData } from '@features/auth/hooks';

export const useGetLivekitToken = (roomId: string): string | undefined => {
  const { user } = useGetUserData();

  const { data: token } = useGetLivekitTokenQuery({
    roomId,
    userId: user.data!._id,
  }, { skip: user.data?._id ? false : true })

  return token;
};