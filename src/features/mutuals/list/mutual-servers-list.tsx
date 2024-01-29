import { useGetUserData } from '@features/auth/hooks';
import { useGetMutualServersQuery } from '../api';
import { MutualServerCard } from './mutual-server-card';

type MutualServersListProps = {
  participantId: string;
  className?: string;
  placeholder?: React.ReactNode;
};

export function MutualServersList({
  participantId,
  className,
  placeholder,
}: MutualServersListProps) {
  const { user } = useGetUserData();

  const { data: mutualServers, isSuccess } = useGetMutualServersQuery({
    userId1: user.data!._id,
    userId2: participantId,
  });

  const length = mutualServers?.length || 0;

  if (!isSuccess) return null;
  if (length === 0) return placeholder;

  return (
    <ul className={className}>
      {mutualServers.map(server => <MutualServerCard
        key={server._id}
        server={server}
      />)}
    </ul>
  ); 
}