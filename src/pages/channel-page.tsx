import { ContentLayout } from '@components/layouts';

import { ChannelInfoHeader } from '@features/server/nav';
import { ServerMembersList } from '@features/server/members/list';

export function ChannelPage() {
  return (
    <div>
      <ContentLayout
        header={<ChannelInfoHeader />}
        infoTab={<ServerMembersList />}
      >
        <div>CHANNEL MESSAGES</div>
      </ContentLayout>
    </div>
  );
}