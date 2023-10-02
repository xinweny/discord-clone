import { useActiveIds } from '@hooks';
import { useDisplay } from '@components/hooks';

import { AddNewReactionButton } from '@features/reactions/add';
import { MessageReactionsList } from '@features/reactions/list';

type MessageReactionsBarProps = {
  messageId: string;
  authorized: boolean;
};

export function MessageReactionsBar({ messageId, authorized }: MessageReactionsBarProps) {
  const { hover, visible, hide } = useDisplay();
  const activeTabState = useActiveIds();

  return (
    <div {...hover}>
      <MessageReactionsList messageId={messageId} authorized={authorized} />
      {(visible || activeTabState.id === 'addReaction') && (
        <AddNewReactionButton
          authorized={authorized}
          hide={hide}
          activeTabState={activeTabState}
        />
      )}
    </div>
  );
}