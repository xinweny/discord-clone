import { MessageData } from '../types';

import { UserProfileButton } from '@features/users/get';
import { ServerMemberProfileButton } from '@features/members/get';

import { MessageDate } from './message-date';

import styles from './message-header.module.scss';

type MessageHeaderProps = {
  message: MessageData;
  currentDate: Date;
  isDm: boolean;
};

export function MessageHeader({
  message,
  currentDate,
  isDm,
}: MessageHeaderProps) {
  const { roomId, serverMember, senderId } = message;
  const memberId = serverMember?._id;

  const title = <h3>{message[isDm ? 'sender' : 'serverMember']?.displayName}</h3>;

  return (
    <div className={styles.header}>
      {isDm
        ? <UserProfileButton userId={senderId}>{title}</UserProfileButton>
        : <ServerMemberProfileButton
          position={{
            direction: 'right',
            align: 'center',
            gap: 8,
          }}
          serverId={roomId}
          memberId={memberId!}
        >
          {title}
        </ServerMemberProfileButton>
      }
      <MessageDate
        currentDate={currentDate}
        messageDate={message.createdAt}
      />
    </div>
  );
}