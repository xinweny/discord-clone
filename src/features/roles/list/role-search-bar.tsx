import { Input } from '@components/ui/forms';

import CrossIcon from '@assets/icons/cross.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';

import styles from './role-search-bar.module.scss';

type RoleSearchBar = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export function RoleSearchBar({
  query, setQuery, placeholder
}: RoleSearchBar) {
  return (
    <div className={styles.container}>
      <Input
        name="query"
        id="role-search-query"
        label="Search Roles"
        placeholder={placeholder}
        value={query}
        onChange={e => { setQuery(e.target.value); }}
        autoFocus
      />
      <button onClick={() => { setQuery(''); }} disabled={!query}>
        {query ? <CrossIcon /> : <SearchIcon />}
      </button>
    </div>
  )
}