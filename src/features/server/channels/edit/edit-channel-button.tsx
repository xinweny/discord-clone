import { useModal } from '@hooks';

import type { ChannelData } from '../api';

import { EditChannelModal } from './edit-channel-modal';

type EditChannelButtonProps = {
  channel: ChannelData;
};

export function EditChannelButton({ channel }: EditChannelButtonProps) {
  const [show, toggle] = useModal();

  return (
    <div>
      <button type="button" onClick={toggle}>
        <img src="#" alt="Edit channel" />
      </button>
      <EditChannelModal isOpen={show} onClose={toggle} channel={channel} />
    </div>
  );
}