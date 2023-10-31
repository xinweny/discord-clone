import { Outlet } from 'react-router-dom';

import { MainLayout } from '@components/layouts';

import { DmsNavBar } from '@features/dms/nav';

export function DashboardPage() {
  return (
    <MainLayout sideBar={<DmsNavBar />}>
      <Outlet />
    </MainLayout>
  );
}