import { useRoleTabs } from '../hooks';

import { EditRoleTabs } from './edit-role-tabs';
import { EditRoleFormSections } from './edit-role-form-sections';

import styles from './edit-role-form.module.scss';

export function EditRoleForm() {
  const state = useRoleTabs([
    'Display',
    'Permissions',
  ]);

  const role = state.activeRole.data;

  if (!role) return null;

  return (
    <div className={styles.form}>
      <header>
        <h3>{`EDIT ROLE - ${role?.name.toUpperCase()}`}</h3>
      </header>
      <EditRoleTabs state={state} />
      <EditRoleFormSections state={state} />
    </div>
  );
}