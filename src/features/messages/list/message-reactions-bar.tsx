import { useHover } from '@uidotdev/usehooks';

import { useActiveIds } from '@hooks';

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
  const [hoverRef, isHovering] = useHover();

  const activeTabState = useActiveIds();

  return (
    <div ref={hoverRef} className={styles.container}>
      <MessageReactionsList messageId={messageId} authorized={authorized} />
      {(isHovering || activeTabState.id === 'addReaction') && (
        <div className={styles.button}>
          <Tooltip text="Add Reaction" direction="top" gap={2}>
            <AddNewReactionButton
              authorized={authorized}
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