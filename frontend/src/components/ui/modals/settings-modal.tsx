import { useRef, useState } from 'react';

import { SettingsContext } from '@components/context';

import { SettingsLayout } from '@components/layouts';
import { PortalWrapper } from '@components/wrappers';

import type { ModalProps } from '@types';

type SettingsSidebarProps = {
  activeTabId: string;
  setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
};

type SettingsScreenProps = {
  activeTabId: string;
};

type SettingsModalProps = {
  initialTabId: string;
  sidebar: React.FC<SettingsSidebarProps>;
  content: React.FC<SettingsScreenProps>;
} & ModalProps;

export function SettingsModal({
  isOpen,
  onClose,
  initialTabId,
  sidebar,
  content,
}: SettingsModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [activeTabId, setActiveTabId] = useState<string>(initialTabId);

  const handleClose = () => {
    onClose();
    setActiveTabId(initialTabId);
  };

  const SettingsSidebar = sidebar;
  const FormScreen = content;

  return (
    <SettingsContext.Provider value={{
      closeBtnRef,
      activeTabState: {
        id: activeTabId,
        set: setActiveTabId,
      },
    }}>
      <PortalWrapper
        isOpen={isOpen}
        layer={0}
      >
        <SettingsLayout
          sidebar={<SettingsSidebar
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
          />}
          close={handleClose}
          closeBtnRef={closeBtnRef}
        >
          <FormScreen activeTabId={activeTabId} />
        </SettingsLayout>
      </PortalWrapper>
    </SettingsContext.Provider>
  );
}