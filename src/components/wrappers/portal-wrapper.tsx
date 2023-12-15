import { createPortal } from 'react-dom';

import { useClickAway } from '@uidotdev/usehooks';

import { mergeRefs } from '@utils';

import styles from './portal-wrapper.module.scss';

export type ChildOptions = {
  style?: React.CSSProperties;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
};

type PortalWrapperProps = {
  rootId: string;
  isOpen: boolean;
  close?: () => void;
  children: React.ReactNode;
  childOpts?: ChildOptions;
  withClickAway?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function PortalWrapper({
  rootId,
  isOpen,
  close,
  childOpts,
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
    >
      <div
        ref={withClickAway ? mergeRefs(clickAwayRef, childOpts?.ref) : childOpts?.ref}
        className={childOpts?.className}
        style={childOpts?.style}
      >
        {children}
      </div>
    </div>
  ), rootNode);
}