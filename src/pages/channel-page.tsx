import { ContentLayout } from '@components/layouts';

import { RoomTypes } from '@components/ui/displays';

import { useActiveChannel } from '@hooks';
import { useServerMemberAuthorize } from '@features/members/hooks';

import { ChannelInfoHeader } from '@features/servers/nav';
import { ServerMembersList } from '@features/members/list';
import { MessagesContainer } from '@features/messages/list';
import { SendMessageForm } from '@features/messages/send';
import { RoomWelcome } from '@components/ui/displays';

export function ChannelPage() {
  const channel = useActiveChannel();

  const authorized = useServerMemberAuthorize();

  if (!channel) return null;

  return (
    <div>
      <ContentLayout
        header={<ChannelInfoHeader />}
        infoTab={<ServerMembersList />}
      >
        <MessagesContainer
          welcomeComponent={<RoomWelcome type={RoomTypes.CHANNEL} name={channel.name} avatarSrc="#" />}
        />
        <SendMessageForm
          placeholder={`Message #${channel.name}`}
          authorized={authorized}
        />
      </ContentLayout>
    </div>
  );
}