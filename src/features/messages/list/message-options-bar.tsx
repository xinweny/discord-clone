import { ActiveIdState } from '@hooks';

import { EditMessageButton } from '../edit';
import { DeleteMessageOptionsButton } from '../delete';
import { AddNewReactionButton } from '@features/reactions/add';

type MessageOptionsBarProps = {
  visible: boolean;
  hide: () => void;
  activeTabState: ActiveIdState;
  refs: {
    deleteMessageBtn: React.RefObject<HTMLButtonElement>;
  };
};

export function MessageOptionsBar({
  visible,
  hide,
  activeTabState,
  refs,
}: MessageOptionsBarProps) {
  const { set, id } = activeTabState;

  if (!visible && id !== 'addReaction') return null;

  return (
    <div>
      <AddNewReactionButton
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