import { useState, useEffect } from 'react';

import { useServerContext } from '@features/servers/context';
import { useActiveRoleContext } from '../context';

import { TabItemButton } from '@components/ui/buttons';
import { Tooltip } from '@components/ui/popups';
import { Separator } from '@components/ui/displays';

import { CreateRoleButton } from '../create';

import { useGetRolesQuery } from '../api';

import ArrowIcon from '@assets/icons/arrow.svg?react';
import PlusIcon from '@assets/icons/plus.svg?react';

import styles from './edit-role-navbar.module.scss';

export function EditRoleNavbar() {
  const { _id: serverId } = useServerContext()!;
  const activeRole = useActiveRoleContext();

  const [activeRoleId, setActiveRoleId] = useState<string>(activeRole!.data!._id);

  const roles = useGetRolesQuery({ serverId });

  useEffect(() => {
    if (roles.isSuccess && activeRoleId !== activeRole!.data!._id) {
      const nextActiveRole = roles.data.find(role => role._id === activeRoleId);

      if (nextActiveRole) activeRole?.set(nextActiveRole);
    }
  }, [activeRoleId]);

  if (!roles.isSuccess || !activeRole?.data) return null;

  const closeSection = (e: React.MouseEvent) => {
    e.stopPropagation();
    activeRole?.set(null);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.header}>
        <button type="button" onClick={closeSection}>
          <ArrowIcon />
          <span>BACK</span>
        </button>
        <Tooltip text="Create Role" direction="top" gap={4}>
          <CreateRoleButton>
            <PlusIcon />
          </CreateRoleButton>
        </Tooltip>
      </div>
      <div className={styles.list}>
        {roles.data.map(role => (
          <TabItemButton
            key={role._id}
            tabId={role._id}
            activeTabId={activeRoleId}
            setActiveTabId={setActiveRoleId}
          >
            <div className={styles.pin} style={{ backgroundColor: role.color }} />
            <span>{role.name}</span>
          </TabItemButton>
        ))}
      </div>
      <Separator className={styles.separator} axis="y" />
    </nav>
  )
}