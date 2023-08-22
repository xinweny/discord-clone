import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import type { ChannelData } from '@features/channels/types';

type ContextType = {
  activeChannel: ChannelData;
};

export const useActiveChannel = () => {
  const { activeChannel } = useOutletContext<ContextType>();

  const [channel, setChannel] = useState(activeChannel);

  useEffect(() => {
    if (activeChannel) setChannel(activeChannel);
  }, [activeChannel]);

  return channel;
};

