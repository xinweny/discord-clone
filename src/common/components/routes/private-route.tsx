import { RootState } from '@app/store';

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PrivateRoute() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.userId);

  if (!isLoggedIn) return <Navigate to="/login" />
  
  return <Outlet/>;
}