import { useParams } from 'react-router-dom';
import pluralize from 'pluralize';

import { ServerMemberRoleCard } from './server-member-role-card';
import { AddRolesButton } from '../add';

import { useGetMemberRolesQuery } from '../api';

type ServerMemberRolesListProps = {
  memberId: string;
};

export function ServerMemberRolesList({ memberId }: ServerMemberRolesListProps) {
  const { serverId } = useParams();

  const { data: roles, isSuccess } = useGetMemberRolesQuery({
    serverId: serverId!,
    memberId,
  });

  if (!isSuccess) return null;

  const customRoles = roles.slice(1);

  return (
    <div>
      <p><strong>{
        customRoles.length > 0
          ? pluralize('ROLE', customRoles.length)
          : 'NO ROLES'
      }</strong></p>
      <div>
        {customRoles.map(role => (
          <ServerMemberRoleCard
            key={role._id}
            memberRole={role}
          />
        ))}
        <AddRolesButton />
      </div>
    </div>
  );
}