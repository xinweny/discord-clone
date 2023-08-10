import { useServerAuthorize } from '@hooks';

import type { CategoryData } from '@features/categories/api';

import { CreateChannelModal } from './create-channel-modal';

import { ModalButton } from '@components/ui/buttons';

type CreateChannelButtonProps = {
  category?: CategoryData;
  children?: React.ReactNode;
  btnRef?: React.RefObject<HTMLButtonElement>;
} & React.HTMLAttributes<HTMLButtonElement>;

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