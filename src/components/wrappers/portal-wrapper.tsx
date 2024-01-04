import { createPortal } from 'react-dom';

import styles from './portal-wrapper.module.scss';

type PortalWrapperProps = {
  layer: number;
  isOpen: boolean;
  close?: () => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function PortalWrapper({
  layer,
  isOpen,
  children,
  ...props
}: PortalWrapperProps) {
  const rootNode = document.getElementById(`portal_layer_${layer}`);

  if (!isOpen || !rootNode) return null;

  return createPortal((
    <div
      {...props}
      className={`${styles.wrapper} ${props.className || ''}`}
    >
      {children}
    </div>
  ), rootNode);
}