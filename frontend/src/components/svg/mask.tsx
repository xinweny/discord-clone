type MaskProps = {
  id: string;
  children: React.ReactNode;
};

export function Mask({ id, children }: MaskProps) {
  return (
    <mask id={`svg-mask-${id}`} maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
      {children}
    </mask>
  );
}