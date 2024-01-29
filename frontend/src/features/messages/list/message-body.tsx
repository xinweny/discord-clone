import { Slate, Editable } from 'slate-react';

import type { MessageData } from '../types';

import { useEditor } from '../hooks';

import { slateDeserialize, decorator } from '../slate';

import { Leaf, Element } from '../send';

import styles from './message-body.module.scss';

type MessageBodyProps = {
  message: MessageData;
  hidden?: boolean;
};

export function MessageBody({
  message,
  hidden = false,
}: MessageBodyProps) {
  const { updatedAt, createdAt } = message;

  const { editor } = useEditor();

  if (hidden) return null;

  return (
    <div className={styles.container}>
      <Slate
        editor={editor}
        initialValue={slateDeserialize(message)}
      >
        <Editable
          renderLeaf={Leaf}
          renderElement={Element}
          decorate={decorator}
          readOnly
        />
      </Slate>
      {(updatedAt !== createdAt) && (
        <p className={styles.edited}>(edited)</p>
      )}
    </div>
  );
}