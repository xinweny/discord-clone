import { useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';

import { useGetChannelsQuery } from './api';
import type { ChannelData } from './types';

import { formatTextChannelName } from '@utils';

import { ChannelTypes } from './types';

export const useFormatChannelName = () => {
  const { control, setValue } = useFormContext();

  const type = useWatch({ control, name: 'type' });
  const name = useWatch({ control, name: 'name' });

  useEffect(() => {
    if (type === 'text') setValue('name', formatTextChannelName(name));
  }, [type]);

  const formatChannelName = (e: React.FormEvent<HTMLInputElement>) => {
    if (type === 'text') {
      const name = e.currentTarget.value;
      
      const formattedName = formatTextChannelName(name);

      setValue('name', formattedName);
    }
  };

  return formatChannelName;
};

export const useFormatChannelNameEdit = (type: ChannelTypes) => {
  const { setValue } = useFormContext();

  const formatChannelName = (e: React.FormEvent<HTMLInputElement>) => {
    if (type === 'text') {
      const name = e.currentTarget.value;
      
      const formattedName = formatTextChannelName(name);

      setValue('name', formattedName);
    }
  };

  return formatChannelName;
};

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
};

export const useActiveChannel = () => {
  const { activeChannel } = useOutletContext<{ activeChannel: ChannelData }>();

  const [channel, setChannel] = useState(activeChannel);

  useEffect(() => {
    if (activeChannel) setChannel(activeChannel);
  }, [activeChannel]);

  return channel;
};
