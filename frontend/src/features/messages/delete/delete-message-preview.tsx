import { useMessageContext } from '../context';

import { MessageCard } from '../list';

import styles from './delete-message-preview.module.scss';

export function DeleteMessagePreview() {
  const message = useMessageContext();

  if (!message) return null;

  return (
    <MessageCard
      message={message}
      currentDate={new Date()}
      prev={undefined}
      className={styles.preview}
      isDm={!message.serverId}
    />
  );
}