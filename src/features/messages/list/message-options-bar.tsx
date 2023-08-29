import { ActiveIdState } from '@hooks';

import { EditMessageButton } from '../edit';
import { DeleteMessageOptionsButton } from '../delete';
import { AddNewReactionButton } from '@features/reactions/add';

type MessageOptionsBarProps = {
  visible: boolean;
  activeTabState: ActiveIdState;
  refs: {
    deleteMessageBtn: React.RefObject<HTMLButtonElement>;
  };
};

export function MessageOptionsBar({
  visible,
  activeTabState,
  refs,
}: MessageOptionsBarProps) {
  const { set, id } = activeTabState;

  if (!visible && id !== 'addReaction') return null;

  return (
    <div>
      <AddNewReactionButton set={set} />
      <EditMessageButton set={set} />
      <DeleteMessageOptionsButton
        set={set}
        deleteBtnRef={refs.deleteMessageBtn}
      />
    </div>
  );
}