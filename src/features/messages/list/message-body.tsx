import { MessageData } from '../types';

import { jsxDeserialize } from '../slate';

import { Emoji } from '@components/ui/media';

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

  const nodes = jsxDeserialize(message);

  return (
    <div>
      <div>{nodes.map(node => <span
        key={node.id}
        style={{ whiteSpace: 'pre-line' }}
      >
        {('emoji' in node)
          ? <Emoji
            custom={node.emoji.custom}
            emoji={node.emoji.custom ? node.emoji.url : node.emoji.id}
          />
          : node.text}
      </span>)}</div>
      {(updatedAt !== createdAt) && (
        <p><em>(edited)</em></p>
      )}
    </div>
  );
}