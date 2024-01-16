import { useContext } from 'react';

import type { RoleData } from '../types';

import { ActiveRoleContext } from '../context';

import MembersIcon from '@assets/icons/members.svg?react';
import ChevronIcon from '@assets/icons/chevron.svg?react';

import styles from './default-role-section.module.scss';

type DefaultRoleSectionProps = {
  role: RoleData;
};

export function DefaultRoleSection({ role }: DefaultRoleSectionProps) {
  const activeRole = useContext(ActiveRoleContext);

  const openEditRoleSection = () => {
    activeRole?.set(role);
  };

  return (
    <div className={styles.section}>
      <span>Use roles to group your server members and assign permissions.</span>
      <button type="button" onClick={openEditRoleSection}>
        <div className={styles.iconWrapper}>
          <MembersIcon />
        </div>
        <div className={styles.info}>
          <h3>Default permissions</h3>
          <span>@everyone · applies to all server members</span>
        </div>
        <ChevronIcon className={styles.chevron} />
      </button>
    </div>
  )
}