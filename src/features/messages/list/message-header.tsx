import { MessageData } from '../types';

import { MessageDate } from './message-date';

type MessageHeaderProps = {
  message: MessageData;
  currentDate: Date;
  isDm: boolean;
};

export function MessageHeader({
  message, currentDate, isDm
}: MessageHeaderProps) {
  return (
    <div>
      <p><strong>{message[isDm ? 'sender' : 'serverMember']?.displayName}</strong></p>
      <MessageDate
        currentDate={currentDate}
        messageDate={message.createdAt}
      />
    </div>
  );
}