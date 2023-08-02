import { useModal } from '@hooks';

import type { CategoryData } from '@features/server/categories/api';

import { CreateChannelModal } from './create-channel-modal';

type CreateChannelButtonProps = {
  category?: CategoryData;
  children?: React.ReactNode;
};

export function CreateChannelButton({ category, children }: CreateChannelButtonProps) {
  const [show, toggle] = useModal();

  return (
    <div>
      <button onClick={toggle}>
        {children}
      </button>
      <CreateChannelModal show={show} onClose={toggle} category={category} />
    </div>
  )
}