import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import type { ChannelData } from '@features/server/channels/api';

type ContextType = {
  activeChannel: ChannelData;
};

export const useActiveChannel = () => {
  const { activeChannel } = useOutletContext<ContextType>();

  const [channel, setChannel] = useState(activeChannel);

  useEffect(() => {
    setChannel(activeChannel);
  }, [activeChannel]);

  return channel;
};

