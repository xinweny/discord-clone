import { useStateContext } from '@context';

import { Tooltip } from '@components/ui/popups';

import styles from './channel-header-buttons.module.scss';

import MembersIcon from '@assets/icons/members.svg?react';

export function ChannelHeaderButtons() {
  const [showPanel, setShowPanel] = useStateContext()!

  return (
    <div className={styles.container}>
      <Tooltip
        text={`${showPanel ? 'Hide' : 'Show'} Member List`}
        direction="bottom"
        gap={2}
      >
        <button
          onClick={() => setShowPanel((prev: boolean) => !prev)}
          className={showPanel ? styles.active : undefined}
        >
          <MembersIcon />
        </button>
      </Tooltip>
    </div>
  );
}