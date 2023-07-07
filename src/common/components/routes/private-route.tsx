import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@common/hooks';

export function PrivateRoute() {
  const isLoggedIn = useAppSelector(state => !!state.auth.userId);

  if (!isLoggedIn) return <Navigate to="/login" />
  
  return <Outlet/>;
}