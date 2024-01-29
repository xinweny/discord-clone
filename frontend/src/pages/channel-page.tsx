import { useParams } from 'react-router-dom';

import { ChannelTypes } from '@features/channels/types';

import { ContentLayout } from '@components/layouts';

import { useActiveChannel } from '@features/channels/hooks';

import { ChannelContainer, ChannelHeader } from '@features/channels/get';
import { ServerMembersPanel } from '@features/members/list';

export function ChannelPage() {
  const { serverId } = useParams();

  const channel = useActiveChannel();

  if (!channel) return null;

  return (
    <ContentLayout
      header={<ChannelHeader />}
      panel={channel.type === ChannelTypes.TEXT && <ServerMembersPanel />}
    >
      <ChannelContainer channel={channel} serverId={serverId} />
    </ContentLayout>
  );
}