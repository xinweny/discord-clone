import { useState } from 'react'

export type ActiveIdState = {
  id: string | null,
  set: React.Dispatch<React.SetStateAction<string | null>>
};

export const useActiveIds = (initialId?: string): ActiveIdState => {
  const [id, setId] = useState<string | null>(initialId || null);

  return {
    id,
    set: setId,
  };
}