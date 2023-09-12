import { MessageData } from '../types';

type MessageBodyProps = {
  message: MessageData;
  hidden?: boolean;
};

export function MessageBody({
  message,
  hidden = false,
}: MessageBodyProps) {
  const { body, updatedAt, createdAt } = message;

  if (hidden) return null;

  return (
    <div>
      <p>{body}</p>
      {(updatedAt !== createdAt) && (
        <p><em>(edited)</em></p>
      )}
    </div>
  );
}