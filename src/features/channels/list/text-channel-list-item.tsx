import type { ChannelData } from '../types';

import { useDisplay } from '@components/hooks';

import { ChannelLink } from '../nav';
import { EditChannelButton } from '../edit';

type TextChannelListItemProps = {
  channel: ChannelData;
  serverId: string;
};

export function TextChannelListItem({ channel, serverId }: TextChannelListItemProps) {
  const { hover, visible } = useDisplay();

  return (
    <div {...hover}>
      <ChannelLink channel={channel} serverId={serverId} />
      {visible && <EditChannelButton channel={channel} />}
    </div>
  );
}