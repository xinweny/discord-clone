import { Navigate, Outlet } from 'react-router-dom';

import { useRefreshTokenQuery } from '@features/auth/api';

export function PrivateRoute() {
  const { isLoading, isSuccess } = useRefreshTokenQuery();

  if (isLoading) return null;
  
  return (!isSuccess)
    ? <Navigate to="/login" />
    : <Outlet />;
}