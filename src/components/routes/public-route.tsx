import { Outlet } from 'react-router-dom';

import { useRefreshTokenQuery } from '@services/api/auth';

export function PublicRoute() {
  const { isLoading, isSuccess } = useRefreshTokenQuery();

  if (isLoading) return null;

  return <Outlet context={{ isLoggedIn: isSuccess }} />;
}