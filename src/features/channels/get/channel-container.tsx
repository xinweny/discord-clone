import { type ChannelData, ChannelTypes } from '../types';

import { useServerMemberAuthorize } from '@features/members/hooks';

import { RoomTypes } from '@components/ui/displays';
import { RoomWelcome } from '@components/ui/displays';

import { MessagesContainer } from '@features/messages/list';
import { ChannelCallRoom } from '@features/webrtc/channel';

import styles from './channel-container.module.scss';

type ChannelContainerProps = {
  serverId: string | undefined;
  channel: ChannelData;
};

export function ChannelContainer({ serverId, channel }: ChannelContainerProps) {
  const authorized = useServerMemberAuthorize({ skip: !serverId });

  return (
    <div className={styles.container}>
      {channel.type === ChannelTypes.TEXT
        ? <MessagesContainer
            welcomeComponent={<RoomWelcome type={RoomTypes.CHANNEL} name={channel.name} avatarSrc="#" />}
            formPlaceholder={`Message #${channel.name}`}
            authorized={authorized}
          />
        : <ChannelCallRoom channel={channel} />
      }
    </div>
  );
}