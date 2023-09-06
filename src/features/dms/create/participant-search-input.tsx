import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { SearchInput } from '@components/ui/forms';

type ParticipantSearchInputProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}

export function ParticipantSearchInput({
  query, setQuery, name
}: ParticipantSearchInputProps) {
  const { watch } = useFormContext();

  const participantIds = watch(name);

  useEffect(() => {
    setQuery('');
  }, [participantIds]);

  return (
    <SearchInput  
      query={query}
      setQuery={setQuery}
      placeholder="Type the username of a friend"
    />
  );
}