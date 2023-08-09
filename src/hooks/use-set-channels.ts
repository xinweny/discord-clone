import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ChannelData } from '@features/server/channels/api';

import { useGetChannelsQuery } from '@features/server/channels/api';

export const useSetChannels = () => {
  const { serverId, channelId } = useParams();
  const navigate = useNavigate();

  const [activeChannel, setActiveChannel] = useState<ChannelData | null>(null);

  const channels = useGetChannelsQuery(serverId!);

  useEffect(() => {
    if (channels.isSuccess) {
      if (!channelId) {
        setActiveChannel(channels.data[0]);
      } else {
        const channel = channels.data.find(channel => channel._id === channelId);
        
        setActiveChannel(channel || channels.data[0]);
        if (!channel) navigate(`/channels/${serverId}/${channels.data[0]._id}`)
      }
    }
  }, [channels, channelId]);

  return { channels, activeChannel };
}