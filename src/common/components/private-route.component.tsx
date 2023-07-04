import { IRootState } from '@app/store';

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PrivateRoute() {
  const auth = useSelector((state: IRootState) => state.auth.isLoggedIn);

  if (!auth) return <Navigate to="/login" />
  
  return <Outlet/>;
}