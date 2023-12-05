import { ActiveIdState } from '@hooks';

import { EditMessageButton } from '../edit';
import { DeleteMessageOptionsButton } from '../delete';
import { AddNewReactionButton } from '@features/reactions/add';

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

  return (
    <div className={styles.container}>
      <AddNewReactionButton
        authorized={authorized}
        activeTabState={activeTabState}
        hide={hide}
      />
      <EditMessageButton set={set} />
      <DeleteMessageOptionsButton
        set={set}
        deleteBtnRef={refs.deleteMessageBtn}
      />
    </div>
  );
}