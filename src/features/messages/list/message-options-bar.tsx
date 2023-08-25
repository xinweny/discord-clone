import { ActiveIdState } from '@hooks';
import { EditMessageButton } from '../edit';

type MessageOptionsBarProps = {
  visible: boolean;
  activeTabState: ActiveIdState;
};

export function MessageOptionsBar({
  visible, activeTabState
}: MessageOptionsBarProps) {
  const { set } = activeTabState;

  if (!visible) return null;

  return (
    <div>
      <EditMessageButton set={set} />
    </div>
  );
}