import { useState } from 'react';

import { SettingsLayout } from '@components/layouts';
import { ModalWrapper } from '@components/wrappers';

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
  const [activeTabId, setActiveTabId] = useState<string>(initialTabId);

  const SettingsSidebar = sidebar;
  const FormScreen = content;

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen}>
      <SettingsLayout
        sidebar={<SettingsSidebar
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
        />}
        close={onClose}
      >
        <FormScreen activeTabId={activeTabId} />
      </SettingsLayout>
    </ModalWrapper>
  );
}