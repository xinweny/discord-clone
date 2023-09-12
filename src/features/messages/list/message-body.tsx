import { MessageData } from '../types';

type MessageBodyProps = {
  message: MessageData;
};

export function MessageBody({
  message
}: MessageBodyProps) {
  const { body, updatedAt, createdAt } = message;

  const isTenorGif = body.match(/^https:\/\/media\.tenor\.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9-]+\.gif$/);

  return (
    <div>
      {isTenorGif
        ? <img src={body} />
        : <p>{body}</p>
      }
      {(updatedAt !== createdAt) && (
        <p><em>(edited)</em></p>
      )}
    </div>
  );
}