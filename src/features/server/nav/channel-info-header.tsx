import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import type { ChannelData } from '@features/server/channels/api';

import { ChannelIcon } from '@features/server/channels/list';

type ContextType = {
  activeChannelId: string;
  channels: ChannelData[];
};

export function ChannelInfoHeader() {
  const { activeChannelId, channels } = useOutletContext<ContextType>();

  const [activeChannel, setActiveChannel] = useState(
    channels.find(channel => channel._id === activeChannelId)
  );

  useEffect(() => {
    setActiveChannel(
      channels.find(channel => channel._id === activeChannelId)
    );
  }, [activeChannelId]);

  if (!activeChannel) return null;

  return (
    <div>
      <div>
        <ChannelIcon type={activeChannel.type} />
        <h4>{activeChannel.name}</h4>
      </div>
      {activeChannel.description && (
        <div>
          <p>{activeChannel.description}</p>
        </div>
      )}
    </div>
  );
}