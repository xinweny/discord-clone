import { useParams } from 'react-router-dom';

import { ContentLayout } from '@components/layouts';

import { useActiveChannel } from '@features/channels/hooks';

import { ChannelContainer, ChannelInfoHeader } from '@features/channels/get';
import { ServerMembersList } from '@features/members/list';

export function ChannelPage() {
  const { serverId } = useParams();

  const channel = useActiveChannel();

  if (!channel) return null;

  return (
    <ContentLayout
      header={<ChannelInfoHeader />}
      panel={<ServerMembersList />}
    >
      <ChannelContainer channel={channel} serverId={serverId} />
    </ContentLayout>
  );
}