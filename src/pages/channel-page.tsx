import { useParams } from 'react-router-dom';

import { ChannelTypes } from '@features/channels/types';

import { ContentLayout } from '@components/layouts';

import { RoomTypes } from '@components/ui/displays';

import { useSocketRoomJoin, useEmitEvents } from '@hooks';
import { useActiveChannel } from '@features/channels/hooks';
import { useServerMemberAuthorize } from '@features/members/hooks';
import { useGetUserData } from '@features/auth/hooks';

import { RoomWelcome } from '@components/ui/displays';

import { ChannelInfoHeader } from '@features/servers/nav';
import { ServerMembersList } from '@features/members/list';
import { MessagesContainer } from '@features/messages/list';
import { SendMessageForm } from '@features/messages/send';
import { ChannelCallRoom } from '@features/webrtc/channel';

import { NotificationEvent } from '@features/notifications/types';

export function ChannelPage() {
  const { serverId, roomId } = useParams();

  const channel = useActiveChannel();

  const authorized = useServerMemberAuthorize();

  const { user } = useGetUserData();

  useSocketRoomJoin(roomId!);
  
  useEmitEvents({
    [NotificationEvent.UpdateReadStatus]: {
      userId: user.data?._id,
      roomId,
      serverId,
      lastReadAt: Date.now(),
    },
  }, [roomId]);

  if (!channel) return null;

  return (
    <div>
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
    </div>
  );
}