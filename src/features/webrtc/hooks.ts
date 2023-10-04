import { useState } from 'react';

import { useLazyGetLivekitTokenQuery } from './api';
import { useGetUserData } from '@features/auth/hooks';

export const useLivekit = () => {
  const [lkToken, setLkToken] = useState<string | undefined>();

  const { user } = useGetUserData();

  const [getLivekitToken] = useLazyGetLivekitTokenQuery();

  const connectToRoom = async (roomId: string) => {
    if (!user.data?._id) return undefined;

    const token = await getLivekitToken({
      roomId,
      userId: user.data._id,
    }).unwrap();

    setLkToken(token);
  };

  const notifyDisconnection = () => {
    setLkToken(undefined);
  };

  const isOnCall = !!lkToken;

  return {
    lkToken,
    connectToRoom,
    notifyDisconnection,
    isOnCall,
  };
};