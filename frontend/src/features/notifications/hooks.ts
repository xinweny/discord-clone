import { useEffect, useState } from 'react';

import type { UserData } from '@features/users/types';

import { useSocketRoomJoin } from '@services/websocket/hooks';

import { useGetJoinedServersQuery } from '@features/servers/api';
import { useGetAllUserDmsQuery } from '@features/dms/api';
import { TimestampDict } from './types';

export const useJoinAllRooms = (user: UserData | undefined) => {
  const [roomIds, setRoomIds] = useState<string[]>([]);

  const userId = user?._id || '';
  const skip = { skip: !user }

  const { data: servers } = useGetJoinedServersQuery(userId, skip);
  const { data: dms } = useGetAllUserDmsQuery(userId, skip);

  useEffect(() => {
    const channelIds = servers
      ? servers.flatMap(server => server.channels.map(c => c._id))
      : [];
    const dmIds = dms
      ? dms.map(dm => dm._id)
      : [];

    setRoomIds([
      ...channelIds,
      ...dmIds,
    ]);
  }, [servers, dms]);

  useSocketRoomJoin(roomIds);

  return roomIds;
};

export const useHasNewMessage = (
  roomId: string | string[] | undefined,
  lastTimestamps: TimestampDict | undefined,
  readTimestamps: TimestampDict | undefined,
) => {
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(false);

  useEffect(() => {
    if (!roomId || !lastTimestamps || !readTimestamps) {
      setHasNewMessage(false);
      return;
    }

    for (const rId of (typeof roomId === 'string' ? [roomId] : roomId)) {
      const lastDate = lastTimestamps[rId]
        ? new Date(lastTimestamps[rId]).getTime()
        : undefined;
  
      if (!lastDate) continue;
  
      const readDate = readTimestamps[rId]
        ? new Date(readTimestamps[rId]).getTime()
        : undefined;
  
      if (!readDate || (lastDate > readDate)) {
        setHasNewMessage(true);
        return;
      }
    }

    setHasNewMessage(false);
  }, [roomId, lastTimestamps, readTimestamps]);

  return hasNewMessage;
}