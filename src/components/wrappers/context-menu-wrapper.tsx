import { useRef } from 'react';

import { usePosAbsolute } from '../hooks';

import { ContextMenu, ContextMenuOptionsData } from '@components/ui/context-menu';

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
    openAbsElement,
    absElementRef,
    absStyle,
    closeAbsElement,
  } = usePosAbsolute(targetRef);

  const handler = { [mode]: openAbsElement };

  return (
    <div>
      <div
        ref={targetRef}
        {...handler}
        className={className}
      >
        {children}
      </div>
      <ContextMenu
        options={options}
        contextMenuRef={absElementRef}
        menuStyle={absStyle}
        closeContextMenu={closeAbsElement}
      />
    </div>
  );
}