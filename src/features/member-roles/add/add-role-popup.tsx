import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useServerMemberContext } from '@features/members/context';

import { useServerAuthorize } from '@features/servers/hooks';

import { RoleSearchBar } from '@features/roles/search';
import { AddRoleButton } from './add-role-button';

import { useGetRolesQuery } from '@features/roles/api';

export function AddRolePopup() {
  const { serverId } = useParams();

  const member = useServerMemberContext();

  const [query, setQuery] = useState<string>('');

  const { data: roles, isSuccess } = useGetRolesQuery({ serverId: serverId! });

  const authorized = useServerAuthorize('manageRoles');

  if (!isSuccess || !member) return null;

  const customRoles = roles.filter(
    role => !member.roleIds.includes(role._id)
  );
  
  const filteredRoles = query
    ? customRoles.filter(
      role => role.name.toLowerCase().includes(query.toLowerCase())
    )
    : customRoles;

  if (!authorized) return null;

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