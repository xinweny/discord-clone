import styles from './context-menu-item.module.scss';

type ContextMenuItemProps = {
  label: string;
  action: () => void;
  closeMenu: () => void;
  authorized?: boolean;
  className?: string;
};

export function ContextMenuItem({
  label,
  action,
  closeMenu,
  authorized = true,
  className,
}: ContextMenuItemProps) {
  if (!authorized) return null;

  return (
    <li key={label} className={`${styles.item} ${className || ''}`}>
      <button
        onClick={() => {
          closeMenu();
          action();
        }}
      >
        <span>{label}</span>
      </button>
    </li>
  );
}