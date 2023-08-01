import { Outlet } from 'react-router-dom';

import { useGetUserData } from '@hooks';

import { ServersNavBar } from '@features/servers/nav';

import { AppLayout } from '@components/layouts';


export function AppPage() {
  const { user } = useGetUserData();

  if (user.isLoading) return null;

  return (
    <div>
      <AppLayout navBar={<ServersNavBar userId={user.data!.id} />}>
        <Outlet context={user.data} />
      </AppLayout>
    </div>
  );
}