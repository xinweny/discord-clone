import { useRef } from 'react';

import { usePosAbsolute } from '../../hooks';

import { ContextMenu, ContextMenuOptionsData } from '.';
import { PortalWrapper } from '@components/wrappers';

import styles from './context-menu-wrapper.module.scss';

type ContextMenuWrapperProps = {
  options: ContextMenuOptionsData[];
  children: React.ReactNode;
  mode?: 'onContextMenu' | 'onClick';
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
};

export function ContextMenuWrapper({
  options,
  children,
  mode = 'onContextMenu',
  className,
  onOpen,
  onClose,
}: ContextMenuWrapperProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const {
    posData,
    openAbsElement,
    absElementRef,
    absStyle,
    closeAbsElement,
  } = usePosAbsolute(targetRef);

  const handler = {
    [mode]: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (onOpen) onOpen();
      openAbsElement(e);
    },
  };

  return (
    <div className={styles.wrapper}>
      <div
        ref={targetRef}
        {...handler}
        className={className}
        role="button"
      >
        {children}
      </div>
      <PortalWrapper
        layer={3}
        isOpen={posData.visible}
      >
        <ContextMenu
          options={options}
          contextMenuRef={absElementRef}
          menuStyle={absStyle}
          closeContextMenu={() => {
            closeAbsElement();
            if (onClose) onClose();
          }}
        />
      </PortalWrapper>
    </div>
  );
}