import { ClickAwayListener } from '@mui/material';

import type { ContextData } from '@hooks';

import { ContextMenuItem } from './context-menu-item';

export type ContextMenuOptionsData = {
  label: string;
  action: () => void;
};

type ContextMenuProps = {
  options: ContextMenuOptionsData[];
  contextMenuRef: React.RefObject<HTMLDivElement>;
  contextData: ContextData;
  closeContextMenu: () => void;
};

export function ContextMenu({
  options,
  contextMenuRef,
  contextData,
  closeContextMenu,
}: ContextMenuProps) {
  return (
    <ClickAwayListener onClickAway={closeContextMenu}>
      <div
        ref={contextMenuRef}
        className='contextMenu'
        style={{
          display:`${contextData.visible ? 'block' : 'none'}`,
          left: contextData.posX,
          top: contextData.posY,
        }}
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