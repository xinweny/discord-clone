import { createPortal } from 'react-dom';
import { ClickAwayListener } from '@mui/material';

import styles from './portal-wrapper.module.scss';

type PortalWrapperProps = {
  rootId: string;
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function PortalWrapper({
  rootId,
  isOpen,
  close,
  children,
  ...props
}: PortalWrapperProps) {
  const rootNode = document.getElementById(rootId);

  if (!isOpen || !rootNode) return null;

  return createPortal((
    <div {...props} className={`${styles.wrapper} ${props.className || ''}`}>
      <ClickAwayListener onClickAway={close}>
        <div>
          {children}
        </div>
      </ClickAwayListener>
    </div>
  ), rootNode);
}