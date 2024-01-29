import type { RoleTabsHookData } from '../hooks';

import styles from './edit-role-tabs.module.scss';

type EditRoleTabsProps = {
  state: RoleTabsHookData;
};

export function EditRoleTabs({
  state,
}: EditRoleTabsProps) {
  const {
    activeTab,
    tabs,
    changeTab,
    checkPermissions,
  } = state;

  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          className={`${activeTab.id === tab.id ? styles.active : ''}`}
          type="button"
          key={tab.id}
          onClick={() => { changeTab(tab.label); }}
          disabled={!checkPermissions(['Display'], tab.label)}
        >
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}