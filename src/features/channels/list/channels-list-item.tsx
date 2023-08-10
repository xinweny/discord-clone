import { ChannelData } from '../api';

import { ChannelLink } from '../nav';
import { EditChannelButton } from '../edit';

type ChannelsListItemProps = {
  channel: ChannelData;
  serverId: string;
};

export function ChannelsListItem({ channel, serverId }: ChannelsListItemProps) {

  return (
    <div key={channel._id}>
      <ChannelLink channel={channel} serverId={serverId} />
      <EditChannelButton channel={channel} />
    </div>
  );
}