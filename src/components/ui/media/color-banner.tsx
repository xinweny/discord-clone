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
        backgroundColor: color,
        height,
        width,
      }}
      className={className || ''}
    >
      {children}
    </div>
  )
}