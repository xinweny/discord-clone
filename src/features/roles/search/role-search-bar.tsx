import { Input } from '@components/ui/forms';

type RoleSearchBar = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function RoleSearchBar({ 
  setQuery
}: RoleSearchBar) {
  return (
    <div>
      <Input
        name="query"
        id="role-search-query"
        label="Search Roles"
        placeholder="Search Roles"
        onChange={e => { setQuery(e.target.value); }}
      />
      <img src="#" alt="Search" />
    </div>
  )
}