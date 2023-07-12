import { Outlet } from 'react-router-dom';

import {
  useRefreshTokenQuery,
  useGetUserSelfQuery,
} from '@services/api';

import { AppLayout } from '@components/layouts';
import { NavBar } from '@components/ui';

export function AppPage() {
  const auth = useRefreshTokenQuery();

  const user = useGetUserSelfQuery(auth.data!.userId);

  if (user.isLoading) return null;

  return (
    <div>
      <AppLayout navBar={<NavBar servers={user.data?.servers} />}>
        <Outlet context={user.data} />
      </AppLayout>
    </div>
  );
}