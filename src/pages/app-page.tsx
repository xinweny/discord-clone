import { Outlet } from 'react-router-dom';

import { useGetUserData } from '@hooks';

import { JoinedServersNavbar } from '@features/servers/joined';

import { AppLayout } from '@components/layouts';


export function AppPage() {
  const { user } = useGetUserData();

  if (user.isLoading) return null;

  return (
    <div>
      <AppLayout navBar={<JoinedServersNavbar userId={user.data!.id} />}>
        <Outlet context={user.data} />
      </AppLayout>
    </div>
  );
}