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

  const { data: lastTimestamps } = useGetLastTimestampsQuery({ userId, type: 'dm' });
  const { data: readTimestamps } = useGetReadStatusesQuery(userId);

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