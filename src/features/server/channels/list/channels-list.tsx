import { useParams } from 'react-router-dom';

import { useGetCategoriesQuery } from '@features/server/categories/api';
import { useGetChannelsQuery } from '../api';

import { CategoryGroup } from '@features/server/categories/list';

import { ChannelsListItem } from './channels-list-item';

export function ChannelsList() {
  const { serverId } = useParams();

  const categories = useGetCategoriesQuery(serverId!);
  const channels = useGetChannelsQuery(serverId!);

  if (!categories.isSuccess || !channels.isSuccess) return null;

  const uncategorizedChannels = channels.data.filter(channel => !channel.categoryId);

  return (
    <div>
      {uncategorizedChannels.map(channel =>
        <ChannelsListItem
          key={channel._id}
          channel={channel}
          serverId={serverId!}
        />
      )}
      {categories.data.map(
        category => (
          <CategoryGroup key={category._id} category={category}>
            {channels.data
              .filter(channel => channel.categoryId === category._id)
              .map(channel =>
                <ChannelsListItem
                  key={channel._id}
                  channel={channel}
                  serverId={serverId!}
                />
              )
            }
          </CategoryGroup>
        )
      )}
    </div>
  );
}