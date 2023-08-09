import { useState } from 'react';

import type { ModalProps } from '@types';
import type { ChannelData } from '../api';

import { SettingsLayout } from '@components/layouts';
import { ModalWrapper } from '@components/wrappers';

type UserSettingsModal = {
  channel: ChannelData
} & ModalProps;

export function EditChannelModal({
  isOpen,
  onClose,
}: UserSettingsModal) {
  const [activeTabId, setActiveTabId] = useState<string>('overview');

  return (
    <ModalWrapper closeModal={onClose} isOpen={isOpen}>
      <SettingsLayout
        sidebar={<></>}
        close={onClose}
      >
        <UserSettings activeTabId={activeTabId} />
      </SettingsLayout>
    </ModalWrapper>
  );
}