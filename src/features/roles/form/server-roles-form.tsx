import { useState } from 'react';

import { ActiveRoleContext } from '../context';

import type { RoleData } from '../types';

export function ServerRolesForm() {
  const [activeRole, setActiveRole] = useState<RoleData | null>(null);

  return (
    <ActiveRoleContext.Provider value={{
      activeRole,
      setActiveRole,
    }}>
      <div>

      </div>
    </ActiveRoleContext.Provider>
  );
}