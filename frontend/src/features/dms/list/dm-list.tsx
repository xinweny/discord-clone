import { useEffect, useState } from 'react';

import { DMData } from '../types';

import { useGetUserData } from '@features/auth/hooks';

import {
  useGetLastTimestampsQuery,
  useGetReadStatusesQuery,
} from '@features/notifications/api';

import { useGetDmsQuery } from '../api';

import { DmCard } from './dm-card';

export function DmList() {
  const { user } = useGetUserData();
  const userId = user.data!.id;

  const [sortedDms, setSortedDms] = useState<DMData[]>([]);

  const { data: dms } = useGetDmsQuery(userId);

  const { data: lastTimestamps } = useGetLastTimestampsQuery({ userId, type: 'dm' });
  const { data: readStatuses } = useGetReadStatusesQuery(userId);

  useEffect(() => {
    if (!dms || !lastTimestamps) return;

    setSortedDms([...dms].sort((a, b) => {
      const aTime = lastTimestamps[a._id]
        ? new Date(lastTimestamps[a._id]).getTime()
        : 0;
      const bTime = lastTimestamps[b._id]
        ? new Date(lastTimestamps[b._id]).getTime()
        : 0;

      return bTime - aTime;
    }))

  }, [lastTimestamps, dms]);

  if (!dms || dms.length === 0) return null;

  return (
    <div>
      {sortedDms.map(dm => <DmCard
        key={dm._id}
        dm={dm}
        userId={userId}
      />)}
    </div>
  );
}