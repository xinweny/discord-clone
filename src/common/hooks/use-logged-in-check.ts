import { useState, useEffect } from 'react';
import { useAppSelector } from './use-app-selector';

import { dcApi } from '@app/api';

export const useLoggedInCheck = () => {
  const pending = useAppSelector(state => state.auth.isPending);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      const res = await dcApi.get('/auth/whoami', { withCredentials: true });

      const userId = res.data.data;

      setIsLoggedIn(!!userId);
    };

    verifyRefreshToken();
  }, []);

  return { pending, isLoggedIn };
};