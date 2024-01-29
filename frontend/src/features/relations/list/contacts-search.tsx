import { SearchInput } from '@components/ui/forms';

import styles from './contacts-search.module.scss';

type ContactsSearchProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export function ContactsSearch({ query, setQuery }: ContactsSearchProps) {
  return (
    <div className={styles.container}>
      <SearchInput
        name="query"
        query={query}
        setQuery={setQuery}
        placeholder="Search"
        showButton
      />
    </div>
  );
}