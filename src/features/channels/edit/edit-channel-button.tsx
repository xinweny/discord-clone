import type { ChannelData } from '../types';

import { ChannelContext } from '../context';

import { useServerAuthorize } from '@hooks';

import { ModalButton } from '@components/ui/buttons';
import { EditChannelModal } from './edit-channel-modal';

type EditChannelButtonProps = {
  channel: ChannelData;
};

export function EditChannelButton({ channel }: EditChannelButtonProps) {
  const authorized = useServerAuthorize('manageChannels');

  if (!authorized) return null;

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