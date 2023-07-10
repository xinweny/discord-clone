import { useState, useEffect } from 'react';

import { useAppDispatch } from '.';

import { refreshAccessToken } from '@features/auth/ducks/actions';

export const useLoggedInCheck = () => {
  const [pending, setPending] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const res = await dispatch(refreshAccessToken());

        if (res.meta.requestStatus === 'fulfilled') setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }

      setPending(false);
    };

    verifyRefreshToken();

    // return () => { console.clear() }
  }, []);

  return { pending, isLoggedIn };
};