import { useActiveChannel } from '@features/channels/hooks';

import { ChannelIcon } from '@features/channels/list';

export function ChannelInfoHeader() {
  const channel = useActiveChannel();

  if (!channel) return null;

  return (
    <div>
      <div>
        <ChannelIcon type={channel.type} />
        <h4>{channel.name}</h4>
      </div>
      {channel.description && (
        <div>
          <p>{channel.description}</p>
        </div>
      )}
    </div>
  );
}