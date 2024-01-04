import { createPortal } from 'react-dom';

import { useClickAway } from '@uidotdev/usehooks';

import styles from './portal-wrapper.module.scss';

type PortalWrapperProps = {
  layer: number;
  isOpen: boolean;
  close?: () => void;
  children: React.ReactNode;
  withClickAway?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function PortalWrapper({
  layer,
  isOpen,
  close,
  children,
  withClickAway = false,
  ...props
}: PortalWrapperProps) {
  const rootNode = document.getElementById(`portal_layer_${layer}`);

  const clickAwayRef = useClickAway((e) => {
    e.stopPropagation();
    close && close();
  }) as React.RefObject<HTMLDivElement>;

  if (!isOpen || !rootNode) return null;

  return createPortal((
    <div
      {...props}
      className={`${styles.wrapper} ${props.className || ''}`}
    >
      <div ref={withClickAway ? clickAwayRef : undefined}>
        {children}
      </div>
    </div>
  ), rootNode);
}