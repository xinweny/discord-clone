import { useState, useContext } from 'react';

import { ServerContext } from '@features/server/context';

import { useGetServerRolesQuery } from '../api';

import {
  CustomRolesTable,
  DefaultRoleSection,
} from '../list';
import { RoleSearchBar } from '../search';

export function ServerRolesSettings() {
  const server = useContext(ServerContext)!;

  const [query, setQuery] = useState<string>('');

  const roles = useGetServerRolesQuery(server._id);

  if (!roles.isSuccess) return null;

  const defaultRole = roles.data[0];
  const customRoles = roles.data.slice(1);

  return (
    <div>
      <DefaultRoleSection role={defaultRole} />
      <div>
        <RoleSearchBar setQuery={setQuery} />
      </div>
      <CustomRolesTable roles={customRoles} searchQuery={query} />
    </div>
  );
}