import { useRef } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

import { mergeRefs } from '@utils';

import { PortalWrapper } from '@components/wrappers';

import CrossIcon from '@assets/icons/cross.svg?react';

import styles from './modal-wrapper.module.scss';

type ModalWrapperProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  withClickAway?: boolean;
  className?: string;
  closeBtnRef?: React.RefObject<HTMLButtonElement>;
  hasScroll?: boolean;
  header?: React.ReactNode;
};

export function ModalWrapper({
  isOpen,
  closeModal,
  header,
  children,
  className,
  closeBtnRef,
  withClickAway = true,
  hasScroll = true,
}: ModalWrapperProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickAway = (e: MouseEvent) => {
    e.stopPropagation();

    const { clientX, clientY } = e;
    const { left, right, top, bottom } = modalRef.current!.getBoundingClientRect();

    const contextMenus = Array
      .from(document.getElementById('portal_layer_3')?.childNodes || [])
      .map(child => child.firstChild!);

    if (
      !(
        (clientX >= left && clientX <= right) &&
        (clientY >= top && clientY <= bottom)
      ) &&
      !contextMenus.some(menu => menu.contains(e.target as Node))
    ) closeModal();
  };

  const clickAwayRef = useClickAway(handleClickAway as (e: Event) => void) as React.RefObject<HTMLDivElement>;

  return (
    <PortalWrapper
      layer={1}
      isOpen={isOpen}
      className={styles.container}
    >
      <div
        className={`${styles.modal} ${className || ''} ${hasScroll ? styles.scroll : ''}`}
        ref={mergeRefs(modalRef, withClickAway ? clickAwayRef : undefined)}
      >
        {header}
        {children}
        {closeBtnRef && (
          <button ref={closeBtnRef} type="button" onClick={closeModal}>
            <CrossIcon />
          </button>
        )}
      </div>
    </PortalWrapper>
  );
}