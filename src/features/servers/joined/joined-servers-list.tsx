import { JoinedServerLink } from '.';
import { ServerNewMessageNotification } from '@features/notifications/message';

import {
  useGetLastTimestampsQuery,
  useGetReadStatusesQuery,
} from '@features/notifications/api';
import { useGetJoinedServersQuery } from '../api';

type JoinedServersListProps = {
  userId: string;
};

export function JoinedServersList({ userId }: JoinedServersListProps) {
  const servers = useGetJoinedServersQuery(userId);

  const { data: lastTimestamps } = useGetLastTimestampsQuery(userId);
  const { data: readTimestamps } = useGetReadStatusesQuery(userId);

  if (!servers.isSuccess) return null;

  return (
    <ul>
      {servers.data?.map(
        server => <div key={server._id}>
          {(lastTimestamps && readTimestamps) && <ServerNewMessageNotification
            channelIds={server.channels.map(c => c._id)}
            lastTimestamps={lastTimestamps}
            readTimestamps={readTimestamps}
          />}
          <JoinedServerLink server={server} />
        </div>
      )}
    </ul>
  );
}