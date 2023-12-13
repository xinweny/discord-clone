import type { ChannelData } from '../types';

import { ChannelContext } from '../context';

import { useServerAuthorize } from '@features/servers/hooks';

import { ModalButton } from '@components/ui/buttons';
import { EditChannelModal } from './edit-channel-modal';

type EditChannelButtonProps = {
  channel: ChannelData;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export function EditChannelButton({ channel, children, ...props }: EditChannelButtonProps) {
  const authorized = useServerAuthorize('manageChannels');

  if (!authorized) return null;

  return (
    <ChannelContext.Provider value={channel}>
      <ModalButton
        modal={EditChannelModal}
        {...props}
      >
        {children}
      </ModalButton>
    </ChannelContext.Provider>
  );
}