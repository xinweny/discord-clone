import { useState } from 'react'

export type ActiveIdState = {
  id: string | null,
  set: React.Dispatch<React.SetStateAction<string | null>>
};

export const useActiveIds = (): ActiveIdState => {
  const [id, setId] = useState<string | null>(null);

  return {
    id,
    set: setId,
  };
}