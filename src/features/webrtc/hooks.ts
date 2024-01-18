import { useState, useEffect, useContext } from 'react';
import { type Participant } from 'livekit-client';
import { useParticipants } from '@livekit/components-react';

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
import { useGetServerMembersQuery } from '@features/members/api';

export const useLivekit = (): LivekitContextData => {
  const initialData = {
    token: undefined,
    roomId: undefined,
    serverId: undefined,
    initVideo: false,
  };

  const [data, setData] = useState<CallData>(initialData);
  const [roomData, setRoomData] = useState<RoomData | undefined>();
  const [isMuted, setIsMuted] = useState<boolean>(false);

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
        const dm = await getDm({ dmId: roomId, userId: user.data!._id }).unwrap();
        
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

  const connectToRoom = async (
    roomId: string,
    serverId?: string,
    options = { withVideo: false }) => {
    if (!user.data?._id) return undefined;

    const token = await getLivekitToken({
      roomId,
      userId: user.data._id,
    }).unwrap();

    setData({
      token,
      roomId,
      serverId,
      initVideo: options.withVideo,
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
    isMuted,
    setIsMuted,
  };
};

export const useLivekitContext = () => {
  const livekit = useContext(LivekitContext);

  return livekit;
};

export const useServerMemberParticipant = (participant: Participant, serverId: string) => {
  const { data: members } = useGetServerMembersQuery(serverId);

  if (!members || members.length === 0) return null;

  const member = members.find(member => member.userId === participant.identity);

  return member || null;
};

export const useVideoMode = () => {
  const participants = useParticipants();

  const [videoMode, setVideoMode] = useState<boolean>(false);

  useEffect(() => {
    setVideoMode(!!participants.find(participant => participant.isCameraEnabled || participant.isScreenShareEnabled));
  }, [participants]);

  return videoMode;
};