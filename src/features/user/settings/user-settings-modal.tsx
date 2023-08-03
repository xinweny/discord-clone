import { useState } from 'react';

import { SettingsLayout } from '@components/layouts';
import { ModalWrapper } from '@components/wrappers';

import { UserSettingsSidebar } from './user-settings-sidebar';

import { UserSettings } from './user-settings';

import type { ModalProps } from '@types';

type UserSettingsModal = ModalProps;

export function UserSettingsModal({
  isOpen,
  onClose,
}: UserSettingsModal) {
  const [activeTabId, setActiveTabId] = useState<string>('my_account');

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen}>
      <SettingsLayout
        sidebar={<UserSettingsSidebar
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
        />}
        close={onClose}
      >
        <UserSettings activeTabId={activeTabId} />
      </SettingsLayout>
    </ModalWrapper>
  );
}