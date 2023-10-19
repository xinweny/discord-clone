import { useEffect, useState } from 'react';

import type { UserData } from '@features/users/types';

import { useSocketRoomJoin } from '@hooks';

import { useGetJoinedServersQuery } from '@features/servers/api';
import { useGetDmsQuery } from '@features/dms/api';

export const useJoinAllRooms = (user: UserData | undefined) => {
  const [roomIds, setRoomIds] = useState<string[]>([]);

  const userId = user?._id || '';
  const skip = { skip: !user }

  const { data: servers } = useGetJoinedServersQuery(userId, skip);
  const { data: dms } = useGetDmsQuery(userId, skip);

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
    ])
  }, [servers, dms]);

  useSocketRoomJoin(roomIds);
};