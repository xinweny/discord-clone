type ResizableHandleProps = {
  innerRef: React.RefObject<HTMLDivElement>;
  className?: string;
  handleAxis?: 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';
} & React.HTMLAttributes<HTMLDivElement>;

export function ResizableHandle({
  innerRef,
  className,
  handleAxis,
  ...props
}: ResizableHandleProps) {
  return (
    <div
      ref={innerRef}
      className={`${className || ''} handle-${handleAxis}`}
      {...props}
    >
    </div>
  );
}