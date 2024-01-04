import { createPortal } from 'react-dom';

import { useClickAway } from '@uidotdev/usehooks';

import styles from './portal-wrapper.module.scss';

type PortalWrapperProps = {
  rootId: string;
  isOpen: boolean;
  close?: () => void;
  children: React.ReactNode;
  withClickAway?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function PortalWrapper({
  rootId,
  isOpen,
  close,
  children,
  withClickAway = false,
  ...props
}: PortalWrapperProps) {
  const rootNode = document.getElementById(rootId);

  const clickAwayRef = useClickAway((e) => {
    e.stopPropagation();
    close && close();
  }) as React.RefObject<HTMLDivElement>;

  if (!isOpen || !rootNode) return null;

  return createPortal((
    <div
      {...props}
      className={`${styles.wrapper} ${props.className || ''}`}
      ref={withClickAway ? clickAwayRef : undefined}
    >
      {children}
    </div>
  ), rootNode);
}