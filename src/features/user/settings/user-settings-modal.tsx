import { useState } from 'react';

import { SettingsLayout } from '@components/layouts';
import { ModalWrapper } from '@components/wrappers';

import { UserSettingsSidebar } from './user-settings-sidebar';

import { UserSettings } from './user-settings';

import type { ModalProps } from '@types';

type UserSettingsModal = ModalProps;

export function UserSettingsModal({
  show,
  onClose,
}: UserSettingsModal) {
  const [activeTabId, setActiveTabId] = useState<string>('my_account');

  if (!show) return null;

  return (
    <ModalWrapper closeModal={onClose}>
      <SettingsLayout
        sidebar={<UserSettingsSidebar
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
        />}
        toggle={onClose}
      >
        <UserSettings activeTabId={activeTabId} />
      </SettingsLayout>
    </ModalWrapper>
  );
}