import type { RoleTabsHookData } from '@hooks';

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
    <div>
      {tabs.map(tab => (
        <button
          className={`${activeTab.id === tab.id ? 'active' : ''}`}
          type="button"
          key={tab.id}
          onClick={() => { changeTab(tab.label); }}
          disabled={!checkPermissions(['Display'], tab.label)}
        >{tab.label}</button>
      ))}
    </div>
  );
}