import { useHover } from '@uidotdev/usehooks';

import type { ChannelData } from '../types';

import { ChannelLink } from '../nav';
import { EditChannelButton } from '../edit';

type TextChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
};

export function TextChannelListItem({ channel, serverId }: TextChannelListItemProps) {
  const [hoverRef, isHovered] = useHover();

  return (
    <div ref={hoverRef}>
      <ChannelLink channel={channel} serverId={serverId} />
      {isHovered && <EditChannelButton channel={channel} />}
    </div>
  );
}