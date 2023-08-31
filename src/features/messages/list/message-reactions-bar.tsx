import { useDisplay, useActiveIds } from '@hooks';

import { AddNewReactionButton } from '@features/reactions/add';
import { MessageReactionsList } from '@features/reactions/list';

type MessageReactionsBarProps = {
  messageId: string;
};

export function MessageReactionsBar({ messageId }: MessageReactionsBarProps) {
  const { hover, visible, hide } = useDisplay();
  const activeTabState = useActiveIds();

  return (
    <div {...hover}>
      <MessageReactionsList messageId={messageId} />
      {(visible || activeTabState.id === 'addReaction') && (
        <AddNewReactionButton
          hide={hide}
          activeTabState={activeTabState}
        />
      )}
    </div>
  );
}