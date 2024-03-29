import { SearchInput } from '@components/ui/forms';

import styles from './conversation-search.module.scss';

export function ConversationSearch() {
  return (
    <div className={styles.container}>
      <SearchInput
        name="query"
        type="text"
        placeholder="Find a conversation"
      />
    </div>
  );
}