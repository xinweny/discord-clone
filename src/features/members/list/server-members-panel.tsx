import { useParams } from 'react-router-dom';

import { useStateContext } from '@context';

import { ServerMemberCard } from './server-member-card';

import { useGetServerMembersQuery } from '../api';

export function ServerMembersPanel() {
  const { serverId } = useParams();

  const [showPanel] = useStateContext()!;

  const { data: members, isSuccess } = useGetServerMembersQuery(serverId!);

  if (!isSuccess) return null;

  return (
    <div hidden={!showPanel}>
      <div>
        {members.map(
          member => <ServerMemberCard key={member._id} member={member} />
        )}
      </div>
    </div>
  );
}