import styles from './conversation-search.module.scss';

export function ConversationSearch() {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Find a conversation"
      />
    </div>
  );
}