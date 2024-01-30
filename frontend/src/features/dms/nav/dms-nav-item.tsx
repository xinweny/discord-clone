import styles from './dms-nav-item.module.scss';

type DmNavsItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}

export function DmsNavItem({
  icon,
  children,
  isActive,
  className = '',
}: DmNavsItemProps) {
  return (
    <div className={`${className} ${styles.item} ${isActive ? styles.active : ''}`}>
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.text}>
        {children}
      </div>
    </div>
  );
}