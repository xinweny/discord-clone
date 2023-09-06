import { SearchInput } from '@components/ui/forms';

type ContactsSearchProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export function ContactsSearch({ query, setQuery }: ContactsSearchProps) {
  return (
    <SearchInput  
      query={query}
      setQuery={setQuery}
      placeholder="Search"
    />
  );
}