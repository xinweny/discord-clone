import { useModal, useServerAuthorize } from '@hooks';

import type { CategoryData } from '@features/categories/api';

import { CreateChannelModal } from './create-channel-modal';

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
  const [show, toggle] = useModal();

  const authorized = useServerAuthorize('manageChannels');

  if (!authorized) return null;

  return (
    <div>
      <button ref={btnRef} onClick={toggle} {...props}>
        {children}
      </button>
      <CreateChannelModal isOpen={show} onClose={toggle} category={category} />
    </div>
  );
}