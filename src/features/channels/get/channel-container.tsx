import { type ChannelData, ChannelTypes } from '../types';

import { useServerMemberAuthorize } from '@features/members/hooks';

import { RoomTypes } from '@components/ui/displays';
import { RoomWelcome } from '@components/ui/displays';

import { MessagesContainer } from '@features/messages/list';

import styles from './channel-container.module.scss';

import HashIcon from '@assets/icons/hash.svg?react';

type ChannelContainerProps = {
  serverId: string | undefined;
  channel: ChannelData;
};

export function ChannelContainer({ serverId, channel }: ChannelContainerProps) {
  const authorized = useServerMemberAuthorize({ skip: !serverId });

  if (channel.type === ChannelTypes.VOICE) return null;

  return (
    <div className={styles.container}>
      <MessagesContainer
        welcomeComponent={<RoomWelcome
          type={RoomTypes.CHANNEL}
          name={channel.name}
          imgComponent={<HashIcon />}
        />}
        formPlaceholder={`Message #${channel.name}`}
        authorized={authorized}
      />
    </div>
  );
}