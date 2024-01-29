import { EditRoleNavbar } from './edit-role-navbar';
import { EditRoleForm } from './edit-role-form';

import styles from './edit-role-section.module.scss';

export function EditRoleSection() {
  return (
    <div className={styles.page}>
      <EditRoleNavbar />
      <EditRoleForm />
    </div>
  );
}