import { createPortal } from 'react-dom';

import styles from './portal-wrapper.module.scss';

type PortalWrapperProps = {
  layer: number;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  close?: () => void;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function PortalWrapper({
  layer,
  isOpen,
  children,
  wrapperRef,
  ...props
}: PortalWrapperProps) {
  const rootNode = document.getElementById(`portal_layer_${layer}`);

  if (!isOpen || !rootNode) return null;

  return createPortal((
    <div
      {...props}
      className={`${styles.wrapper} ${props.className || ''}`}
      ref={wrapperRef}
    >
      {children}
    </div>
  ), rootNode);
}