type ContextMenuItemProps = {
  label: string;
  action: () => void;
  closeMenu: () => void;
};

export function ContextMenuItem({
  label, action, closeMenu
}: ContextMenuItemProps) {
  return (
    <li key={label}>
      <button
        onClick={() => {
          closeMenu();
          action();
        }}
      >
        {label}
      </button>
    </li>
  );
}