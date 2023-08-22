import { useState } from 'react';

import { ActiveRoleContext } from '../context';

import type { RoleData } from '../types';

import { ServerRolesSettings } from './server-roles-settings';
import { EditRoleSection } from '../edit';

export function ServerRolesForm() {
  const [activeRole, setActiveRole] = useState<RoleData | null>(null);

  return (
    <ActiveRoleContext.Provider value={{
      data: activeRole,
      set: setActiveRole,
    }}>
      <div>
        {activeRole
          ? <EditRoleSection />
          : <ServerRolesSettings />
        }
      </div>
    </ActiveRoleContext.Provider>
  );
}