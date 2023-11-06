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
          ? <img src="#" alt="Reset" />
          : <img src="#" alt="Search" />
        }
      </button>}
    </div>
  );
}