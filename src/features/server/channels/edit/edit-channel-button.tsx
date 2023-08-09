import { createContext } from 'react';

import { useModal } from '@hooks';

import type { ChannelData } from '../api';

import { EditChannelModal } from './edit-channel-modal';

type EditChannelButtonProps = {
  channel: ChannelData;
};

export const ChannelContext = createContext<ChannelData | null>(null);

export function EditChannelButton({ channel }: EditChannelButtonProps) {
  const [show, toggle] = useModal();

  return (
    <ChannelContext.Provider value={channel}>
      <div>
        <button type="button" onClick={toggle}>
          <img src="#" alt="Edit channel" />
        </button>
        <EditChannelModal isOpen={show} onClose={toggle} channel={channel} />
      </div>
    </ChannelContext.Provider>
  );
}