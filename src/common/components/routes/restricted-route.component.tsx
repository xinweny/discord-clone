import { IRootState } from '@app/store';

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function RestrictedRoute() {
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);

  if (isLoggedIn) return <Navigate to="/channels/@me" />
  
  return <Outlet/>;
}