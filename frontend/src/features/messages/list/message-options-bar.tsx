import { ActiveIdState } from '@hooks';

import { Tooltip } from '@components/ui/popups';

import { EditMessageButton } from '../edit';
import { DeleteMessageOptionsButton } from '../delete';
import { AddNewReactionButton } from '@features/reactions/add';

import { useMessageAuthorize } from '../hooks';

import AddReactionIcon from '@assets/icons/add-reaction.svg?react';
import PencilIcon from '@assets/icons/pencil.svg?react';
import TrashCanIcon from '@assets/icons/trash-can.svg?react';

import styles from './message-options-bar.module.scss';

type MessageOptionsBarProps = {
  visible: boolean;
  activeTabState: ActiveIdState;
  refs: {
    deleteMessageBtn: React.RefObject<HTMLButtonElement>;
  };
  authorized: boolean;
};

export function MessageOptionsBar({
  visible,
  activeTabState,
  refs,
  authorized,
}: MessageOptionsBarProps) {
  const { set, id } = activeTabState;

  const msgAuthorized = useMessageAuthorize();

  if ((!visible && id == null) || id === 'editMessage') return null;

  const tooltipProps = {
    direction: 'top' as const,
    gap: 8,
  };

  return (
    <div className={styles.container}>
      <AddNewReactionButton
        authorized={authorized}
        activeTabState={activeTabState}
        position={{
          direction: 'left',
          align: 'start',
          gap: 8,
        }}
        className={id === 'addReaction' ? styles.active : undefined}
      >
        <Tooltip text="Add Reaction" {...tooltipProps}>
          <AddReactionIcon />
        </Tooltip>
      </AddNewReactionButton>
      {msgAuthorized && <>
        <EditMessageButton set={set} id={id}>
          <Tooltip text="Edit Message" {...tooltipProps}>
            <PencilIcon />
          </Tooltip>
        </EditMessageButton>
        <DeleteMessageOptionsButton
          set={set}
          deleteBtnRef={refs.deleteMessageBtn}
        >
          <Tooltip text="Delete Message" {...tooltipProps}>
            <TrashCanIcon />
          </Tooltip>
        </DeleteMessageOptionsButton>
      </>}
    </div>
  );
}