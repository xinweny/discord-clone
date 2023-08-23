import { useContext } from 'react';

import { ActiveRoleContext } from '../context';

import { useDisplay } from '@hooks';

import type { RoleData } from '../types';

type ServerRoleRowProps = {
  role: RoleData;
};

export function ServerRoleRow({ role }: ServerRoleRowProps) {
  const { visible, hover } = useDisplay();

  const activeRole = useContext(ActiveRoleContext)!;

  const openForm = () => { activeRole.set(role); };

  return (
    <tr {...hover}>
      <td>
        <img src="#" alt={role.color} />
        <p>{role.name}</p>
      </td>
      <td>
        <p>{role.memberCount || 0}</p>
        <img src="#" />
      </td>
      <td>
        {visible && (
          <button
            type="button"
            onClick={openForm}
          >
            <img src="#" alt="Edit" />
          </button>
        )}
      </td>
      <td>
        <button type="button">
          <img src="#" alt="" />
        </button>
      </td>
    </tr>
  )
}