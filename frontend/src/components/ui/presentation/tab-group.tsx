import { Separator } from '../displays';

import styles from './tab-group.module.scss';

type TabGroupProps = {
  title?: string;
  children?: React.ReactNode;
};

export function TabGroup({
  title, children
}: TabGroupProps) {
  return (
    <>
      <div className={styles.group}>
        {title && <h3>{title.toUpperCase()}</h3>}
        <div className={styles.list}>
          {children}
        </div>
      </div>
      <Separator className={styles.separator} />
    </>
  );
}