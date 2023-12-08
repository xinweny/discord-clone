import { PortalWrapper } from '@components/wrappers';

import type { ChildOptions } from '@components/wrappers';

import styles from './popup-wrapper.module.scss';

type PopupWrapperProps = {
  isOpen: boolean;
  closePopup: () => void;
  children: React.ReactNode;
  popupOpts?: ChildOptions;
} & React.HTMLAttributes<HTMLDivElement>;

export function PopupWrapper({
  isOpen,
  closePopup,
  children,
  popupOpts,
  ...props
}: PopupWrapperProps) {
  return (
    <PortalWrapper
      rootId="popup-root"
      isOpen={isOpen}
      close={closePopup}
      className={styles.container}
      childOpts={popupOpts}
      {...props}
    >
      {children}
    </PortalWrapper>
  );
}