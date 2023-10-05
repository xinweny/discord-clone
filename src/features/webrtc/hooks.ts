import { useState } from 'react';

import type { CallData, WebRTCContextData } from './types';

import { useLazyGetLivekitTokenQuery } from './api';
import { useGetUserData } from '@features/auth/hooks';

export const useLivekit = (): WebRTCContextData => {
  const initialData = {
    token: undefined,
    roomId: undefined,
    serverId: undefined,
  };

  const [data, setData] = useState<CallData>(initialData);

  const { user } = useGetUserData();

  const [getLivekitToken] = useLazyGetLivekitTokenQuery();

  const connectToRoom = async (roomId: string, serverId?: string) => {
    if (!user.data?._id) return undefined;

    const token = await getLivekitToken({
      roomId,
      userId: user.data._id,
    }).unwrap();

    setData({
      token,
      roomId,
      serverId,
    });
  };

  const notifyDisconnection = () => {
    setData(initialData);
  };

  const isOnCall = !!data.token;

  return {
    data,
    connectToRoom,
    notifyDisconnection,
    isOnCall,
  };
};