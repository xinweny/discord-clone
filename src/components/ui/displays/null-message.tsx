import styles from './null-message.module.scss';

type NullMessageProps = {
  src?: string;
  header?: string;
  message: string;
  gap?: number;
  className?: string;
};

export function NullMessage({
  header,
  className,
  message,
  src,
  gap,
}: NullMessageProps) {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      {src && (
        <div>
          <img src={src} style={{
            marginBottom: `${gap || 40}px`,
          }}/>
        </div>
      )}
      {header && <h3>{header.toUpperCase()}</h3>}
      <p>{message}</p>
    </div>
  )
}