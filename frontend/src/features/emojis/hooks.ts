import { useState, useEffect } from 'react';

import type {
  PickerCategoryData,
  PickerServerEmojisData,
} from '@features/emojis/types';

import { useGetUserData } from '@features/auth/hooks';

import { useGetJoinedServersQuery } from '@features/servers/api';

import { useLazyGetEmojisQuery } from '@features/emojis/api';

export const useGetPickerCustomEmojis = () => {
  const [custom, setCustom] = useState<PickerServerEmojisData[]>([]);

  const [getEmojis] = useLazyGetEmojisQuery();

  const { user } = useGetUserData();
  const { data: servers } = useGetJoinedServersQuery(user.data!.id);

  useEffect(() => {
    const getJoinedServerEmojis = async () => {
      if (!servers) return;

      const emojis = await getEmojis({
        serverIds: servers.map(server => server._id),
      }).unwrap();

      setCustom(servers.map(server => ({
        id: server._id,
        name: server.name,
        emojis: emojis.map(emoji => ({
          id: emoji.name,
          name: emoji._id,
          skins: [{ src: emoji.url }],
        })),
      })));
    };

    getJoinedServerEmojis();
  }, [servers]);

  return {
    custom,
  };
};