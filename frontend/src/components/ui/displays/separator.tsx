import styles from './separator.module.scss';

type SeparatorProps = {
  className?: string;
  axis?: 'x' | 'y';
};

export function Separator({
  className,
  axis = 'x',
}: SeparatorProps) {
  return (
    <div className={`${styles.separator} ${styles[axis]} ${className}`}></div>
  );
}