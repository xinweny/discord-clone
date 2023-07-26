import { ContentLayout } from '@components/layouts';

import { useActiveChannel } from '@hooks';

import { ChannelInfoHeader } from '@features/server/nav';
import { ServerMembersList } from '@features/server/members/list';
import { MessagesContainer } from '@features/messages/list';
import { SendMessageForm } from '@features/messages/send';
import { RoomWelcome } from '@components/ui';

export function ChannelPage() {
  const channel = useActiveChannel();

  if (!channel) return null;

  return (
    <div>
      <ContentLayout
        header={<ChannelInfoHeader />}
        infoTab={<ServerMembersList />}
      >
        <MessagesContainer
          welcomeComponent={<RoomWelcome type="channel" name={channel.name} avatarSrc="#" />}
        />
        <SendMessageForm />
      </ContentLayout>
    </div>
  );
}