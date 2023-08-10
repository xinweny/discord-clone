import { useParams } from 'react-router-dom';

import { ServerMemberCard } from './server-member-card';

import { useGetServerMembersQuery } from '../api';

export function ServerMembersList() {
  const { serverId } = useParams();

  const { data: members, isSuccess } = useGetServerMembersQuery(serverId!);

  if (!isSuccess) return null;

  return (
    <div>
      <div>
        {members.map(
          member => <ServerMemberCard key={member._id} member={member} />
        )}
      </div>
    </div>
  );
}