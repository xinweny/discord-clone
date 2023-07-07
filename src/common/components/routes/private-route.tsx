import { Navigate, Outlet } from 'react-router-dom';

import { socket } from '@app';

import { useLoggedInCheck } from '@common/hooks';

export function PrivateRoute() {
  const { pending, isLoggedIn } = useLoggedInCheck();

  if (pending) return null;

  if (isLoggedIn) socket.connect();
  
  return (!isLoggedIn)
    ? <Navigate to="/login" />
    : <Outlet />;
}