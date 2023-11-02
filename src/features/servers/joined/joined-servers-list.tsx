import { JoinedServerCard } from './joined-server-card';
import { ServerNewMessageNotification } from '@features/notifications/message';

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

  if (!servers.isSuccess) return null;

  return (
    <div className={styles.container}>
      {servers.data?.map(
        server => <div key={server._id}>
          {(lastTimestamps && readTimestamps) && <ServerNewMessageNotification
            channelIds={server.channels.map(c => c._id)}
            lastTimestamps={lastTimestamps}
            readTimestamps={readTimestamps}
          />}
          <JoinedServerCard server={server} />
        </div>
      )}
    </div>
  );
}