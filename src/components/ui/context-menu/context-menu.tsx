import { ClickAwayListener } from '@mui/material';

import type { AbsStyleData } from '@hooks';

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
  return (
    <ClickAwayListener onClickAway={closeContextMenu}>
      <div
        ref={contextMenuRef}
        className='contextMenu'
        style={menuStyle}
      >
        <ul>
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
    </ClickAwayListener>
  );
}