import { ContentLayout, MainLayout } from '@components/layouts';

export function ChannelPage() {
  return (
    <div>
      <MainLayout sideBar={<div>channels</div>}>
        <ContentLayout
          header={<div>channel info</div>}
          infoTab={<div>members list</div>}
        >
          <div>CHANNEL MESSAGES</div>
        </ContentLayout>
      </MainLayout>
    </div>
  );
}