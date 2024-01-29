import { useState } from 'react';

import { useServerContext } from '@features/servers/context';
import { useActiveRoleContext } from '../context';

import { useGetRolesQuery } from '../api';

import {
  CustomRolesTable,
  DefaultRoleSection,
} from '../list';
import { RoleSearchBar } from '../list';
import { CreateRoleButton } from '../create';

import styles from './server-roles-settings.module.scss';

export function ServerRolesSettings() {
  const { _id: serverId } = useServerContext()!;

  const role = useActiveRoleContext();

  const [query, setQuery] = useState<string>('');

  const roles = useGetRolesQuery({ serverId, withCount: true });

  if (role?.data || !roles.isSuccess) return null;

  const defaultRole = roles.data[0];
  const customRoles = roles.data.slice(1);

  return (
    <div>
      <DefaultRoleSection role={defaultRole} />
      <div className={styles.search}>
        <RoleSearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search Roles"
        />
        <CreateRoleButton>Create Role</CreateRoleButton>
      </div>
      <CustomRolesTable roles={customRoles} searchQuery={query} />
    </div>
  );
}