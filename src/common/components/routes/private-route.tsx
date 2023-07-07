import { Navigate, Outlet } from 'react-router-dom';

import { useLoggedInCheck } from '@common/hooks';

export function PrivateRoute() {
  const { pending, isLoggedIn } = useLoggedInCheck();

  if (pending) return null;
  
  return (!isLoggedIn)
    ? <Navigate to="/login" />
    : <Outlet />;
}