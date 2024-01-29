import styles from './dms-nav-item.module.scss';

type DmNavsItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}

export function DmsNavItem({ icon, children, isActive }: DmNavsItemProps) {
  return (
    <div className={`${styles.item} ${isActive ? styles.active : ''}`}>
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.text}>
        {children}
      </div>
    </div>
  );
}