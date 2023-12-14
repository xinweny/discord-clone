import { useMessageContext } from '../context';

import { Avatar } from '@components/ui/media';
import {
  MessageHeader,
  MessageBody,
  AttachmentsPreview,
} from '../list';

export function DeleteMessagePreview() {
  const message = useMessageContext();

  if (!message) return null;

  return (
    <div onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}>
      <Avatar src={message.sender.avatarUrl} />
      <div>
        <MessageHeader
          message={message}
          isDm={message.type === 'dm'}
          currentDate={new Date()}
        />
        <MessageBody message={message} />
        <AttachmentsPreview attachments={message.attachments} downloadable={false} />
      </div>
    </div>
  );
}