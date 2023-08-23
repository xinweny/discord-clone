type ColorBannerProps = {
  color: string;
  className?: string;
  height?: number;
  width?: number;
};

export function ColorBanner({
  color, className, height, width
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
    </div>
  )
}