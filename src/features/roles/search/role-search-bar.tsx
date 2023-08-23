import { Input } from '@components/ui/forms';

type RoleSearchBar = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export function RoleSearchBar({
  query, setQuery, placeholder
}: RoleSearchBar) {
  return (
    <div>
      <Input
        name="query"
        id="role-search-query"
        label="Search Roles"
        placeholder={placeholder}
        value={query}
        onChange={e => { setQuery(e.target.value); }}
      />
      {query
        ? <button onClick={() => { setQuery(''); }}><img src="#" alt="Clear" /></button>
        : <img src="#" alt="Search" />
      }
    </div>
  )
}