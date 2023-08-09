import { useModal } from '@hooks';

import { DeleteChannelModal } from './delete-channel-modal';

export function DeleteChannelButton() {
  const [show, toggle] = useModal();

  return (
    <div>
      <button type="button" onClick={toggle}>
        Delete Channel
      </button>
      <DeleteChannelModal isOpen={show} onClose={toggle} />
    </div>
  );
}