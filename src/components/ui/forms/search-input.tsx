type SearchInputProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({
  query,
  setQuery,
  ...props
}: SearchInputProps) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => { setQuery(e.target.value); }}
      {...props}
    />
  );
}