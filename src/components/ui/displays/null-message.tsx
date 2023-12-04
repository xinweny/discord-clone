import styles from './null-message.module.scss';

type NullMessageProps = {
  src?: string;
  header?: string;
  message: string;
};

export function NullMessage({
  header, message, src
}: NullMessageProps) {
  return (
    <div className={styles.container}>
      {src && (
        <div>
          <img src={src} />
        </div>
      )}
      {header && <h3>{header.toUpperCase()}</h3>}
      <p>{message}</p>
    </div>
  )
}