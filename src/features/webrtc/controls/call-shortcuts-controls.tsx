import { ToggleCameraButton, ToggleScreenShareButton } from '.';

import styles from './call-shortcuts-controls.module.scss';

export function CallShortcutsControls() {
  return (
    <div className={styles.container}>
      <ToggleCameraButton
        className={styles.button}
        activeClassName={styles.active}
      />
      <ToggleScreenShareButton
        className={styles.button}
        activeClassName={styles.active}
      />
    </div>
  );
}