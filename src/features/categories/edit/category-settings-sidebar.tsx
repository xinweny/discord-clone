import { useContext } from 'react';

import { CATEGORY_SETTINGS } from './tabs';

import { CategoryContext } from '../context';

import { TabGroupLayout } from '@components/layouts';
import { SettingsSidebar, SettingsSidebarProps } from '@components/ui/presentation';

import { DeleteCategoryButton } from '../delete';

export function CategorySettingsSidebar({
  activeTabId, setActiveTabId
}: SettingsSidebarProps) {
  const category = useContext(CategoryContext);

  return (
    <SettingsSidebar>
      <TabGroupLayout
        title={`${category?.name.toUpperCase()}`}
        tabs={CATEGORY_SETTINGS}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabGroupLayout>
        <DeleteCategoryButton category={category!}>Delete Category</DeleteCategoryButton>
      </TabGroupLayout>
    </SettingsSidebar>
  );
}