import { useState } from 'react';

import { SettingsLayout } from '@components/layouts';

import { UserSettingsSidebar } from './user-settings-sidebar';

type UserSettingsModal = {
  show: boolean;
  toggle: React.ReactEventHandler;
};

export function UserSettingsModal({
  show,
  toggle,
}: UserSettingsModal) {
  const [activeTabId, setActiveTabId] = useState();

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
        <p>{activeTabId}</p>
      </SettingsLayout>
    </div>
  );
}