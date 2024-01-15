import styles from './modal-header.module.scss';

type ModalHeaderProps = {
  title: string;
  subtitle?: string | React.ReactNode;
  className?: string;
  alt?: boolean;
};

export function ModalHeader({
  title,
  subtitle,
  alt = false,
  className,
}: ModalHeaderProps) {
  return (
    <header className={`${styles.header} ${alt ? styles.alt : ''} ${className || ''}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}