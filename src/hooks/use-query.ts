import { useState } from 'react';

export const useQuery = () => {
  const [query, setQuery] = useState<string>('');

  const reset = () => { setQuery(''); };

  return {
    query,
    setQuery,
    reset,
  };
};