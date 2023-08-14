type ContextMenuItemProps = {
  label: string;
  action: () => void;
  closeMenu: () => void;
  authorized?: boolean;
};

export function ContextMenuItem({
  label,
  action,
  closeMenu,
  authorized = true,
}: ContextMenuItemProps) {
  if (!authorized) return null;

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