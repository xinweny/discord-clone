import { useState, useEffect } from 'react';

import { dcApi } from '@app/api';

export const useFetch = <DataTypes>(
  url: string,
  key: string,
): [
  DataTypes | null,
  React.Dispatch<React.SetStateAction<DataTypes | null>>
] => {
  const [data, setData] = useState<DataTypes | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await dcApi.get(url);

      setData(res.data.data[key]);
    }

    fetchData();
  }, []);

  return [data, setData];
};