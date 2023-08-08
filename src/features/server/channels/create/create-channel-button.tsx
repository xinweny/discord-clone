import { useModal, useServerAuthorize } from '@hooks';

import type { CategoryData } from '@features/server/categories/api';

import { CreateChannelModal } from './create-channel-modal';

type CreateChannelButtonProps = {
  category?: CategoryData;
  children?: React.ReactNode;
};

export function CreateChannelButton({ category, children }: CreateChannelButtonProps) {
  const [show, toggle] = useModal();

  const authorized = useServerAuthorize('manageChannels');

  if (!authorized) return null;

  return (
    <div>
      <button onClick={toggle}>
        {children}
      </button>
      <CreateChannelModal isOpen={show} onClose={toggle} category={category} />
    </div>
  );
}