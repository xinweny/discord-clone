import { useContext } from 'react';
import { useHover } from '@uidotdev/usehooks';

import { ActiveRoleContext } from '../context';

import { RoleContextMenuButton } from '.';

import type { RoleData } from '../types';

type ServerRoleRowProps = {
  role: RoleData;
};

export function ServerRoleRow({ role }: ServerRoleRowProps) {
  const [hoverRef, isHovered] = useHover();

  const activeRole = useContext(ActiveRoleContext)!;

  const openForm = () => { activeRole.set(role); };

  return (
    <tr ref={hoverRef}>
      <td>
        <img src="#" alt={role.color} />
        <p>{role.name}</p>
      </td>
      <td>
        <p>{role.memberCount || 0}</p>
        <img src="#" />
      </td>
      <td>
        {isHovered && (
          <button
            type="button"
            onClick={openForm}
          >
            <img src="#" alt="Edit" />
          </button>
        )}
      </td>
      <td>
        {isHovered && (
          <RoleContextMenuButton
            serverRole={role}
          />
        )}
      </td>
    </tr>
  )
}