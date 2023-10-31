import styles from './hover-popup.module.scss';

type HoverPopupProps = {
  popup: React.ReactNode | string;
  children: React.ReactNode;
  direction: 'left' | 'right' | 'top' | 'bottom';
};

export function HoverPopup({ popup, children, direction }: HoverPopupProps) {
  return (
    <div className={styles.wrapper}>
      {children}
      <div className={`${styles.popup} ${styles[direction] || ''}`}>
        {popup}
      </div>
    </div>
  );
}