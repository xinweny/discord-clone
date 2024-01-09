import pluralize from 'pluralize';
import { useToggle } from '@uidotdev/usehooks';

import { useGetUserData } from '@features/auth/hooks';
import { useGetMutualServersQuery } from '../api';
import { MutualServerCard } from './mutual-server-card';

type MutualServersListProps = {
  participantId: string;
  withToggle?: boolean;
  className?: string;
};

export function MutualServersList({
  participantId,
  withToggle = true,
  className,
}: MutualServersListProps) {
  const [on, toggle] = useToggle(!withToggle);

  const { user } = useGetUserData();

  const { data: mutualServers, isSuccess } = useGetMutualServersQuery({
    userId1: user.data!._id,
    userId2: participantId,
  });

  const length = mutualServers?.length || 0;

  if (!isSuccess || length === 0) return null;

  return (
    <div className={className}>
      {withToggle && (
        <button onClick={() => toggle(!on)}>
          {pluralize('Mutual Server', length, true)}
        </button>
      )}
      {on && <div>
        {mutualServers.map(server => <MutualServerCard
          key={server._id}
          server={server}
        />)}
      </div>}
    </div>
  ); 
}