import { useServerAuthorize } from '@features/servers/hooks';

import type { CategoryData } from '@features/categories/types';

import { CreateChannelModal } from './create-channel-modal';

import { ModalButton, ModalButtonProps } from '@components/ui/buttons';

type CreateChannelButtonProps = {
  category?: CategoryData;
} & ModalButtonProps;

export function CreateChannelButton({
  category,
  children,
  btnRef,
  ...props
}: CreateChannelButtonProps) {
  const authorized = useServerAuthorize('manageChannels');

  if (!authorized) return null;

  return (
    <ModalButton
      modal={CreateChannelModal}
      modalProps={{ category }}
      btnRef={btnRef}
      {...props}
    >
      {children}
    </ModalButton>
  );
}