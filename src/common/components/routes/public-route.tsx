import { Outlet } from 'react-router-dom';

import { useLoggedInCheck } from '@common/hooks';

export function PublicRoute() {
  const { pending, isLoggedIn } = useLoggedInCheck();

  if (pending) return null;

  return <Outlet context={{ isLoggedIn }} />;
}