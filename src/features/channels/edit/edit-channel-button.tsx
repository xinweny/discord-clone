import { createContext } from 'react';

import type { ChannelData } from '../api';

import { ModalButton } from '@components/ui/buttons';
import { EditChannelModal } from './edit-channel-modal';

type EditChannelButtonProps = {
  channel: ChannelData;
};

export const ChannelContext = createContext<ChannelData | null>(null);

export function EditChannelButton({ channel }: EditChannelButtonProps) {
  return (
    <ChannelContext.Provider value={channel}>
      <ModalButton
        modal={EditChannelModal}
      >
        <img src="#" alt="Edit channel" />
      </ModalButton>
    </ChannelContext.Provider>
  );
}