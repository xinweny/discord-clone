import { IRootState } from '@app/store';

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PrivateRoute() {
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/login" />
  
  return <Outlet/>;
}