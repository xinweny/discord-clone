import styles from './modal-header.module.scss';

type ModalHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  alt?: boolean;
};

export function ModalHeader({
  title,
  subtitle,
  alt = false,
}: ModalHeaderProps) {
  return (
    <header className={`${styles.header} ${alt ? styles.alt : ''}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}