import { Outlet } from 'react-router-dom';

import { MainLayout } from '@components/layouts';

import { useSetChannels } from '@hooks';

import { ServerNavBar } from '@features/server/nav';

export function ServerPage() {
  const { channels, activeChannel } = useSetChannels();

  if (!channels.isSuccess) return null;

  return (
    <div>
      <MainLayout sideBar={<ServerNavBar />}>
        <Outlet context={{
          activeChannel,
        }} />
      </MainLayout>
    </div>
  );
}