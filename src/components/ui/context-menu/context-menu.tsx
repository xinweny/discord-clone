import { useRef } from 'react';
import { useClickAway } from '@uidotdev/usehooks';

import type { AbsStyleData } from '@components/hooks';

import { ContextMenuItem } from './context-menu-item';

export type ContextMenuOptionsData = {
  label: string;
  action: () => void;
};

type ContextMenuProps = {
  options: ContextMenuOptionsData[];
  contextMenuRef: React.RefObject<HTMLDivElement>;
  menuStyle: AbsStyleData;
  closeContextMenu: () => void;
};

export function ContextMenu({
  options,
  contextMenuRef,
  menuStyle,
  closeContextMenu,
}: ContextMenuProps) {
  const clickAwayRef = useClickAway<HTMLUListElement>(closeContextMenu);


  return (
    <div
      ref={contextMenuRef}
      style={menuStyle}
    >
      <ul ref={clickAwayRef}>
        {options.map(({ label, action }) => 
          <ContextMenuItem
            key={label}
            label={label}
            action={action}
            closeMenu={closeContextMenu}
          />
        )}
      </ul>
    </div>
  );
}