import { useState, useEffect, useContext } from 'react';

import { LivekitContext } from './context';

import type {
  RoomData,
  CallData,
  LivekitContextData,
} from './types';

import { getDmInfo } from '@features/dms/utils';

import { useGetUserData } from '@features/auth/hooks';

import { useLazyGetLivekitTokenQuery } from './api';

import { useLazyGetServerQuery } from '@features/servers/api';
import { useLazyGetChannelsQuery } from '@features/channels/api';
import { useLazyGetDmQuery } from '@features/dms/api';

export const useLivekit = (): LivekitContextData => {
  const initialData = {
    token: undefined,
    roomId: undefined,
    serverId: undefined,
  };

  const [data, setData] = useState<CallData>(initialData);
  const [roomData, setRoomData] = useState<RoomData | undefined>();

  const { user } = useGetUserData();

  const [getServer] = useLazyGetServerQuery();
  const [getChannels] = useLazyGetChannelsQuery();
  const [getDm] = useLazyGetDmQuery();

  const [getLivekitToken] = useLazyGetLivekitTokenQuery();

  useEffect(() => {
    const { token, roomId, serverId } = data;

    const fetchRoomData = async () => {
      if (serverId && roomId) {
        const [server, channels] = await Promise.all([
          getServer(serverId).unwrap(),
          getChannels(serverId).unwrap(),
        ]);

        const channel = channels.find(channel => channel._id === roomId);

        if (server && channel) setRoomData({
          url: `/channels/${serverId}/${roomId}`,
          name: channel.name,
          serverName: server.name,
          avatarUrl: server.avatarUrl,
        });
      } else if (roomId) {
        const dm = await getDm(roomId).unwrap();
        
        if (dm) {
          const { name, avatarUrl } = getDmInfo(dm, user.data!._id);

          setRoomData({
            url: `/channels/@me/${roomId}`,
            name,
            serverName: undefined,
            avatarUrl,
          });
        }
      }
    };

    if (token) {
      fetchRoomData();
    } else {
      setRoomData(undefined);
    }
  }, [data]);

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

  const isCurrentRoom = (rId: string) => data.roomId === rId;

  return {
    data,
    roomData,
    connectToRoom,
    notifyDisconnection,
    isOnCall,
    isCurrentRoom,
  };
};

export const useLivekitContext = () => {
  const livekit = useContext(LivekitContext);

  return livekit;
};