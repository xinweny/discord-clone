import { useServerAuthorize } from '@hooks';

import { ModalButton } from '@components/ui/buttons';
import { DeleteChannelModal } from './delete-channel-modal';

export function DeleteChannelButton() {
  const authorized = useServerAuthorize('manageChannels');

  if (!authorized) return null;

  return (
    <ModalButton
      modal={DeleteChannelModal}
    >
      Delete Channel
    </ModalButton>
  );
}