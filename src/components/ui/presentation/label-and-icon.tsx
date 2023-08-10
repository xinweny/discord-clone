type LabelAndIconProps = {
  divProps?: React.HTMLAttributes<HTMLDivElement>;
  label: string;
  icon: string;
};

export function LabelAndIcon({
  label,
  icon,
  ...divProps
}: LabelAndIconProps) {
  return (
    <div {...divProps}>
      <p>{label}</p>
      <img src={icon} />
    </div>
  )
}