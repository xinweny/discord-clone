import { Outlet } from 'react-router-dom';

import { useRefreshTokenQuery } from '@features/auth/api';

export function PublicRoute() {
  const { isLoading, isSuccess } = useRefreshTokenQuery();

  if (isLoading) return null;

  return <Outlet context={{ isLoggedIn: isSuccess }} />;
}