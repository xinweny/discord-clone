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
  const [categoryIcons, setCategoryIcons] = useState<PickerCategoryData>({});

  const [getEmojis] = useLazyGetEmojisQuery();

  const { user } = useGetUserData();
  const { data: servers } = useGetJoinedServersQuery(user.data!.id);

  useEffect(() => {
    const getJoinedServerEmojis = async () => {
      if (!servers) return;

      const customEmojis = await Promise.all(servers.map(async (server) => {
        const emojis = await getEmojis({ serverId: server._id }).unwrap();

        setCategoryIcons(prev => ({
          ...prev,
          [server.name]: { src: server.avatarUrl },
        }));

        return {
          id: server._id,
          name: server.name,
          emojis: emojis.map(emoji => ({
            id: emoji.name,
            name: emoji._id,
            skins: [{ src: emoji.url }],
          })),
        };
      }));

      setCustom(customEmojis);
    };

    getJoinedServerEmojis();
  }, [servers]);

  return {
    custom,
    categoryIcons,
  };
};