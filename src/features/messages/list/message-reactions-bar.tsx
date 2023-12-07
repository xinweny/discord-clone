import { useActiveIds } from '@hooks';
import { useDisplay } from '@components/hooks';

import { Tooltip } from '@components/ui/popups';

import { AddNewReactionButton } from '@features/reactions/add';
import { MessageReactionsList } from '@features/reactions/list';

import SmileyIcon from '@assets/icons/smiley.svg?react';

import styles from './message-reactions-bar.module.scss';

type MessageReactionsBarProps = {
  messageId: string;
  authorized: boolean;
};

export function MessageReactionsBar({ messageId, authorized }: MessageReactionsBarProps) {
  const { hover, visible, hide } = useDisplay();
  const activeTabState = useActiveIds();

  return (
    <div {...hover} className={styles.container}>
      <MessageReactionsList messageId={messageId} authorized={authorized} />
      {(visible || activeTabState.id === 'addReaction') && (
        <div className={styles.button}>
          <Tooltip text="Add Reaction" direction="top" gap={2}>
            <AddNewReactionButton
              authorized={authorized}
              hide={hide}
              activeTabState={activeTabState}
              position={{
                direction: 'right',
                align: 'center',
                gap: 2,
              }}
            >
              <SmileyIcon />
            </AddNewReactionButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
}