import { useParams } from 'react-router-dom';

import { ServerMemberContext } from '../context';

import { useGetServerMemberQuery } from '../api';

import { ServerMemberRolesList } from '@features/members/edit/roles/list';
import { UserShortProfile } from '@features/users/profile';

type ServerMemberProfileCardProps = {
  memberId: string;
};

export function ServerMemberProfileCard({
  memberId
}: ServerMemberProfileCardProps) {
  const { serverId } = useParams();

  const { data: member, isSuccess } = useGetServerMemberQuery({
    serverId: serverId!,
    memberId,
  });

  if (!isSuccess) return null;

  return (
    <ServerMemberContext.Provider value={member}>
      <UserShortProfile user={member}>
        <ServerMemberRolesList memberId={member._id} />
      </UserShortProfile>
    </ServerMemberContext.Provider>
  );
}