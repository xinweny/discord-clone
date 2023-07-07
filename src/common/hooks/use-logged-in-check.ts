import { useState, useEffect } from 'react';

import { dcApi } from '@app/api';

export const useLoggedInCheck = () => {
  const [pending, setPending] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      const res = await dcApi.get('/auth/whoami', { withCredentials: true });

      const userId = res.data.data;

      setIsLoggedIn(!!userId);
      setPending(false);
    };

    verifyRefreshToken();
  }, []);

  return { pending, isLoggedIn };
};