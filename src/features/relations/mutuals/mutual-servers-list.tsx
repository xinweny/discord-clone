import pluralize from 'pluralize';
import { useToggle } from '@uidotdev/usehooks';

import { useGetUserData } from '@features/auth/hooks';
import { useGetMutualServersQuery } from '../api';
import { MutualServerCard } from './mutual-server-card';

type MutualServersListProps = {
  participantId: string;
};

export function MutualServersList({
  participantId
}: MutualServersListProps) {
  const [on, toggle] = useToggle(false);

  const { user } = useGetUserData();

  const { data: mutualServers, isSuccess } = useGetMutualServersQuery({
    userId1: user.data!._id,
    userId2: participantId,
  });

  const length = mutualServers?.length || 0;

  if (!isSuccess || length === 0) return null;

  return (
    <div>
      <button onClick={() => toggle(!on)}>{pluralize('Mutual Server', length, true)}</button>
      {on && <div>
        {mutualServers.map(server => <MutualServerCard
          key={server._id}
          server={server}
        />)}
      </div>}
    </div>
  ); 
}