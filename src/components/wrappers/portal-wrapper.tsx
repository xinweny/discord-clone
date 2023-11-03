import { createPortal } from 'react-dom';
import { useClickAway } from '@uidotdev/usehooks';

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

  const ref = useClickAway(close) as React.RefObject<HTMLDivElement>;

  if (!isOpen || !rootNode) return null;

  return createPortal((
    <div {...props} className={`${styles.wrapper} ${props.className || ''}`}>
      <div ref={ref}>
        {children}
      </div>
    </div>
  ), rootNode);
}