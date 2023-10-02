import pluralize from 'pluralize';

import { useDisplay } from '@components/hooks';

import { useGetUserData } from '@features/auth/hooks';
import { useGetMutualServersQuery } from '../api';
import { MutualServerCard } from './mutual-server-card';

type MutualServersListProps = {
  participantId: string;
};

export function MutualServersList({
  participantId
}: MutualServersListProps) {
  const { visible, toggle } = useDisplay();

  const { user } = useGetUserData();

  const { data: mutualServers, isSuccess } = useGetMutualServersQuery({
    userId1: user.data!._id,
    userId2: participantId,
  });

  const length = mutualServers?.length || 0;

  if (!isSuccess || length === 0) return null;

  return (
    <div>
      <button onClick={toggle}>{pluralize('Mutual Server', length, true)}</button>
      {visible && <div>
        {mutualServers.map(server => <MutualServerCard
          key={server._id}
          server={server}
        />)}
      </div>}
    </div>
  ); 
}