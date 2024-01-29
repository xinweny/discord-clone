import type { ModalProps } from '@types';

import { CATEGORY_SETTINGS } from './tabs';

import { SettingsModal } from '@components/ui/modals';

import { CategorySettingsScreen } from './category-settings-screen';
import { CategorySettingsSidebar } from './category-settings-sidebar';

export function EditCategoryModal({
  isOpen,
  onClose,
}: ModalProps) {
  return (
    <SettingsModal
      isOpen={isOpen}
      onClose={onClose}
      initialTabId={CATEGORY_SETTINGS[0].id}
      sidebar={CategorySettingsSidebar}
      content={CategorySettingsScreen}
    />
  );
}