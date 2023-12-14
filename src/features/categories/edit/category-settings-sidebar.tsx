import { CATEGORY_SETTINGS } from './tabs';

import { useCategoryContext } from '../context';

import { TabGroupLayout } from '@components/layouts';
import { SettingsSidebar, SettingsSidebarProps } from '@components/ui/presentation';

import { DeleteCategoryButton } from '../delete';

export function CategorySettingsSidebar({
  activeTabId, setActiveTabId
}: SettingsSidebarProps) {
  const category = useCategoryContext();

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