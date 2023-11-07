import CrossIcon from '@assets/icons/cross.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';

import styles from './search-input.module.scss';

type SearchInputProps = {
  query?: string;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
  showButton?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({
  query,
  setQuery,
  showButton = false,
  ...props
}: SearchInputProps) {
  return (
    <div className={styles.input}>
      <input
        type="text"
        {...props}
        onChange={(e) => { setQuery && setQuery(e.target.value); }}
        value={query}
      />
      {showButton && <button
        type="button"
        onClick={() => { setQuery && setQuery(''); }}
        disabled={query?.length === 0}
      >
        {query && query.length > 0
          ? <CrossIcon />
          : <SearchIcon />
        }
      </button>}
    </div>
  );
}