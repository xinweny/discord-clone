import { ActiveIdState } from '@hooks';

import { Tooltip } from '@components/ui/popups';

import { EditMessageButton } from '../edit';
import { DeleteMessageOptionsButton } from '../delete';
import { AddNewReactionButton } from '@features/reactions/add';

import AddReactionIcon from '@assets/icons/add-reaction.svg?react';
import PencilIcon from '@assets/icons/pencil.svg?react';
import TrashCanIcon from '@assets/icons/trash-can.svg?react';

import styles from './message-options-bar.module.scss';

type MessageOptionsBarProps = {
  visible: boolean;
  hide: () => void;
  activeTabState: ActiveIdState;
  refs: {
    deleteMessageBtn: React.RefObject<HTMLButtonElement>;
  };
  authorized: boolean;
};

export function MessageOptionsBar({
  visible,
  hide,
  activeTabState,
  refs,
  authorized,
}: MessageOptionsBarProps) {
  const { set, id } = activeTabState;

  if (!visible && id !== 'addReaction') return null;

  const tooltipProps = {
    direction: 'top' as const,
    options: { gap: 4 },
  };

  return (
    <div className={styles.container}>
      <Tooltip text="Add Reaction" {...tooltipProps}>
        <AddNewReactionButton
          authorized={authorized}
          activeTabState={activeTabState}
          hide={hide}
        >
          <AddReactionIcon />
        </AddNewReactionButton>
      </Tooltip>
      <Tooltip text="Edit Message" {...tooltipProps}>
        <EditMessageButton set={set} id={id}>
          <PencilIcon />
        </EditMessageButton>
      </Tooltip>
      <Tooltip text="Delete Message" {...tooltipProps}>
        <DeleteMessageOptionsButton
          set={set}
          deleteBtnRef={refs.deleteMessageBtn}
        >
          <TrashCanIcon />
        </DeleteMessageOptionsButton>
      </Tooltip>
    </div>
  );
}