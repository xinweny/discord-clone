import styles from './color-banner.module.scss';

type ColorBannerProps = {
  color: string;
  className?: string;
  height?: number;
  width?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export function ColorBanner({
  color, className, height, width, children, style,
}: ColorBannerProps) {
  return (
    <div
      style={{
        ...style,
        backgroundColor: color || '#5C64F3',
        height,
        width,
      }}
      className={`${styles.banner} ${className || ''}`}
    >
      {children}
    </div>
  )
}