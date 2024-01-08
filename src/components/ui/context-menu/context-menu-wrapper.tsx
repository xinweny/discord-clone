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
};

export function ContextMenuWrapper({
  options,
  children,
  mode = 'onContextMenu',
  className,
}: ContextMenuWrapperProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const {
    posData,
    openAbsElement,
    absElementRef,
    absStyle,
    closeAbsElement,
  } = usePosAbsolute(targetRef);

  const handler = { [mode]: openAbsElement };

  return (
    <div className={styles.wrapper}>
      <div
        ref={targetRef}
        {...handler}
        className={className}
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
          closeContextMenu={closeAbsElement}
        />
      </PortalWrapper>
    </div>
  );
}