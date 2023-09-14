import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGetChannelsQuery } from '@features/channels/api';
import type { ChannelData } from '@features/channels/types';

export const useSetChannels = () => {
  const { serverId, roomId } = useParams();
  const navigate = useNavigate();

  const [activeChannel, setActiveChannel] = useState<ChannelData | null>(null);

  const channels = useGetChannelsQuery(serverId!);

  useEffect(() => {
    if (channels.isSuccess) {
      if (!roomId) {
        setActiveChannel(channels.data[0]);
      } else {
        const channel = channels.data.find(channel => channel._id === roomId);
        
        setActiveChannel(channel || channels.data[0]);
        if (!channel) navigate(`/channels/${serverId}/${channels.data[0]._id}`)
      }
    }
  }, [channels, roomId]);

  return { channels, activeChannel };
}