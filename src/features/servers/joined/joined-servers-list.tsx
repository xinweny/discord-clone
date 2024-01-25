import { useEffect } from 'react';

import { MemberStatusEvent } from '@features/members/types';

import { emitEvents } from '@services/websocket';

import { JoinedServerCard } from './joined-server-card';

import {
  useGetLastTimestampsQuery,
  useGetReadStatusesQuery,
} from '@features/notifications/api';
import { useGetJoinedServersQuery } from '../api';

import styles from './joined-servers-list.module.scss';

type JoinedServersListProps = {
  userId: string;
};

export function JoinedServersList({ userId }: JoinedServersListProps) {
  const servers = useGetJoinedServersQuery(userId);

  const { data: lastTimestamps } = useGetLastTimestampsQuery(userId);
  const { data: readTimestamps } = useGetReadStatusesQuery(userId);

  // Notify offline status for each server the user is a member of
  useEffect(() => {
    return () => {
      if (servers.data && servers.data.length > 0) {
        const serverIds = servers.data.map(server => server._id);

        emitEvents({
          [MemberStatusEvent.Update]: {
            userId,
            serverIds,
            status: false,
          },
        });
      }
    };
  }, [servers.data]);

  if (!servers.isSuccess) return null;

  return (
    <div className={styles.container}>
      {servers.data?.map(
        server => (
          <JoinedServerCard
            key={server._id}
            server={server}
            lastTimestamps={lastTimestamps}
            readTimestamps={readTimestamps}
          />
        )
      )}
    </div>
  );
}