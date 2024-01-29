import { RoleData } from '../types';

import { ServerRoleRow } from './server-role-row';

import styles from './custom-roles-table.module.scss';

type CustomRolesTableProps = {
  roles: RoleData[];
  searchQuery: string;
};

export function CustomRolesTable({ roles, searchQuery }: CustomRolesTableProps) {
  const filteredRoles = searchQuery
    ? roles.filter(
      role => role.name.toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    : roles;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{`ROLES – ${filteredRoles.length}`}</th>
          <th>MEMBERS</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredRoles.length > 0
          ? filteredRoles.map(role => (
            <ServerRoleRow
              key={role._id}
              role={role}
            />
          ))
          : (
            <tr>
              <td>
                <img src="#" alt="#" />
                <p>No roles</p>
              </td>
            </tr>
          )}
      </tbody>
    </table>
  );
}