import { useActiveChannel } from '@hooks';

import { ChannelIcon } from '@features/server/channels/list';

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