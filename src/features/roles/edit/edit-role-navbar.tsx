import { useState, useEffect } from 'react';

import { useServerContext } from '@features/servers/context';
import { useActiveRoleContext } from '../context';

import { TabItemButton } from '@components/ui/buttons';

import { CreateRoleButton } from '../create';

import { useGetRolesQuery } from '../api';

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
    <div>
      <div>
        <button type="button" onClick={closeSection}>
          <div>
            <img src="#" alt="Back" />
            <p>BACK</p>
          </div>
        </button>
        <CreateRoleButton>
          <img src="#" alt="Create Role" />
        </CreateRoleButton>
      </div>
      <div>
        {roles.data.map(role => (
          <TabItemButton
            key={role._id}
            tabId={role._id}
            activeTabId={activeRoleId}
            setActiveTabId={setActiveRoleId}
          >
            <div>
              <img src="#" alt="Color" />
              <p>{role.name}</p>
            </div>
          </TabItemButton>
        ))}
      </div>
    </div>
  )
}