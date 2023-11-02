import { ChannelTypes } from '@features/channels/types';

import { ContentLayout } from '@components/layouts';

import { RoomTypes } from '@components/ui/displays';

import { useActiveChannel } from '@features/channels/hooks';
import { useServerMemberAuthorize } from '@features/members/hooks';

import { RoomWelcome } from '@components/ui/displays';

import { ChannelInfoHeader } from '@features/channels/get';
import { ServerMembersList } from '@features/members/list';
import { MessagesContainer } from '@features/messages/list';
import { SendMessageForm } from '@features/messages/send';
import { ChannelCallRoom } from '@features/webrtc/channel';

export function ChannelPage() {
  const channel = useActiveChannel();

  const authorized = useServerMemberAuthorize();

  if (!channel) return null;

  return (
    <ContentLayout
      header={<ChannelInfoHeader />}
      infoTab={<ServerMembersList />}
    >
      {channel.type === ChannelTypes.TEXT
        ? <>
          <MessagesContainer
            welcomeComponent={<RoomWelcome type={RoomTypes.CHANNEL} name={channel.name} avatarSrc="#" />}
          />
          <SendMessageForm
            placeholder={`Message #${channel.name}`}
            authorized={authorized}
          />
        </>
        : <ChannelCallRoom channel={channel} />
      }
    </ContentLayout>
  );
}