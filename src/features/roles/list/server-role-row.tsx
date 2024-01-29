import { useContext } from 'react';
import { useHover } from '@uidotdev/usehooks';

import type { RoleData } from '../types';

import { ActiveRoleContext } from '../context';

import { Tooltip } from '@components/ui/popups';

import { RoleContextMenuButton } from '.';

import RoleBadgeIcon from '@assets/icons/role-badge.svg?react';
import PersonIcon from '@assets/icons/person.svg?react';
import PencilIcon from '@assets/icons/pencil.svg?react';

import styles from './server-role-row.module.scss';

type ServerRoleRowProps = {
  role: RoleData;
};

export function ServerRoleRow({ role }: ServerRoleRowProps) {
  const [hoverRef, isHovered] = useHover();

  const activeRole = useContext(ActiveRoleContext)!;

  const openForm = () => { activeRole.set(role); };

  const { name, color, memberCount } = role;

  const buttonCellProps = {
    role: 'button',
    onClick: openForm,
  };

  return (
    <tr ref={hoverRef} className={styles.row}>
      <td className={styles.role} {...buttonCellProps}>
        <RoleBadgeIcon className={styles.badge} style={{ color }} />
        <span>{name}</span>
      </td>
      <td {...buttonCellProps} className={styles.memberCount}>
        <span>{memberCount || 0}</span>
        <PersonIcon />
      </td>
      <td {...buttonCellProps} className={styles.edit}>
        {isHovered && (
          <Tooltip text="Edit" direction="top" gap={4}>
            <PencilIcon />
          </Tooltip>
        )}
      </td>
      <td>
        <RoleContextMenuButton
          isShown={isHovered}
          serverRole={role}
        />
      </td>
    </tr>
  )
}