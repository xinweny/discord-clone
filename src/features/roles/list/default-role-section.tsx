import { useContext } from 'react';

import type { RoleData } from '../types';

import { ActiveRoleContext } from '../context';

type DefaultRoleSectionProps = {
  role: RoleData;
};

export function DefaultRoleSection({ role }: DefaultRoleSectionProps) {
  const activeRole = useContext(ActiveRoleContext);

  const openEditRoleSection = () => {
    activeRole?.set(role);
  };

  return (
    <div>
      <p>Use roles to group your server members and assign permissions.</p>
      <button type="button" onClick={openEditRoleSection}>
        <div>
          <img src="#" alt="#" />
          <div>
            <h3>Default permissions</h3>
            <p>@everyone·applies to all server members</p>
          </div>
          <img src="#" alt=">" />
        </div>
      </button>
    </div>
  )
}