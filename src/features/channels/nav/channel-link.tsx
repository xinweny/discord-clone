import { Link } from 'react-router-dom';

import { ChannelIcon } from '../list';

import type { ChannelData } from '../api';

type ChannelLinkProps = {
  channel: ChannelData;
  serverId: string;
};

export function ChannelLink({ channel, serverId }: ChannelLinkProps) {  
  return (
    <Link to={`/channels/${serverId}/${channel._id}`}>
      <div>
        <ChannelIcon type={channel.type} />
        <p>{channel.name}</p>
      </div>
    </Link>
  );
}