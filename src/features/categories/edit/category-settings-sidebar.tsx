import { useContext } from 'react';

import { CATEGORY_SETTINGS } from './tabs';

import { CategoryContext } from './edit-category-button';

import { TabGroupLayout } from '@components/layouts';

import { DeleteCategoryButton } from '../delete';

type CategorySettingsSidebarProps = {
  activeTabId: string;
  setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
};

export function CategorySettingsSidebar({
  activeTabId, setActiveTabId
}: CategorySettingsSidebarProps) {
  const category = useContext(CategoryContext);

  return (
    <div>
      <TabGroupLayout
        title={`${category?.name.toUpperCase()}`}
        tabs={CATEGORY_SETTINGS}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <TabGroupLayout>
        <DeleteCategoryButton category={category!}>Delete Category</DeleteCategoryButton>
      </TabGroupLayout>
    </div>
  );
}