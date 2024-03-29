import { useParams } from 'react-router-dom';

import { CategoryGroup } from '@features/categories/list';
import { ChannelListItem } from './channel-list-item';

import { useGetCategoriesQuery } from '@features/categories/api';
import { useGetServerMembersQuery } from '@features/members/api';
import { useGetChannelsQuery } from '../api';

import styles from './channels-list.module.scss';

export function ChannelsList() {
  const { serverId, roomId } = useParams();

  const categories = useGetCategoriesQuery(serverId!);
  const channels = useGetChannelsQuery(serverId!);
  const members = useGetServerMembersQuery(serverId!);

  if (!categories.isSuccess || !channels.isSuccess || !members.isSuccess) return null;

  const uncategorizedChannels = channels.data.filter(channel => !channel.categoryId);

  return (
    <div className={styles.list}>
      {uncategorizedChannels.length > 0 && <div className={styles.uncategorized}>
        {uncategorizedChannels.map(channel =>
          <ChannelListItem
            key={channel._id}
            channel={channel}
            serverId={serverId!}
            activeId={roomId}
          />
        )}
      </div>}
      {categories.data.map(
        category => (
          <CategoryGroup key={category._id} category={category}>
            {channels.data
              .filter(channel => channel.categoryId === category._id)
              .map(channel =>
                <ChannelListItem
                  key={channel._id}
                  channel={channel}
                  serverId={serverId!}
                  activeId={roomId}
                />
              )
            }
          </CategoryGroup>
        )
      )}
    </div>
  );
}