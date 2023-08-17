export function Emoji({ ...props }: React.HTMLProps<HTMLImageElement>) {
  const { className } = props;

  return (
    <img
      className={`emoji ${className || ''}`}
      style={{
        width: 'auto',
        height: 'auto',
        maxWidth: '32px',
        maxHeight: '32px',
      }}
      {...props}
    />
  );
}