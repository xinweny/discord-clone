import { useState } from 'react';

import { SettingsLayout } from '@components/layouts';

import { UserSettingsSidebar } from './user-settings-sidebar';

import { UserSettings } from './user-settings';

type UserSettingsModal = {
  show: boolean;
  toggle: React.ReactEventHandler;
};

export function UserSettingsModal({
  show,
  toggle,
}: UserSettingsModal) {
  const [activeTabId, setActiveTabId] = useState<string>('my_account');

  if (!show) return null;

  return (
    <div>
      <SettingsLayout
        sidebar={<UserSettingsSidebar
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
        />}
        toggle={toggle}
      >
        <UserSettings activeTabId={activeTabId} />
      </SettingsLayout>
    </div>
  );
}