import styles from './color-banner.module.scss';

type ColorBannerProps = {
  color: string;
  className?: string;
  height?: number;
  width?: number;
  children?: React.ReactNode;
};

export function ColorBanner({
  color, className, height, width, children
}: ColorBannerProps) {
  return (
    <div
      style={{
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