import { useState, useEffect } from 'react';

import { dcApi } from '@app/api';

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await dcApi.get(url);

      setData(res.data.data);
    }

    fetchData();
  }, []);

  return [data, setData];
};