import { MessageData } from '../types';

import { MessageDate } from './message-date';

import styles from './message-header.module.scss';

type MessageHeaderProps = {
  message: MessageData;
  currentDate: Date;
  isDm: boolean;
};

export function MessageHeader({
  message, currentDate, isDm
}: MessageHeaderProps) {
  return (
    <div className={styles.header}>
      <h3>{message[isDm ? 'sender' : 'serverMember']?.displayName}</h3>
      <MessageDate
        currentDate={currentDate}
        messageDate={message.createdAt}
      />
    </div>
  );
}