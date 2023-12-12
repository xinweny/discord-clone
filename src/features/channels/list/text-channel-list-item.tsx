import { useHover } from '@uidotdev/usehooks';
import { Link } from 'react-router-dom';

import type { ChannelData } from '../types';

import { ChannelLabel } from './channel-label';
import { EditChannelButton } from '../edit';

type TextChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
};

export function TextChannelListItem({ channel, serverId }: TextChannelListItemProps) {
  const [hoverRef, isHovered] = useHover();

  return (
    <div ref={hoverRef}>
      <Link to={`/channels/${serverId}/${channel._id}`}>
        <ChannelLabel channel={channel} />
      </Link>
      {isHovered && <EditChannelButton channel={channel} />}
    </div>
  );
}