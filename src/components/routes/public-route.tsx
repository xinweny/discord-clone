import { Outlet } from 'react-router-dom';

import { useRefreshTokenQuery } from '@features/auth/api';

export type LoggedInContext = { isLoggedIn: boolean };

export function PublicRoute() {
  const { isLoading, isSuccess } = useRefreshTokenQuery();

  if (isLoading) return null;

  return <Outlet context={{ isLoggedIn: isSuccess }} />;
}