import { ContentLayout } from '@components/layouts';

export function ChannelPage() {
  return (
    <div>
      <ContentLayout
        header={<div>channel info</div>}
        infoTab={<div>members list</div>}
      >
        <div>CHANNEL MESSAGES</div>
      </ContentLayout>
    </div>
  );
}