import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ServerMemberContext } from '@features/members/context';

import { RoleSearchBar } from '@features/roles/search';

import { useGetRolesQuery } from '@features/roles/api';
import { AddRoleButton } from './add-role-button';

export function AddRolePopup() {
  const { serverId } = useParams();

  const member = useContext(ServerMemberContext);

  const [query, setQuery] = useState<string>('');

  const { data: roles, isSuccess } = useGetRolesQuery({ serverId: serverId! });

  if (!isSuccess || !member) return null;

  const customRoles = roles.filter(
    role => !member.roleIds.includes(role._id)
  );
  
  const filteredRoles = query
    ? customRoles.filter(
      role => role.name.toLowerCase().includes(query.toLowerCase())
    )
    : customRoles;

  return (
    <div>
      <RoleSearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Add Role"
      />
      <div>
        {filteredRoles.length > 0
          ? filteredRoles.map(role => (
            <AddRoleButton
              key={role._id}
              memberId={member._id}
              serverId={serverId!}
              memberRole={role}
            />
          ))
          : (
            <div>
              <p><strong>Nope!</strong></p>
              <p>Did you make a typo?</p>
            </div>
          )
        }
      </div>
    </div>
  );
}