import { useRoleTabs } from '@hooks';

import { EditRoleTabs } from './edit-role-tabs';
import { EditRoleFormSections } from './edit-role-form-sections';

export function EditRoleForm() {
  const state = useRoleTabs([
    'Display',
    'Permissions',
  ]);

  const role = state.activeRole.data;

  if (!role) return null;

  return (
    <div>
      <h3>{`EDIT ROLE - ${role?.name.toUpperCase()}`}</h3>
      <EditRoleTabs state={state} />
      <EditRoleFormSections state={state} />
    </div>
  );
}