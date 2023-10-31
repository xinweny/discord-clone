import styles from './tooltip.module.scss';

type TooltipProps = {
  text: string;
  children: React.ReactNode;
  direction: 'left' | 'right' | 'top' | 'bottom';
};

export function Tooltip({ text, children, direction }: TooltipProps) {
  return (
    <div
      className={styles.wrapper}
      data-tooltip={text}
      data-flow={direction}
    >
      {children}
    </div>
  );
}