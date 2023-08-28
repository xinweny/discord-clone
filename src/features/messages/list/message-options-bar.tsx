import { ActiveIdState } from '@hooks';

import { EditMessageButton } from '../edit';
import { DeleteMessageOptionsButton } from '../delete';

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
  const { set } = activeTabState;

  if (!visible) return null;

  return (
    <div>
      <EditMessageButton set={set} />
      <DeleteMessageOptionsButton
        set={set}
        deleteBtnRef={refs.deleteMessageBtn}
      />
    </div>
  );
}