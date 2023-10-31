import styles from './tooltip.module.scss';

type TooltipProps = {
  text: string;
  children: React.ReactNode;
  direction: 'left' | 'right' | 'top' | 'bottom';
  options?: {
    gap: string;
  }
};

export function Tooltip({
  text,
  children,
  direction,
  options = {
    gap: '12px',
  }
}: TooltipProps) {
  const { gap } = options;

  return (
    <div
      className={styles.wrapper}
      data-tooltip={text}
      data-flow={direction}
      style={{
        '--gap': gap,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}