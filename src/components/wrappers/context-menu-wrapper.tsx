import { useRef } from 'react';

import { useContextMenu } from '@hooks';

import { ContextMenu, ContextMenuOptionsData } from '@components/ui/context-menu';

type ContextMenuWrapperProps = {
  options: ContextMenuOptionsData[];
  children: React.ReactNode;
};

export function ContextMenuWrapper({
  options, children
}: ContextMenuWrapperProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const {
    openContextMenu,
    ...contextMenuProps
  } = useContextMenu(targetRef);

  return (
    <div>
      <div
        ref={targetRef}
        onContextMenu={openContextMenu}
      >
        {children}
      </div>
      <ContextMenu
        options={options}
        {...contextMenuProps}
      />
    </div>
  );
}