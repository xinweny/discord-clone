import { useRef } from 'react';

import { usePosAbsolute } from '@hooks';

import { ContextMenu, ContextMenuOptionsData } from '@components/ui/context-menu';

type ContextMenuWrapperProps = {
  options: ContextMenuOptionsData[];
  children: React.ReactNode;
  mode?: 'onContextMenu' | 'onClick';
};

export function ContextMenuWrapper({
  options,
  children,
  mode = 'onContextMenu',
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