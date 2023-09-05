type ContactsSearchProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export function ContactsSearch({ query, setQuery }: ContactsSearchProps) {
  return (
    <input
      type="text"
      value={query}
      placeholder="Search"
      onChange={(e) => { setQuery(e.target.value); }}
    />
  );
}