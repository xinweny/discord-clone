import { MessageData } from '../types';

type MessageBodyProps = {
  message: MessageData;
};

export function MessageBody({
  message
}: MessageBodyProps) {
  return (
    <div>
      <p>{message.body}</p>
      {(message.updatedAt !== message.createdAt) && (
        <p><em>(edited)</em></p>
      )}
    </div>
  );
}