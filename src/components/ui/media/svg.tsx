type SvgProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

import styles from './svg.module.scss';

export function Svg({ children, ...props }: SvgProps) {
  return (
    <div {...props} className={`${styles.svg} ${props.className || ''}`}>
      {children}
    </div>
  );
}