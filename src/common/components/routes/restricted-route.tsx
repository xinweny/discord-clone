import { Navigate, Outlet } from 'react-router-dom';

import { useLoggedInCheck } from '@common/hooks';

export function RestrictedRoute() {
  const { pending, isLoggedIn } = useLoggedInCheck();

  if (pending) return null;
  
  return (isLoggedIn)
    ? <Navigate to="/channels/@me" />
    : <Outlet/>;
}