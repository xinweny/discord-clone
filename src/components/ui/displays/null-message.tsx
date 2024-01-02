import styles from './null-message.module.scss';

type NullMessageProps = {
  src?: string;
  header?: string;
  message: string;
  gap?: number;
};

export function NullMessage({
  header,
  message,
  src,
  gap,
}: NullMessageProps) {
  return (
    <div className={styles.container}>
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