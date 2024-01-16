import { useServerAuthorize } from '@features/servers/hooks';

import { ModalButton } from '@components/ui/buttons';
import { DeleteChannelModal } from './delete-channel-modal';

type DeleteChannelButtonProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export function DeleteChannelButton({ className, children }: DeleteChannelButtonProps) {
  const authorized = useServerAuthorize('manageChannels');

  if (!authorized) return null;

  return (
    <ModalButton
      modal={DeleteChannelModal}
      className={className}
    >
      {children}
    </ModalButton>
  );
}